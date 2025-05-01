"use client";
// context/websocket.tsx

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

type WebSocketMessage = {
  id: string;
  sender_id: string;
  text: string | null;
  sent_at: string;
  is_read: boolean;
  is_sent_by_me: boolean;
};

type WebSocketContextType = {
  sendTextMessage: (text: string, conversationId: string) => void;
  messages: Record<string, WebSocketMessage[]>;
  isConnected: boolean;
  currentConversationId: string | null;
  setCurrentConversationId: (id: string | null) => void;
  markAsRead: (conversationId: string) => void;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuth();
  const BASE_WS_URL = process.env.NEXT_PUBLIC_BASE_URL || "ws://127.0.0.1:8000";

  const [messages, setMessages] = useState<Record<string, WebSocketMessage[]>>({});
  const [isConnected, setIsConnected] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connectWebSocket = useCallback((conversationId: string) => {
    if (!accessToken || !conversationId) return;

    if (socketRef.current) {
      socketRef.current.close();
    }

    const wsUrl = `${BASE_WS_URL.replace(/^http/, "ws")}/my-ws/chat/${conversationId}/?token=${accessToken}`;
    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if(data.is_sent_by_me) return;

        setMessages((prev) => ({
          ...prev,
          [conversationId]: [
            ...(prev[conversationId] || []),
            {
              id: data.id,
              sender_id: data.sender_id,
              text: data.text,
              sent_at: data.sent_at,
              is_read: data.is_read,
              is_sent_by_me: data.is_sent_by_me,
            },
          ],
        }));
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket disconnected. Reconnecting...");
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      reconnectTimeoutRef.current = setTimeout(() => {
        connectWebSocket(conversationId);
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [accessToken, BASE_WS_URL]);

  useEffect(() => {
    if (currentConversationId) {
      connectWebSocket(currentConversationId);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [currentConversationId, connectWebSocket]);

  const sendTextMessage = useCallback(
    (text: string, conversationId: string) => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        const messageData = {
          type: "text_message",
          text,
          conversation_id: conversationId,
        };

        socketRef.current.send(JSON.stringify(messageData));

        // Optimistic update
        setMessages((prev) => ({
          ...prev,
          [conversationId]: [
            ...(prev[conversationId] || []),
            {
              id: Date.now().toString(),
              sender_id: "", // server should fill this
              text,
              sent_at: new Date().toISOString(),
              is_read: false,
              is_sent_by_me: true,
            },
          ],
        }));
      }
    },
    []
  );

  const markAsRead = useCallback((conversationId: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: "mark_as_read",
          conversation_id: conversationId,
        })
      );
    }
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        sendTextMessage,
        messages,
        isConnected,
        currentConversationId,
        setCurrentConversationId,
        markAsRead,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
}
