// guards/OnboardingGuard.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Heart } from "lucide-react";

export const OnboardingGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken, loading, isprofile_complete } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!accessToken) {
        router.replace("/");
      } else if (!isprofile_complete) {
        router.replace("/onboarding");
      }
    }
  }, [accessToken, isprofile_complete, loading, router]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="flex flex-col items-center">
          <div className="relative h-12 w-12 mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 absolute top-0 left-0" />
            <Heart className="h-5 w-5 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-pink-500 text-sm font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
