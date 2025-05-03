"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProfileSkeletonLoader from "./component/ProfileSkeletonLoader";
import ErrorState from "./component/ErrorState";
import ProfileHeader from "./component/ProfileHeader";
import ProfileDetailsSection from "./component/ProfileDetailsSection";
import {
  bodyTypeMap,
  formatDate,
  goalMap,
  loveLanguageMap,
} from "../utils/helper/formatters";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

interface ProfileData {
  id: string;
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    city_name: string;
    state: string;
    country_name: string;
    is_online: boolean;
    date_joined: string;
  };
  profile_picture_url: string;
  date_of_birth: string;
  age: number;
  height_cm: number;
  body_type: string;
  gender: string;
  sexual_orientation: string;
  relationship_goal: string;
  smoking: boolean;
  drinking: boolean;
  languages_spoken: string;
  occupation: string;
  education_level: string;
  love_language: string;
  ideal_first_date: string;
  turn_ons: string;
  turn_offs: string;
  kinks: string;
  created_at: string;
}

function App() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { userId, accessToken } = useAuth();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/startup/fun/profile/?${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <ProfileSkeletonLoader />;
  }

  if (error || !profileData) {
    return <ErrorState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-15">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Member since {formatDate(profileData.user.date_joined)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 md:p-8">
            <ProfileHeader
              profile={profileData}
              bodyTypeMap={bodyTypeMap}
              goalMap={goalMap}
            />

            <ProfileDetailsSection
              profile={profileData}
              loveLanguageMap={loveLanguageMap}
              goalMap={goalMap}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
