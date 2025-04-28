// components/settings/ProfileSettings.tsx
"use client";

import { useOnboardingStore } from "@/stores/useOnboardingStore";
import ProfileSliderWrapper from "./ProfileSliderWrapper";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { HeartsBackground } from "@/app/componets/HeartsBackground";
import Image from "next/image";

export default function ProfileSettings() {
  const { accessToken, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { updateData, resetData } = useOnboardingStore();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!loading && !accessToken) {
      router.push("/login");
    }
  }, [accessToken, loading, router]);
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/startup/fun/profile/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          // Map API response to store format
          updateData({
            date_of_birth: response.data.date_of_birth,
            gender: response.data.gender,
            sexual_orientation: response.data.sexual_orientation,
            education_level: response.data.education_level,
            occupation: response.data.occupation,
            height: response.data.height_cm,
            body_type: response.data.body_type,
            relationship_goal: response.data.relationship_goal,
            smoking: response.data.smoking,
            drinking: response.data.drinking,
            languages: response.data.languages_spoken,
            turn_ons: response.data.turn_ons,
            turn_offs: response.data.turn_offs,
            kinks: response.data.kinks,
            ideal_first_date: response.data.ideal_first_date,
            love_language: response.data.love_language,
          });

          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (accessToken) {
      fetchProfileData();
    }

    return () => resetData();
  }, [accessToken, updateData, resetData, BASE_URL]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="flex flex-col items-center">
          <div className="relative h-12 w-12 mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" />
          </div>
          <p className="text-pink-500 text-sm font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-pink-50 via-white to-blue-50">
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

      <div className="relative z-10">
        <ProfileSliderWrapper />
      </div>
    </div>
  );
}
