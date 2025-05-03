"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ConversationList } from "./components/ConversationList";
import { MessageThread } from "./components/MessageThread";
import { EmptyState } from "./components/EmptyState";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Suspense } from "react";



function MessagesLayout() {
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const [isCreatingThread, setIsCreatingThread] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { accessToken } = useAuth();
  const recipientId = searchParams.get("recipient");
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const createOrFindThread = async () => {
      if (!recipientId || !accessToken) return;

      setIsCreatingThread(true);
      try {
        // 1. First try to find existing thread
        const response = await axios.get(
          `${BASE_URL}/api/v1/startup/fun/threads/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const existingThread = response.data.find(
          (thread: { chat_with?: { id?: string } }) =>
            thread?.chat_with?.id === recipientId
        );

        if (existingThread) {
          setActiveConversation(existingThread.id);
          window.history.replaceState({}, "", "/messages");
          return;
        }

        // 2. If no existing thread, create a new one
        const createResponse = await axios.post(
          `${BASE_URL}/api/v1/startup/fun/threads/get-or-create/`,
          { user_id: recipientId },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (createResponse.data.thread_id) {
          setActiveConversation(createResponse.data.thread_id);
          window.history.replaceState({}, "", "/messages");
        }
      } catch (error) {
        console.error("Error creating or finding thread:", error);
        toast.error("Failed to start conversation");
      } finally {
        setIsCreatingThread(false);
      }
    };

    createOrFindThread();
  }, [recipientId, accessToken]);

  if (isCreatingThread) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading conversation...</p>
      </div>
    );
  }

  return (
    
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex h-full bg-white rounded-xl shadow-md overflow-hidden">
        {/* Conversation List Sidebar */}
        <div
          className={`${
            activeConversation ? "hidden md:block" : "block"
          } w-full md:w-96 border-r border-gray-200`}
        >
          <ConversationList
            onSelect={(id) => setActiveConversation(id)}
            activeConversation={activeConversation}
          />
        </div>

        {/* Main Message Area */}
        <div className="flex-1 w-full">
          {activeConversation ? (
            <MessageThread
              conversationId={activeConversation}
              onBack={() => setActiveConversation(null)}
            />
          ) : (
            <EmptyState onBrowseMatches={() => router.push("/member")} />
          )}
        </div>
      </div>
    </div>
  );
}


export default function MessagesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      < MessagesLayout/>
    </Suspense>
  );
}
