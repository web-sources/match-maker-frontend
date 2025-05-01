"use client";

import { useAuth } from "@/context/AuthContext";
import { useWebSocket } from "@/context/WebSocket";
import { useStoreConnection } from "@/stores/useStoreConnection";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Newthreadpage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken } = useAuth();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const memberId = pathname.split("/")[3];
  const [loading] = useState(true);
  const { setConnection } = useStoreConnection();

  const { isConnected } = useWebSocket();

  console.log(isConnected, "isConnected");

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/startup/fun/threads/get-or-create/`,
          { user_id: memberId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const { user1, user2 } = response?.data;
        setConnection(user1, user2);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.error ||
              "An error occurred while creating the thread."
          );
        } else {
          console.log(error);
        }
      }
    };
    initializeChat();
  }, [accessToken, memberId, router,BASE_URL, setConnection]);

  if (loading) return <div className="mt-20">Creating chat session...</div>;

  return <div className="mt-20">Redirecting to chat...</div>;
};

export default Newthreadpage;
