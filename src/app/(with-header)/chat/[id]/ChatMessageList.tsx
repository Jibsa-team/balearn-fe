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

  const fetchPreviousMessages = async (cursor?: string) => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      // 스크롤 높이 저장
      if (chatContainerRef.current) {
        scrollHeightBeforeUpdate.current =
          chatContainerRef.current.scrollHeight;
      }

      let url = `${API_URL}/api/chat/${id}?size=50`;
      if (cursor) {
        url += `&cursor=${cursor}`;
      }

      const response = await fetchWithAuth(url);
      const newMessages = await response.json();
      const messages = newMessages.result.contents;

      const sortedMessages = messages.sort(
        (
          a: { createdAt: string | number | Date },
          b: { createdAt: string | number | Date }
        ) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setMessages((prevMessages) => {
        const uniqueMessages = new Set(
          [...sortedMessages, ...prevMessages].map((msg) => JSON.stringify(msg))
        );

        return Array.from(uniqueMessages)
          .map((msg) => JSON.parse(msg))
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
      });

      if (messages.length < 10) {
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

  const connect = useCallback(() => {
    if (clientRef.current?.active) {
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log("웹소켓 연결 성공!");
        setIsConnected(true);
        setConnectionError(null);

        client.subscribe(`/sub/api/chat/${id}`, (message: IMessage) => {
          try {
            const newMessage = JSON.parse(message.body);
            isNewMessage.current = true;
            setMessages((prev) => [...prev, newMessage]);
          } catch (error) {
            console.error("메시지 파싱 에러:", error);
          }
        });
      },
      onDisconnect: () => {
        console.log("웹소켓 연결 끊김");
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
  }, [id, token]);

  useEffect(() => {
    connect();
    fetchPreviousMessages();

    return () => {
      if (clientRef.current?.active) {
        clientRef.current.deactivate();
      }
    };
  }, [connect]);

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
      {messages.map((msg, i) =>
        msg.sender.id !== teamUser?.id ? (
          <div key={i} className="flex flex-col gap-1 mb-4 animate-fade-in">
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
                <span className="bg-white px-4 py-2 rounded-2xl shadow-sm max-w-[300px] break-words">
                  {msg.message}
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-500 mt-1 ml-2">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-end mb-4 animate-fade-in" key={i}>
            <div className="w-full flex flex-col items-end">
              <span className="sm:text-[1rem] text-[0.9rem] bg-logoColor text-white px-4 py-2 rounded-2xl shadow-sm max-w-[80%] break-words">
                {msg.message}
              </span>
              {msg.createdAt && (
                <span className="text-xs text-gray-500 mt-1">
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
