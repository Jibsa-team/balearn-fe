"use client";

import useAuthStore from "@/store/useAuthStore";
import { Client } from "@stomp/stompjs";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

interface ChatMessageInputProps {
  isConnected: boolean;
  clientRef: React.MutableRefObject<Client | null>;
  setConnectionError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ChatMessageInput({
  isConnected,
  clientRef,
  setConnectionError,
}: ChatMessageInputProps) {
  const [newMessage, setNewMessage] = useState("");
  const { accessToken: token } = useAuthStore.getState();
  const { id } = useParams();

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
    <form
      onSubmit={handleSendMessage}
      className="border-t border-gray-200 bg-headerBg p-4 flex items-center gap-2"
    >
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:sm:text-[1rem] placeholder:text-[0.8rem]"
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
            isConnected && newMessage.trim() ? "text-blue-500" : "text-gray-400"
          }`}
        />
      </button>
    </form>
  );
}
