"use client";

import React, { useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";

function ChatPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const clientRef = useRef<Client | null>(null);

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
      <ChatMessageList
        setIsConnected={setIsConnected}
        clientRef={clientRef}
        setConnectionError={setConnectionError}
      />
      <ChatMessageInput
        isConnected={isConnected}
        clientRef={clientRef}
        setConnectionError={setConnectionError}
      />
    </div>
  );
}

export default ChatPage;
