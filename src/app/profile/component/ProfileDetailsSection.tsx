import React from 'react';
import ProfileCard from './ProfileCard';
import { Heart, Smile, Frown, Flame, Cake, Clock, Star } from 'lucide-react';

interface ProfileDetailsSectionProps {
  profile: {
    user: {
      first_name: string;
      city_name: string;
      is_online: boolean;
    };
    age: number;
    love_language: string;
    turn_ons: string;
    turn_offs: string;
    kinks: string;
    ideal_first_date: string;
    relationship_goal: string;
    occupation: string;
    languages_spoken: string;
  };
  loveLanguageMap: Record<string, string>;
  goalMap: Record<string, string>;
}

const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({ 
  profile, 
  loveLanguageMap,
  goalMap
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        <ProfileCard
          icon={<Heart className="w-5 h-5" />}
          title="Love Language"
          content={loveLanguageMap[profile.love_language] || profile.love_language}
          color="text-rose-600 dark:text-rose-400"
          bgColor="bg-rose-100"
          darkBgColor="dark:bg-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileCard
            icon={<Smile className="w-5 h-5" />}
            title="Turn Ons"
            content={profile.turn_ons}
            color="text-green-600 dark:text-green-400"
            bgColor="bg-green-100"
            darkBgColor="dark:bg-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />

          <ProfileCard
            icon={<Frown className="w-5 h-5" />}
            title="Turn Offs"
            content={profile.turn_offs}
            color="text-red-600 dark:text-red-400"
            bgColor="bg-red-100"
            darkBgColor="dark:bg-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          />
        </div>

        <ProfileCard
          icon={<Flame className="w-5 h-5" />}
          title="Kinks & Interests"
          content={profile.kinks}
          color="text-purple-600 dark:text-purple-400"
          bgColor="bg-purple-100"
          darkBgColor="dark:bg-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <ProfileCard
          icon={<Cake className="w-5 h-5" />}
          title="Ideal First Date"
          content={profile.ideal_first_date}
          color="text-amber-600 dark:text-amber-400"
          bgColor="bg-amber-100"
          darkBgColor="dark:bg-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />

        <ProfileCard
          icon={<Clock className="w-5 h-5" />}
          title="Availability"
          content={profile.user.is_online
            ? "Available now for dates"
            : "Usually available evenings and weekends"}
          color="text-blue-600 dark:text-blue-400"
          bgColor="bg-blue-100"
          darkBgColor="dark:bg-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />

        <ProfileCard
          icon={<Star className="w-5 h-5" />}
          title="About Me"
          content={`${profile.user.first_name} is a ${profile.age}-year-old ${profile.occupation?.toLowerCase()} from ${profile.user.city_name}. ${profile.user.first_name} is looking for ${goalMap[profile.relationship_goal]?.toLowerCase() || profile.relationship_goal} and speaks ${profile.languages_spoken?.toLowerCase()}.`}
          color="text-rose-600 dark:text-rose-400"
          bgColor="bg-rose-100"
          darkBgColor="dark:bg-gray-700"
          className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-700 dark:to-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        />
      </div>
    </div>
  );
};

export default ProfileDetailsSection;