"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useWebSocket } from "@/context/WebSocket";

type Message = {
  id: string;
  sender_id: string;
  sender_email: string;
  text: string | null;
  image: string | null;
  voice_message: string | null;
  sent_at: string;
  is_read: boolean;
  reply_to: string | null;
  is_sent_by_me: boolean;
};

export function MessageThread({
  conversationId,
  onBack,
}: {
  conversationId: string;
  onBack: () => void;
}) {
  const [newMessage, setNewMessage] = useState("");
  const [conversationDetails, setConversationDetails] = useState<{
    name: string;
    avatar: string;
    online: boolean;
  } | null>(null);
  const [apiMessages, setApiMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { sendTextMessage, messages, setCurrentConversationId, markAsRead } =
    useWebSocket();
  const { accessToken } = useAuth();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    setCurrentConversationId(conversationId);
    markAsRead(conversationId);

    const fetchData = async () => {
      try {
        setIsLoading(true);

        // 1. Fetch conversation details
        const detailsRes = await axios.get(
          `${BASE_URL}/api/v1/startup/fun/threads/?thread_id=${conversationId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        console.log(detailsRes.data[0]);

        setConversationDetails({
          name: detailsRes.data[0]?.chat_with.first_name,
          avatar: detailsRes.data[0].chat_with.profile_picture,
          online: detailsRes.data[0].chat_with.is_online,
        });

        // 2. Fetch message history
        const historyRes = await axios.get(
          `${BASE_URL}/api/v1/startup/fun/chat/${conversationId}/history`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        setApiMessages(historyRes.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setCurrentConversationId(null);
    };
  }, [conversationId, accessToken, setCurrentConversationId, markAsRead, BASE_URL]);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendTextMessage(newMessage, conversationId);
      setNewMessage("");
    }
  };

  const allMessages = [
    ...apiMessages,
    ...(messages[conversationId] || []),
  ].sort(
    (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
  );

  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [allMessages]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    };

    const timer = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timer);
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <p>Loading conversation...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pt-15">
      {/* Header - fixed height */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src={conversationDetails?.avatar || "/default-avatar.jpg"}
            />
            <AvatarFallback>
              {conversationDetails?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">
              {conversationDetails?.name || "Unknown User"}
            </h3>
            <p className="text-xs text-gray-500">
              {conversationDetails?.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {allMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.is_sent_by_me ? "justify-end" : "justify-start"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                msg.is_sent_by_me
                  ? "bg-pink-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text && <p>{msg.text}</p>}
              <p
                className={`text-xs mt-1 ${
                  msg.is_sent_by_me ? "text-pink-100" : "text-gray-500"
                }`}
              ></p>
            </motion.div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </div>
  );
}
