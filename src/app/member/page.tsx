"use client";

import React, { useEffect, useState } from "react";
import { MemberFilters } from "./MemberFilters";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import MemberCard from "./MemberCard";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface MemberFiltersProps {
  minAge?: number;
  maxAge?: number;
  gender?: string;
  lookingFor?: string;
  country?: string;
  city?: string;
  isOnline?: boolean;
  interests?: string[];
  languages?: string[];
  distanceFromUser?: number;
}

interface PersonalDetails {
  gender: string;
  relationship_goal: string;
  languages_spoken: string[] | null;
  profile_picture: string;
}

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  city_name: string;
  country_name: string;
  personal_details: PersonalDetails;
}

const MemberPage = () => {
  const [activeFilters, setActiveFilters] = useState<
    Partial<MemberFiltersProps>
  >({});
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [memberData, setMemberData] = useState<Member[]>([]);

  useEffect(() => {
    try {
      const fetchMembers = async () => {
        setIsLoading(true);

        const response = await axios.get(
          `${BASE_URL}/api/v1/startup/fun/community/`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setMemberData(response.data.results);
          setIsLoading(false);
        }
      };
      fetchMembers();
    } catch (error) {
      console.error(error);
    }
  }, [router, BASE_URL, accessToken]);

  const handleApplyFilters = (filters: MemberFiltersProps) => {
    console.log("Applying filters:", filters);
    setActiveFilters(filters);
  };

  const removeFilter = (key: keyof MemberFiltersProps) => {
    const newFilters = { ...activeFilters };
    delete newFilters[key];
    setActiveFilters(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  console.log(memberData);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-pink-600">Discover Members</h1>
        <MemberFilters onApplyFilters={handleApplyFilters} />
      </div>

      {Object.keys(activeFilters).length > 0 && (
        <div className="mb-6">
          <div className="border border-pink-200 bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-pink-600">
                Active Filters
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-pink-500 hover:text-pink-700"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).map(([key, value]) => {
                if (!value || (Array.isArray(value) && value.length === 0))
                  return null;

                let displayValue = value;
                if (key === "minAge") {
                  displayValue = `Min: ${value} years`;
                } else if (key === "maxAge") {
                  displayValue = `Max: ${value} years`;
                } else if (key === "distanceFromUser") {
                  displayValue = `Within ${value} km`;
                } else if (key === "isOnline" && value) {
                  displayValue = "Online Now";
                } else if (Array.isArray(value)) {
                  displayValue = value.join(", ");
                } else if (key === "gender") {
                  displayValue =
                    value === "male"
                      ? "Male"
                      : value === "female"
                      ? "Female"
                      : "Other";
                } else if (key === "lookingFor") {
                  displayValue =
                    value === "relationship"
                      ? "Relationship"
                      : value === "friendship"
                      ? "Friendship"
                      : value === "casual"
                      ? "Casual Dating"
                      : "Networking";
                }

                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
                  >
                    <span className="capitalize">
                      {key === "isOnline"
                        ? displayValue
                        : `${key
                            .replace(/([A-Z])/g, " $1")
                            .trim()}: ${displayValue}`}
                    </span>
                    <button
                      onClick={() =>
                        removeFilter(key as keyof MemberFiltersProps)
                      }
                      className="text-pink-400 hover:text-pink-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Member list would go here */}
      {isLoading ? (
        <div className="w-full flex justify-center py-10">
          <div className="flex flex-col items-center">
            <div className="relative h-12 w-12 mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 absolute top-0 left-0" />
              <Heart className="h-5 w-5 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="text-pink-500 text-sm font-medium">
              Loading members...
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberData.map((member, idx) => (
            <MemberCard
              id={member.id}
              key={idx}
              name={`${member.first_name} ${member.last_name}`}
              location={`${member.city_name}, ${member.country_name}`}
              profilePhoto={
                member.personal_details?.profile_picture || "/fallback.jpg"
              }
              gender={member.personal_details?.gender}
              relationship_goal={member.personal_details?.relationship_goal}
              languages_spoken={member.personal_details?.languages_spoken || []}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberPage;
