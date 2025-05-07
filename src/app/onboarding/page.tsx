"use client";

import { useEffect } from "react";
import OnboardingSliderWrapper from "./OnboardingSliderWrapper";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import Image from "next/image";
import { HeartsBackground } from "../componets/HeartsBackground";



const OnboardingPage = () => {
  const { accessToken, loading } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!loading) {
      if (!accessToken) {
        router.push("/login");
      }
    }
  }, [accessToken, loading, router]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="flex flex-col items-center">
          <div className="relative h-12 w-12 mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 absolute top-0 left-0" />
            <Heart className="h-5 w-5 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-pink-500 text-sm font-medium">Loading ...</p>
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

      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-overlay/bg-ol-11.jpg"
          alt="Happy couple background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <HeartsBackground
        color="text-rose-300"
        className="pointer-events-none z-10" 
      />
      {/* Main content with higher z-index */}
      <div className="relative z-10">
        <OnboardingSliderWrapper />
      </div>

    </div>
  );
};

export default OnboardingPage;
