"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { IoMdSend } from "react-icons/io";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { useParams } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { ChatDto } from "@/types/chat/chat";

const SOCKET_URL = "https://be.balearn.o-r.kr/ws";

function ChatPage() {
  const { accessToken: token, teamUser } = useAuthStore.getState();
  const [messages, setMessages] = useState<ChatDto[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const clientRef = useRef<Client | null>(null);
  const { id } = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 웹소켓 연결 함수
  const connect = useCallback(() => {
    if (clientRef.current?.active) {
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.debug(str);
      },
      // 5초마다 재연결 시도
      //reconnectDelay: 5000,
      // 4초마다 하트비트 체크
      //heartbeatIncoming: 4000,
      //heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log("웹소켓 연결 성공!");
        setIsConnected(true);
        setConnectionError(null);

        // 채팅방 구독
        client.subscribe(`/sub/api/chat/${id}`, (message: IMessage) => {
          try {
            const newMessage = JSON.parse(message.body);
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

  // 초기 연결
  useEffect(() => {
    connect();

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (clientRef.current?.active) {
        clientRef.current.deactivate();
      }
    };
  }, [connect]);

  // 새 메시지 수신 시 자동 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "end",
      };
      chatContainerRef.current.scrollIntoView(scrollOptions);
    }
  }, [messages]);

  // 메시지 전송 처리
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !isConnected || !clientRef.current) {
      return;
    }

    try {
      await clientRef.current.publish({
        destination: `/pub/api/chat/send/${id}`,
        body: JSON.stringify({ message: newMessage.trim() }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNewMessage("");
    } catch (error) {
      console.error("메시지 전송 오류:", error);
      setConnectionError("메시지 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div
      className="w-full flex flex-col bg-gray-50"
      style={{ height: "calc(100vh - 70px)" }}
    >
      {connectionError && (
        <div className="bg-red-100 text-red-700 p-2 text-center">
          {connectionError}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
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
            <div
              className="flex flex-col items-end mb-4 animate-fade-in"
              key={i}
            >
              <div className="w-full flex flex-col items-end">
                <span className="sm:text-[1rem] text-[0.9rem]  bg-logoColor text-white px-4 py-2 rounded-2xl shadow-sm max-w-[80%] break-words">
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

      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 bg-white p-4 flex items-center gap-2"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isConnected}
        />
        <button
          type="submit"
          disabled={!isConnected || !newMessage.trim()}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title={isConnected ? "메시지 보내기" : "연결 중..."}
        >
          <IoMdSend
            className={`text-2xl ${
              isConnected && newMessage.trim()
                ? "text-blue-500"
                : "text-gray-400"
            }`}
          />
        </button>
      </form>
    </div>
  );
}

export default ChatPage;
