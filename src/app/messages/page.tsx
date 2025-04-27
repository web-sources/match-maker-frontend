// components/MessagesLayout.tsx
"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import { ConversationList } from "./components/ConversationList";
import { MessageThread } from "./components/MessageThread";
import { EmptyState } from "./components/EmptyState";

export default function MessagesLayout() {
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const router = useRouter();

  return (
    <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex h-full bg-white rounded-xl shadow-md overflow-hidden">
        {/* Conversation List Sidebar */}
        <div
          className={`${
            activeConversation ? "hidden md:block" : "block"
          } w-full md:w-96 border-r border-gray-200`}
        >
          <ConversationList onSelect={(id) => setActiveConversation(id)} />
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
