// hooks/usePresence.ts
import { useAuth } from "@/context/AuthContext";
import { useWebSocket } from "@/context/WebSocket";
import { useEffect } from "react";

export const usePresence = () => {
  const { userStatuses, presenceSocket } = useWebSocket();
  const { userProfile } = useAuth();


  const status = userProfile?.user_id
    ? userStatuses[userProfile?.user_id]
    : userStatuses[userProfile?.user_id || ""];

  // Send heartbeat to keep connection alive
  useEffect(() => {
    if (!presenceSocket || presenceSocket.readyState !== WebSocket.OPEN) return;

    const heartbeatInterval = setInterval(() => {
      if (presenceSocket.readyState === WebSocket.OPEN) {
        presenceSocket.send(JSON.stringify({ type: "heartbeat" }));
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(heartbeatInterval);
  }, [presenceSocket]);

  return {
    isOnline: status?.is_online || false,
    lastSeen: status?.last_seen || null,
    userName: status?.name || "",
  };
};
