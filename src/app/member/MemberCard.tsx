"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

interface MemberCardProps {
  id : string;
  name: string;
  location: string;
  profilePhoto: string;
  gender: string;
  relationship_goal: string;
  languages_spoken: string[] | null;
}

const MemberCard: React.FC<MemberCardProps> = ({
  id,
  name,
  location,
  profilePhoto,
  gender,
  relationship_goal,
  languages_spoken,
}) => {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/members/${id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="bg-white border border-pink-100 rounded-xl shadow-sm p-3 flex items-center gap-4 relative hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      {/* Profile Image with Status Indicator */}
      <div className="relative">
        <div className="w-16 h-16 relative">
          <Image
            //src={`https://i.pravatar.cc/150?img=1`}

            src={profilePhoto}
            alt={name}
            fill
            className="rounded-full object-cover border-2 border-white shadow-lg group-hover:border-pink-200 transition-colors"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      {/* Info Section */}
      <div className="flex-1 min-w-0 ml-2">
        <div className="flex justify-between items-start">
          <h3 className="text-md font-semibold text-gray-800 truncate">
            {name.toUpperCase()}
          </h3>
        </div>

        <div className="flex items-center mt-1">
          <span className="text-xs text-gray-500 flex items-center">
            <svg
              className="w-3 h-3 mr-1 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {location.toUpperCase()}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full capitalize">
            {relationship_goal?.toUpperCase()}
          </span>
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full capitalize">
            {Array.isArray(languages_spoken)
              ? languages_spoken
                  .map((lang) => lang.trim().toUpperCase())
                  .join(", ")
              : typeof languages_spoken === "string"
              ? (languages_spoken as string)
                  .split(",")
                  .map((lang) => lang.trim().toUpperCase())
                  .join(", ")
              : ""}{" "}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="p-1.5 rounded-full hover:bg-pink-50 transition-colors"
        >
          {liked ? (
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          ) : (
            <Heart className="w-4 h-4 text-gray-400 hover:text-pink-400" />
          )}
        </button>
        <span className="text-xs text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full capitalize">
          {gender?.toUpperCase()}
        </span>
      </div>
    </motion.div>
  );
};

export default MemberCard;

