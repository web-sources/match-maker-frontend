"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const mockMessages = [
  {
    id: "1",
    sender: "them",
    text: "Hey there! How's your day going?",
    time: "10:30 AM",
  },
  {
    id: "2",
    sender: "me",
    text: "Pretty good! Just finished work.",
    time: "10:32 AM",
  },
  {
    id: "3",
    sender: "them",
    text: "Nice! What do you do for work?",
    time: "10:33 AM",
  },
  {
    id: "4",
    sender: "me",
    text: "I'm a graphic designer. How about you?",
    time: "10:35 AM",
  },
  {
    id: "5",
    sender: "them",
    text: "I work in marketing. We should collaborate sometime!",
    time: "10:36 AM",
  },
];

export function MessageThread({
  conversationId,
  onBack,
}: {
  conversationId: string;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  console.log(conversationId);

  useEffect(() => {
    if (messages[messages.length - 1]?.sender === "me") {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "them",
            text: "That's interesting! Tell me more.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "me",
          text: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

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

  return (
    <div className="flex flex-col h-full">
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
            <AvatarImage src="/avatars/alex.jpg" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Alex Johnson</h3>
            <p className="text-xs text-gray-500">Online now</p>
          </div>
        </div>
      </div>

      {/* Messages container - flexible space */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                msg.sender === "me"
                  ? "bg-pink-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "me" ? "text-pink-100" : "text-gray-500"
                }`}
              >
                {msg.time}
              </p>
            </motion.div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 text-sm text-gray-500"
        >
          <div className="flex items-center">
            <div className="flex space-x-1 mr-2">
              <div
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <span>Alex is typing...</span>
          </div>
        </motion.div>
      )}

      {/* Input area - fixed height */}
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