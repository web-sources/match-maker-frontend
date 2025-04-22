"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Mail,
  MessageCircle,
  MapPin,
  Cake,
  Ruler,
  Smile,
  HeartPulse,
  Martini,
  Languages,
  Briefcase,
  BookOpen,
  User,
  Cigarette,
  Wine,
  HeartHandshake,
  Star,
  ThumbsUp,
  ThumbsDown,
  Zap,
  ImageIcon,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// Photo data structure
const memberPhotos = [
  { id: 1, src: "/member/member-1.jpg", alt: "Profile at the beach" },
  { id: 2, src: "/member/member-2.jpg", alt: "Profile hiking" },
  { id: 3, src: "/member/member-3.jpg", alt: "Profile cooking" },
];

// Similar profiles data
const similarProfiles = [
  {
    id: 1,
    name: "Emma",
    age: 26,
    src: "/member/similar-1.jpg",
    compatibility: 85,
  },
  {
    id: 2,
    name: "Sophia",
    age: 27,
    src: "/member/similar-2.jpg",
    compatibility: 80,
  },
  {
    id: 3,
    name: "Olivia",
    age: 28,
    src: "/member/similar-3.jpg",
    compatibility: 35,
  },
  {
    id: 4,
    name: "Ava",
    age: 29,
    src: "/member/similar-4.jpg",
    compatibility: 55,
  },
];

type userProfile = {
  user: {
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    city_name: string;
    state: string;
    country_name: string;
    ip_address: string;
    my_timezone: string;
    phone_number: number;
    address: string;
    date_joined: string;
    is_online: boolean;
    is_active: boolean;
  };
  date_of_birth: string;
  age: number;
  height_cm: number;
  body_type: string;
  gender: string;
  sexual_orientation: string;
  relationship_goal: string;
  profile_picture: string;
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
  updated_at: string;
};

const MemberDetailsPage = () => {
  const [profile, setProfile] = useState<userProfile | null>(null);
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [age, setAge] = useState<number | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const params = useParams();
  const memberId = params.id;

  const calculateAge = (birthDateString: string) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't occurred yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${BASE_URL}/api/v1/startup/fun/profile/${memberId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status == 200) {
          setProfile(response.data);

          if (response.data.date_of_birth) {
            setAge(calculateAge(response.data.date_of_birth));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (memberId) {
      fetchMembers();
    }
  }, [memberId, BASE_URL, accessToken]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="flex flex-col items-center">
          <div className="relative h-12 w-12 mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 absolute top-0 left-0" />
            <Heart className="h-5 w-5 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-pink-500 text-sm font-medium">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4 text-center">Profile not found</div>
    );
  }

  // Format the languages spoken into an array
  const languagesArray = profile.languages_spoken
    ? profile.languages_spoken.split(",").map((lang) => lang.trim())
    : [];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 min-h-screen bg-gradient-to-br  to-white">
      {/* Header with back button */}
      <div className="mb-6">
        <Link
          href="/member"
          className="text-pink-600 hover:text-pink-700 flex items-center gap-2 transition-colors duration-200"
        >
          <span>← Back to search</span>
        </Link>
      </div>

      {/* Main profile grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - Profile card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 overflow-hidden shadow-lg border-0">
            <div className="relative aspect-square w-full">
              <Image
                src={profile.profile_picture || "/member/member.jpg"}
                alt={`${profile.user.first_name}'s profile`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        profile.user.is_online
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {profile.user.is_online ? "Online" : "Offline"}
                    </span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                    aria-label="Add to favorites"
                  >
                    <Heart className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {profile.user.first_name.toUpperCase()}{" "}
                    {profile.user.last_name.toUpperCase()}
                  </h1>
                  <div className="flex items-center text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {profile.user.city_name}, {profile.user.country_name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {age !== null && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-pink-500 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Age</p>
                      <p className="font-medium">{age} years</p>
                    </div>
                  </div>
                )}
                {profile?.date_of_birth && (
                  <div className="flex items-center">
                    <Cake className="h-4 w-4 text-pink-500 mr-2" />
                    <div>
                      <p className="text-xs text-gray-500">Birthday</p>
                      <p className="font-medium">
                        {new Date(profile.date_of_birth).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  <Ruler className="h-4 w-4 text-pink-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Height</p>
                    <p className="font-medium">{profile.height_cm} cm</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Smile className="h-4 w-4 text-pink-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Body Type</p>
                    <p className="font-medium capitalize">
                      {profile.body_type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <HeartPulse className="h-4 w-4 text-pink-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Orientation</p>
                    <p className="font-medium capitalize">
                      {profile.sexual_orientation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-8">
          {/* About section */}
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-white px-6 py-5 border-b border-pink-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="bg-pink-500 text-white p-2 rounded-lg mr-3">
                  <User className="h-5 w-5" />
                </span>
                About {profile.user.first_name}
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-8">
                {/* Relationship Goals */}
                <div className="bg-pink-50 rounded-xl p-5">
                  <div className="flex items-center mb-4">
                    <Heart className="h-6 w-6 text-pink-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Relationship Goals
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium shadow-sm capitalize">
                      {profile.relationship_goal}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-6 w-6 text-pink-500 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">Bio</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {profile.ideal_first_date ||
                      `${profile.user.first_name} hasn't written a bio yet.`}
                  </p>
                </div>

                {/* Occupation & Education */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center mb-4">
                      <Briefcase className="h-6 w-6 text-pink-500 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Occupation & Education
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 font-medium">
                          Occupation
                        </p>
                        <p className="font-medium text-gray-800 capitalize mt-1">
                          {profile.occupation || "Not specified"}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 font-medium">
                          Education
                        </p>
                        <p className="font-medium text-gray-800 capitalize mt-1">
                          {profile.education_level || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center mb-4">
                      <Languages className="h-6 w-6 text-pink-500 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Languages
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {languagesArray.length > 0 ? (
                        languagesArray.map((language) => (
                          <span
                            key={language}
                            className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium shadow-sm"
                          >
                            {language}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">
                          No languages specified
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Lifestyle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center mb-4">
                      <Martini className="h-6 w-6 text-pink-500 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Lifestyle
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600 flex items-center">
                          <Cigarette className="h-4 w-4 mr-2" />
                          Smoking
                        </span>
                        <span
                          className={`font-medium ${
                            profile.smoking ? "text-rose-500" : "text-green-500"
                          }`}
                        >
                          {profile.smoking ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600 flex items-center">
                          <Wine className="h-4 w-4 mr-2" />
                          Drinking
                        </span>
                        <span
                          className={`font-medium ${
                            profile.drinking
                              ? "text-rose-500"
                              : "text-green-500"
                          }`}
                        >
                          {profile.drinking ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Love Language */}
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center mb-4">
                      <HeartHandshake className="h-6 w-6 text-pink-500 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Love Language
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 text-sm font-medium shadow-sm capitalize">
                        {profile.love_language || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences section */}
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-white px-6 py-5 border-b border-pink-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="bg-pink-500 text-white p-2 rounded-lg mr-3">
                  <Star className="h-5 w-5" />
                </span>
                Preferences
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Turn Ons */}
                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                    Turn Ons
                  </h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      {profile.turn_ons || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Turn Offs */}
                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <ThumbsDown className="h-5 w-5 text-rose-500 mr-2" />
                    Turn Offs
                  </h3>
                  <div className="bg-rose-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      {profile.turn_offs || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Kinks */}
                <div className="md:col-span-2 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Zap className="h-5 w-5 text-purple-500 mr-2" />
                    Kinks
                  </h3>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      {profile.kinks || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gallery section */}
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-white px-6 py-5 border-b border-pink-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="bg-pink-500 text-white p-2 rounded-lg mr-3">
                  <ImageIcon className="h-5 w-5" />
                </span>
                Gallery
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {memberPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square rounded-xl overflow-hidden relative group"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-white/90 hover:bg-white text-pink-600 shadow-md"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-white/90 hover:bg-white text-blue-600 shadow-md"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Similar profiles section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="h-6 w-6 text-pink-500 mr-3" />
              Similar Profiles
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProfiles.map((profile) => (
                <Link
                  href={`/members/${profile.id}`}
                  key={profile.id}
                  className="block group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={profile.src}
                      alt={`Profile of ${profile.name}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                      <p className="text-white font-semibold text-sm">
                        {profile.name}, {profile.age}
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-gradient-to-r from-pink-500 to-rose-500 h-1 rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                profile.compatibility || 0
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-white">
                          {profile.compatibility}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;
