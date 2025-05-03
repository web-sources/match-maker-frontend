"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Smile } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useWebSocket } from "@/context/WebSocket";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react"; // Import emoji picker and Theme type

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!conversationId || !accessToken) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setCurrentConversationId(conversationId);
        markAsRead(conversationId);

        // 1. Fetch conversation details
        const detailsRes = await axios.get(
          `${BASE_URL}/api/v1/startup/fun/threads/?thread_id=${conversationId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

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
      const isUnmounting = true;

      if (!isUnmounting) {
        setCurrentConversationId(null);
      }
    };
  }, [
    conversationId,
    accessToken,
    setCurrentConversationId,
    markAsRead,
    BASE_URL,
  ]);

  const handleBack = useCallback(() => {
    // Clear conversation immediately
    setCurrentConversationId(null);

    // Then navigate back
    onBack();
  }, [onBack, setCurrentConversationId]);

  const handleSend = useCallback(() => {
    if (newMessage.trim()) {
      sendTextMessage(newMessage, conversationId);
      setNewMessage("");
    }
  }, [newMessage, conversationId, sendTextMessage]);

  const allMessages = useMemo(() => {
    return [...apiMessages, ...(messages[conversationId] || [])].sort(
      (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime()
    );
  }, [apiMessages, messages, conversationId]);

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
          onClick={handleBack}
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
            </motion.div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
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
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <Button onClick={handleSend}>Send</Button>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute bottom-16 left-4 z-10">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={300}
              height={350}
              previewConfig={{ showPreview: false }}
              skinTonesDisabled
              searchDisabled
              theme={Theme.LIGHT} // or Theme.DARK based on your theme
              lazyLoadEmojis
            />
          </div>
        )}
      </div>
    </div>
  );
}
