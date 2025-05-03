// components/ConversationList.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ConversationSkeletonList } from "@/app/utils/helper/SkeletonList";
import toast from "react-hot-toast";

type ThreadType = {
  id: string;
  name: string;
  lastmessage: string | null;
  time: string | null;
  unread: 0;
  avatar: string;
  online: boolean;
};

export function ConversationList({
  onSelect,
  activeConversation,
}: {
  onSelect: (id: string) => void;
  activeConversation: string | null;
}) {
  const [threadList, setthreadList] = useState<ThreadType[]>([]);
  const { accessToken } = useAuth();
  const [isloading, setIsloading] = useState(true);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!accessToken) return;

    const fetchThread = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/startup/fun/threads/`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const threads: ThreadType[] = response.data.map(
            (item: {
              id: string;
              chat_with: {
                username: string;
                profile_picture: string;
                is_online: boolean;
              };
              last_message?: { text: string; sent_at: string };
              updated_at: string;
            }): ThreadType => ({
              id: item.id ?? null,
              name: item?.chat_with?.username ?? null, // fallback to username if available
              lastmessage: item.last_message?.text ?? null,
              time: item.last_message?.sent_at ?? item.updated_at ?? null,
              unread: 0,
              avatar: item.chat_with?.profile_picture ?? null,
              online: item.chat_with?.is_online ?? false,
            })
          );

          setthreadList(threads);
          setIsloading(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || "Error fetching threads"
          );

          return;
        }
      }
    };

    fetchThread();
  }, [accessToken, BASE_URL]);

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "";
    }
  };

  return (
    <div className="divide-y divide-gray-100 mt-15">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
      </div>

      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        {isloading ? (
          <>
            <ConversationSkeletonList />
          </>
        ) : (
          <>
            {threadList.map((convo) => (
              <div
                key={convo.id}
                onClick={() => convo.id && onSelect(convo.id)}
                className={`flex items-center p-4 hover:bg-pink-50 cursor-pointer transition-colors ${
                  activeConversation === convo.id ? "bg-pink-50" : ""
                }`}
              >
                <div className="relative mr-3">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={convo?.avatar} />
                      <AvatarFallback>{convo.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {convo.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {convo.name || "Unknown User"}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(convo.time)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {convo.lastmessage || "No messages yet"}
                  </p>
                </div>
                {convo.unread > 0 && (
                  <Badge variant="default" className="ml-2 bg-pink-500">
                    {convo.unread > 99 ? "99+" : convo.unread}
                  </Badge>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
