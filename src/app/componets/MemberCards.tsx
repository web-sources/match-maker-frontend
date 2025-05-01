// components/MemberCards.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import MemberCard from "../member/MemberCard";

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

const MemberCards = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { accessToken, isprofile_complete } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [memberData, setMemberData] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 15;

  const fetchMembers = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/v1/startup/fun/community/?page=${currentPage}`,
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
      }
    } catch (error) {
      toast.error("Failed to load members");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [BASE_URL, currentPage, accessToken]);

  useEffect(() => {
    fetchMembers();
  }, [currentPage, accessToken, isprofile_complete, fetchMembers]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className="bg-gradient-to-b from-white to-pink-50 py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-pink-600 mb-8 text-center">
          Meet Our Members
        </h2>

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
          <>
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
                  languages_spoken={
                    member.personal_details?.languages_spoken || []
                  }
                />
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="border-pink-300 text-pink-600 hover:bg-pink-50 cursor cursor-pointer"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="border-pink-300 text-pink-600 cursor cursor-pointer"
                disabled
              >
                Page {currentPage}
              </Button>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={memberData.length < membersPerPage}
                className="border-pink-300 text-pink-600 hover:bg-pink-50 cursor cursor-pointer"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MemberCards;
