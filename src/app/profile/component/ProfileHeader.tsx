import React from 'react';
import { 
  Heart, Calendar, Ruler, Martini, GraduationCap, 
  Languages, Briefcase, Flame, Gauge, Cigarette 
} from 'lucide-react';

interface ProfileHeaderProps {
  profile: {
    profile_picture_url: string;
    user: {
      first_name: string;
      last_name: string;
      city_name: string;
      is_online: boolean;
    };
    age: number;
    height_cm: number;
    body_type: string;
    sexual_orientation: string;
    relationship_goal: string;
    smoking: boolean;
    drinking: boolean;
    languages_spoken: string;
    education_level: string;
    occupation: string;
  };
  bodyTypeMap: Record<string, string>;
  goalMap: Record<string, string>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profile, bodyTypeMap, goalMap 
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-10">
      <div className="group relative w-full md:w-2/5 aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 transition-transform duration-300 hover:scale-[1.01]">
        <img
          src={profile.profile_picture_url}
          alt={`${profile.user.first_name}'s profile`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {profile.user.first_name}{" "}
                <span className="text-rose-200">
                  {profile.user.last_name}
                </span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg text-rose-100">
                  {profile.age}
                </span>
                <span className="text-white/80">•</span>
                <span className="text-white/80">
                  {profile.user.city_name}
                </span>
              </div>
            </div>
            <div className={`px-3 py-1.5 text-sm flex items-center gap-2 rounded-full shadow-md ${
              profile.user.is_online 
                ? "bg-emerald-500 text-white" 
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                profile.user.is_online
                  ? "bg-white"
                  : "bg-gray-400"
              }`}></span>
              {profile.user.is_online ? "Online Now" : "Offline"}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/5 space-y-5">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-gray-800/50 dark:to-gray-800/50 dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-rose-100 dark:border-gray-700 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 dark:bg-gray-700 p-2.5 rounded-full">
                <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Interested In
                </p>
                <p className="font-semibold capitalize text-gray-900 dark:text-white">
                  {profile.sexual_orientation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-rose-100 dark:bg-gray-700 p-2.5 rounded-full">
                <Gauge className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Looking For
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {goalMap[profile.relationship_goal] ||
                    profile.relationship_goal}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-rose-100 dark:bg-gray-700 p-2.5 rounded-full">
                <Ruler className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Height
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {profile.height_cm} cm •{" "}
                  {bodyTypeMap[profile.body_type] || profile.body_type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-rose-100 dark:bg-gray-700 p-2.5 rounded-full">
                <Calendar className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Lifestyle
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Cigarette className={`w-4 h-4 mr-1 ${profile.smoking ? "text-rose-500" : "text-gray-400"}`} />
                    <span className={`text-sm ${profile.smoking ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                      {profile.smoking ? "Smoker" : "Non-smoker"}
                    </span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="flex items-center">
                    <Martini className={`w-4 h-4 mr-1 ${profile.drinking ? "text-rose-500" : "text-gray-400"}`} />
                    <span className={`text-sm ${profile.drinking ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                      {profile.drinking ? "Drinks" : "Non-drinker"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1.5 text-sm flex items-center gap-1 rounded-full shadow-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <Languages className="w-4 h-4" />
            {profile.languages_spoken}
          </div>
          <div className="px-3 py-1.5 text-sm flex items-center gap-1 rounded-full shadow-sm bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <GraduationCap className="w-4 h-4" />
            {profile.education_level}
          </div>
          <div className="px-3 py-1.5 text-sm flex items-center gap-1 rounded-full shadow-sm bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-100 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <Briefcase className="w-4 h-4" />
            {profile.occupation}
          </div>
          <div className="px-3 py-1.5 text-sm flex items-center gap-1 rounded-full shadow-sm bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-100 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <Flame className="w-4 h-4" />
            {goalMap[profile.relationship_goal] || profile.relationship_goal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;