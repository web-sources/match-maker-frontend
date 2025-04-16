"use client";

import React, { useState } from "react";
import { MemberFilters } from "./MemberFilters";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MemberCard from "./MemberCard";

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

const MemberPage = () => {
  const [activeFilters, setActiveFilters] = useState<
    Partial<MemberFiltersProps>
  >({});

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

  const sampleMembers = [
    {
      name: "Ava Johnson",
      location: "New York, USA",
      gender: "female",
      profilePhoto: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Liam Smith",
      location: "London, UK",
      gender: "male",
      profilePhoto: "https://i.pravatar.cc/150?img=10",
    },
    {
      name: "Noah Chen",
      location: "Toronto, Canada",
      gender: "male",
      profilePhoto: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Sophia Lee",
      location: "Seoul, South Korea",
      gender: "female",
      profilePhoto: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Ethan Patel",
      location: "Mumbai, India",
      gender: "male",
      profilePhoto: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Isabella Gomez",
      location: "Madrid, Spain",
      gender: "female",
      profilePhoto: "https://i.pravatar.cc/150?img=26",
    },
    {
      name: "Lucas Müller",
      location: "Berlin, Germany",
      gender: "male",
      profilePhoto: "https://i.pravatar.cc/150?img=27",
    },
    {
      name: "Mia Rossi",
      location: "Rome, Italy",
      gender: "female",
      profilePhoto: "https://i.pravatar.cc/150?img=28",
    },
    {
      name: "Isabella Gomez",
      location: "Madrid, Spain",
      gender: "female",
      profilePhoto: "https://i.pravatar.cc/150?img=36",
    },
    {
      name: "Lucas Müller",
      location: "Berlin, Germany",
      gender: "male",
      profilePhoto: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Mia Rossi",
      location: "Rome, Italy",
      gender: "female",
      profilePhoto: "https://i.pravatar.cc/150?img=58",
    },
    {
      name: "Isabella Gomez",
      location: "Madrid, Spain",
      gender: "female",
      profilePhoto: "https://i.pravatar.cc/150?img=36",
    },
    {
      name: "Lucas Müller",
      location: "Berlin, Germany",
      gender: "male",
      profilePhoto: "https://i.pravatar.cc/150?img=7",
    },
    {
      name: "Mia Rossi",
      location: "Rome, Italy",
      gender: "female",
      profilePhoto: "https://i.pravatar.cc/150?img=20",
    },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleMembers.map((member, idx) => (
          <MemberCard key={idx} {...member} />
        ))}
      </div>
    </div>
  );
};

export default MemberPage;
