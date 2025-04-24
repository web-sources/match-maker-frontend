// components/EmptyState.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Users, MessageSquare } from "lucide-react";

export function EmptyState({ onBrowseMatches }: { onBrowseMatches: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="bg-pink-50 p-6 rounded-full mb-6">
        <MessageSquare className="h-10 w-10 text-pink-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        Start a conversation with your matches to see messages appear here
      </p>
      <Button 
        onClick={onBrowseMatches}
        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
      >
        <Users className="h-4 w-4 mr-2" />
        Browse Matches
      </Button>
    </div>
  );
}