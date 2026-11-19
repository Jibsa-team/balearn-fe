import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { ChatDto } from "@/types/chat/chat";
import useAuthStore from "@/store/useAuthStore";
import { useParams } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";

const SOCKET_URL = `${process.env.NEXT_PUBLIC_API_URL}/ws`;
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PAGE_SIZE = 50;

function mergeMessages(existing: ChatDto[], incoming: ChatDto[]) {
  const messages = new Map([...existing, ...incoming].map((message) => [message.id, message]));
  return [...messages.values()].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

async function loadHistory(teamId: string, cursor?: string, signal?: AbortSignal) {
  const query = new URLSearchParams({ size: String(PAGE_SIZE) });
  if (cursor) query.set("cursor", cursor);
  const response = await fetchWithAuth(`${API_URL}/api/chat/${teamId}?${query}`, { signal });
  if (!response.ok) throw new Error(`Chat history returned ${response.status}`);
  const page: { result: { contents: ChatDto[] } } = await response.json();
  return page.result.contents;
}

interface ChatMessageListProps {
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setConnectionError: React.Dispatch<React.SetStateAction<string | null>>;
  clientRef: React.MutableRefObject<Client | null>;
}

function ChatMessageList({
  setIsConnected,
  setConnectionError,
  clientRef,
}: ChatMessageListProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { accessToken: token, teamUser } = useAuthStore.getState();
  const { id } = useParams();
  const scrollHeightBeforeUpdate = useRef<number>(0);
  const isNewMessage = useRef<boolean>(false);
  const lastSeenMessage = useRef<ChatDto | undefined>(undefined);

  useEffect(() => {
    lastSeenMessage.current = messages.at(-1);
  }, [messages]);

  const fetchPreviousMessages = async (cursor?: string) => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      // 스크롤 높이 저장
      if (chatContainerRef.current) {
        scrollHeightBeforeUpdate.current =
          chatContainerRef.current.scrollHeight;
      }

      const older = await loadHistory(String(id), cursor);
      setMessages((previous) => mergeMessages(previous, older));
      if (older.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("채팅 내역 불러오기 실패:", error);
      setConnectionError("채팅 내역을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop } = e.currentTarget;

      if (scrollTop === 0 && !isLoading && hasMore) {
        const oldestMessage = messages[0];
        if (oldestMessage) {
          fetchPreviousMessages(oldestMessage.createdAt);
        }
      }
    },
    [isLoading, hasMore, messages]
  );

  useEffect(() => {
    const initial = new AbortController();
    void loadHistory(String(id), undefined, initial.signal).then((page) => {
      if (initial.signal.aborted) return;
      setMessages((previous) => mergeMessages(previous, page));
      setHasMore(page.length === PAGE_SIZE);
    }).catch(() => {
      if (!initial.signal.aborted) setConnectionError("채팅 내역을 불러오는데 실패했습니다.");
    });
    let recovery: AbortController | undefined;
    const client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      reconnectDelay: 2000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: async () => {
        console.log("웹소켓 연결 성공!");
        setIsConnected(true);
        setConnectionError(null);

        client.subscribe(`/sub/api/chat/${id}`, (message: IMessage) => {
          try {
            const newMessage: ChatDto = JSON.parse(message.body);
            isNewMessage.current = true;
            setMessages((prev) => mergeMessages(prev, [newMessage]));
          } catch (error) {
            console.error("메시지 파싱 에러:", error);
          }
        });
        recovery?.abort();
        const request = new AbortController();
        recovery = request;
        const lastSeen = lastSeenMessage.current;
        try {
          let cursor: string | undefined;
          while (!request.signal.aborted) {
            const page = await loadHistory(String(id), cursor, request.signal);
            if (request.signal.aborted) return;
            isNewMessage.current = true;
            setMessages((previous) => mergeMessages(previous, page));
            const next = page.at(-1)?.createdAt;
            if (cursor === undefined && lastSeen === undefined) {
              setHasMore(page.length === PAGE_SIZE);
            }
            if (!lastSeen || !next || next === cursor || page.length < PAGE_SIZE ||
                page.some((message) => message.id === lastSeen.id) || next < lastSeen.createdAt) break;
            cursor = next;
          }
        } catch (error) {
          if (!request.signal.aborted) {
            console.error("채팅 내역 복구 실패:", error);
            setConnectionError("채팅 내역을 불러오는데 실패했습니다.");
          }
        }
      },
      onDisconnect: () => {
        console.log("웹소켓 연결 끊김");
        setIsConnected(false);
      },
      onWebSocketClose: () => {
        recovery?.abort();
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("STOMP 에러:", frame);
        setConnectionError(
          `연결 오류: ${frame.headers?.message || "알 수 없는 오류"}`
        );
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      initial.abort();
      recovery?.abort();
      client.onWebSocketClose = () => {};
      void client.deactivate();
      if (clientRef.current === client) clientRef.current = null;
    };
  }, [id, token, clientRef, setConnectionError, setIsConnected]);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    if (isNewMessage.current) {
      // 새 메시지가 추가된 경우 스크롤을 맨 아래로
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      isNewMessage.current = false;
    } else {
      // 이전 메시지를 불러온 경우 스크롤 위치 유지
      const newScrollHeight = chatContainerRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - scrollHeightBeforeUpdate.current;
      if (scrollDiff > 0) {
        chatContainerRef.current.scrollTop = scrollDiff;
      }
    }
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto p-4 bg-white"
      ref={chatContainerRef}
      onScroll={handleScroll}
    >
      {messages.map((msg) =>
        msg.sender.id !== teamUser?.id ? (
          <div key={msg.id} className="flex flex-col gap-1 mb-4 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="w-[30px] h-[30px] relative flex-shrink-0">
                <Image
                  src={msg.sender.profileImageUrl}
                  alt="user image"
                  fill
                  sizes="30px"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="sm:text-[0.8rem] text-[0.7rem]">
                  {msg.sender.nickname}
                </span>
                <span className="bg-white px-4 py-2 rounded-2xl shadow-sm max-w-[300px] break-words sm:text-[0.9rem] text-[0.8rem] border-[1px] border-gray-100">
                  {msg.message}
                </span>
              </div>
            </div>
            <span className="sm:text-[0.8rem] text-[0.7rem] text-[rgba(0,0,0,0.5)] mt-1 ml-2">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-end mb-4 animate-fade-in" key={msg.id}>
            <div className="w-full flex flex-col items-end">
              <span className="sm:text-[1rem] text-[0.9rem] bg-logoColor text-white px-4 py-2 rounded-2xl shadow-sm max-w-[80%] break-words">
                {msg.message}
              </span>
              {msg.createdAt && (
                <span className="sm:text-[0.8rem] text-[0.7rem] text-[rgba(0,0,0,0.5)] text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ChatMessageList;
