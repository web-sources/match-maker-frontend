// guards/OnboardingGuard.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const OnboardingGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken, loading, isprofile_complete } = useAuth();
  const router = useRouter();

  console.log(isprofile_complete);

  useEffect(() => {
    if (!loading) {
      if (!accessToken) {
        router.replace("/login");
      } else if (!isprofile_complete) {
        router.replace("/onboarding");
      }
    }
  }, [accessToken, isprofile_complete, loading, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-lg font-medium text-gray-700">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  if (!accessToken || !isprofile_complete) {
    return null;
  }

  return <>{children}</>;
};
