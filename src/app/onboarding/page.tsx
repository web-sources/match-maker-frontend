"use client";

import { useEffect } from "react";
import OnboardingSliderWrapper from "./OnboardingSliderWrapper";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface Heart {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
}

const OnboardingPage = () => {
  const { accessToken, loading } = useAuth();
  const router = useRouter();

  const hearts: Heart[] = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    size: Math.random() * 200 + 10,
    left: Math.random() * 100,
    delay: Math.random() * 1,
    duration: Math.random() * 5 + 5,
    opacity: Math.random() * 0.1 + 0.3,
  }));

  useEffect(() => {
    if (!loading) {
      if (!accessToken) {
        router.push("/login");
      }
    }
  }, [accessToken, loading, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!accessToken) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-pink-50 via-white to-blue-50">
      {/* Animated hearts background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-pink-300 animate-float"
            style={{
              left: `${heart.left}%`,
              top: "110%",
              fontSize: `${heart.size}px`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              opacity: heart.opacity,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Main content with higher z-index */}
      <div className="relative z-10">
        <OnboardingSliderWrapper />
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OnboardingPage;
