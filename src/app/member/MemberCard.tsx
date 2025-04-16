"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface MemberCardProps {
  name: string;
  location: string;
  profilePhoto: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  location,
  profilePhoto,
}) => {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/members/${1}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-pink-100 rounded-xl shadow-sm p-3 flex items-center gap-4 relative hover:shadow-md transition-shadow duration-200"
    >
      {/* Profile Image */}
      <div className="w-16 h-16 relative">
        <Image
          src={profilePhoto}
          alt={name}
          fill
          className="rounded-full object-cover border-2 border-white shadow"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center">
        <h3 className="text-md font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{location}</p>
      </div>

      {/* Heart icon */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-pink-100 transition-colors cursor cursor-pointer"
      >
        {liked ? (
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
        ) : (
          <Heart className="w-5 h-5 text-pink-400" />
        )}
      </button>
    </div>
  );
};

export default MemberCard;
