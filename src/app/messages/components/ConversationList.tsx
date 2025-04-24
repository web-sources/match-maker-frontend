// components/ConversationList.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mockConversations = [
  {
    id: "1",
    name: "Alex Johnson",
    lastMessage: "Hey! How was your weekend?",
    time: "2h ago",
    unread: 3,
    avatar: "/avatars/alex.jpg",
    online: true,
  },
  {
    id: "2",
    name: "Sam Taylor",
    lastMessage: "Let's meet for coffee tomorrow",
    time: "1d ago",
    unread: 0,
    avatar: "/avatars/sam.jpg",
    online: false,
  },
  // More conversations...
];

export function ConversationList({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <div className="divide-y divide-gray-100">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
      </div>

      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        {mockConversations.map((convo) => (
          <div
            key={convo.id}
            onClick={() => onSelect(convo.id)}
            className="flex items-center p-4 hover:bg-pink-50 cursor-pointer transition-colors"
          >
            <div className="relative mr-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={convo.avatar} />
                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {convo.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {convo.name}
                </h3>
                <span className="text-xs text-gray-500">{convo.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {convo.lastMessage}
              </p>
            </div>

            {convo.unread > 0 && (
              <Badge variant="default" className="ml-2 bg-pink-500">
                {convo.unread}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
