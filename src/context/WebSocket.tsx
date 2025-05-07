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

type UserStatus = {
  type: string;
  user_id: string;
  name: string;
  is_online: boolean;
  last_seen: string | null;
};

type WebSocketContextType = {
  sendTextMessage: (text: string, conversationId: string) => void;
  messages: Record<string, WebSocketMessage[]>;
  isConnected: boolean;
  currentConversationId: string | null;
  setCurrentConversationId: (id: string | null) => void;
  markAsRead: (conversationId: string) => void;
  userStatuses: Record<string, UserStatus>;
  presenceSocket: WebSocket | null;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken, logout } = useAuth();
  const BASE_WS_URL = process.env.NEXT_PUBLIC_BASE_URL || "ws://127.0.0.1:8000";
  const [messages, setMessages] = useState<Record<string, WebSocketMessage[]>>(
    {}
  );
  const [isConnected, setIsConnected] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [userStatuses, setUserStatuses] = useState<Record<string, UserStatus>>(
    {}
  );

  const socketRef = useRef<WebSocket | null>(null);
  const presenceSocketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const presenceReconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentConversationIdRef = useRef<string | null>(null);

  const presenceReconnectAttempts = useRef(0);
  const isMountedRef = useRef(true);

  const connectPresenceWebSocket = useCallback(() => {
    if (!isMountedRef.current || !accessToken) return;

    if (presenceSocketRef.current) {
      const state = presenceSocketRef.current.readyState;
      if (state === WebSocket.CONNECTING || state === WebSocket.OPEN) {
        return;
      }
    }

    if (presenceReconnectTimeoutRef.current) {
      clearTimeout(presenceReconnectTimeoutRef.current);
      presenceReconnectTimeoutRef.current = null;
    }

    const wsUrl = `${BASE_WS_URL.replace(
      /^http/,
      "ws"
    )}/my-ws/presence/?token=${accessToken}`;
    const ws = new WebSocket(wsUrl);
    presenceSocketRef.current = ws;

    ws.onopen = () => {
      console.log("Presence WebSocket connected");
      ws.send(JSON.stringify({ type: "presence_update", status: "online" }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Presence WebSocket message:", data);
        if (data.type === "user_status") {
          setUserStatuses((prev) => ({
            ...prev,
            [data.user_id]: data,
          }));
        }
      } catch (error) {
        console.error("Error parsing presence message:", error);
      }
    };

    ws.onclose = () => {
      console.log("Presence WebSocket disconnected. Reconnecting...");

      if (!isMountedRef.current) return;

      const delay = Math.min(
        5000 * (presenceReconnectAttempts.current + 1),
        30000
      );
      console.log(`Will attempt reconnect in ${delay}ms`);

      if (presenceReconnectTimeoutRef.current) {
        clearTimeout(presenceReconnectTimeoutRef.current);
      }
      presenceReconnectTimeoutRef.current = setTimeout(() => {
        presenceReconnectAttempts.current += 1;
        connectPresenceWebSocket();
      }, delay);
    };

    ws.onerror = (error) => {
      console.error("Presence WebSocket error:", error);
      // If token is invalid, logout the user
      if (error) {
        console.error("Invalid token, logging out...");
      }
    };
  }, [accessToken, BASE_WS_URL, logout]);

  const connectWebSocket = useCallback(
    (conversationId: string) => {
      console.log("Connecting to WebSocket for conversation:", conversationId);
      if (!accessToken || !conversationId) return;

      if (
        socketRef.current &&
        currentConversationIdRef.current === conversationId &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        return;
      }

      if (socketRef.current) {
        socketRef.current.close();
      }

      const wsUrl = `${BASE_WS_URL.replace(
        /^http/,
        "ws"
      )}/my-ws/chat/${conversationId}/?token=${accessToken}`;
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;
      currentConversationIdRef.current = conversationId;

      ws.onopen = () => {
        setIsConnected(true);
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.is_sent_by_me) return;

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
    },
    [accessToken, BASE_WS_URL]
  );

  useEffect(() => {
    isMountedRef.current = true;

    if (accessToken) {
      connectPresenceWebSocket();
    }

    /*

    return () => {
      isMountedRef.current = false;

      // Cleanup presence connection
      if (presenceSocketRef.current) {
        presenceSocketRef.current.close(1000, "Component unmounting");
        presenceSocketRef.current = null;
      }
      if (presenceReconnectTimeoutRef.current) {
        clearTimeout(presenceReconnectTimeoutRef.current);
      }

      // Cleanup chat connection
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
     */
  }, [accessToken, connectPresenceWebSocket]);

  useEffect(() => {
    if (currentConversationId) {
      connectWebSocket(currentConversationId);
    }
  }, [currentConversationId, connectWebSocket]);

  // context/websocket.tsx
  const sendTextMessage = useCallback(
    (text: string, conversationId: string) => {
      // Ensure we're connected to the right conversation
      if (
        currentConversationIdRef.current !== conversationId ||
        !socketRef.current ||
        socketRef.current.readyState !== WebSocket.OPEN
      ) {
        connectWebSocket(conversationId);
      }

      // Add a small delay to ensure connection is ready
      const sendMessage = () => {
        if (
          socketRef.current &&
          socketRef.current.readyState === WebSocket.OPEN
        ) {
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
                sender_id: "",
                text,
                sent_at: new Date().toISOString(),
                is_read: false,
                is_sent_by_me: true,
              },
            ],
          }));
        } else {
          setTimeout(sendMessage, 100); // Retry after short delay
        }
      };

      sendMessage();
    },
    [connectWebSocket]
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
        userStatuses,
        presenceSocket: presenceSocketRef.current,
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
