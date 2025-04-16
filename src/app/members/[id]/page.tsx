"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Mail, MessageCircle, Share2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";

// Photo data structure
const memberPhotos = [
  { id: 1, src: "/member/member-1.jpg", alt: "Jessica at the beach" },
  { id: 2, src: "/member/member-2.jpg", alt: "Jessica hiking" },
  { id: 3, src: "/member/member-3.jpg", alt: "Jessica cooking" },
];

// Similar profiles data
const similarProfiles = [
  { id: 1, name: "Emma", age: 26, src: "/member/similar-1.jpg" },
  { id: 2, name: "Sophia", age: 27, src: "/member/similar-2.jpg" },
  { id: 3, name: "Olivia", age: 28, src: "/member/similar-3.jpg" },
  { id: 4, name: "Ava", age: 29, src: "/member/similar-4.jpg" },
];

export default function MemberDetailsPage() {
  const params = useParams();
  const memberId = params.id;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 min-h-screen bg-gradient-to-br">
      <div className="container px-4 py-8 mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <Link
            href="/member"
            className="text-pink-600 hover:text-pink-700 flex items-center gap-2 transition-colors duration-200"
          >
            <span>← Back to search</span>
          </Link>
        </div>

        {/* Profile header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg group">
              <Image
                src="/member/member.jpg"
                alt="Profile picture"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-900/70 to-transparent p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Online - {memberId}
                    </span>
                  </div>
                  <div className="flex gap-1">
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
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Jessica Parker, 28
                  </h1>
                  <p className="text-gray-500 flex items-center gap-1">
                    <span>New York, United States</span>
                    <span className="text-pink-500">•</span>
                    <span>5 miles away</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full hover:bg-pink-50"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Photography", "Travel", "Cooking", "Yoga"].map((interest) => (
                  <span 
                    key={interest}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800 hover:bg-pink-200 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-pink-50 rounded-lg p-4 hover:bg-pink-100 transition-colors">
                  <p className="text-sm text-gray-500">Match compatibility</p>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-pink-500 fill-pink-500"
                        />
                      ))}
                      <Star className="h-5 w-5 text-pink-200 fill-pink-200" />
                    </div>
                    <span className="ml-2 font-medium">85%</span>
                  </div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 hover:bg-pink-100 transition-colors">
                  <p className="text-sm text-gray-500">Profile completion</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-gradient-to-r from-pink-400 to-pink-600 h-2.5 rounded-full w-[95%]"
                      aria-valuenow={95}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                  <p className="text-right text-xs mt-1 text-gray-500">95%</p>
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <Button 
                  className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-md hover:shadow-lg transition-all"
                  aria-label="Send message"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 transition-colors"
                  aria-label="Send email"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="mb-8">
          <Tabs defaultValue="about" className="bg-white rounded-xl shadow-md">
            <TabsList className="w-full border-b rounded-none p-0">
              <TabsTrigger
                value="about"
                className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 py-4 hover:text-pink-500 transition-colors"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="photos"
                className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 py-4 hover:text-pink-500 transition-colors"
              >
                Photos
              </TabsTrigger>
              <TabsTrigger
                value="interests"
                className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 data-[state=active]:text-pink-600 py-4 hover:text-pink-500 transition-colors"
              >
                Interests
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    About Me
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Hi there! I&apos;m Jessica, a passionate photographer and
                    travel enthusiast. I love exploring new places, trying
                    different cuisines, and capturing beautiful moments through my
                    lens. When I&apos;m not traveling, you can find me practicing yoga
                    or experimenting with new recipes in my kitchen.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">
                        Basic Information
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Age</span>
                          <span className="font-medium">28</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Gender</span>
                          <span className="font-medium">Female</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Location</span>
                          <span className="font-medium">New York, USA</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Looking for</span>
                          <span className="font-medium">Relationship</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">
                        Lifestyle
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Smoking</span>
                          <span className="font-medium">Never</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Drinking</span>
                          <span className="font-medium">Socially</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Exercise</span>
                          <span className="font-medium">Regular</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Children</span>
                          <span className="font-medium">Want someday</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="photos" className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {memberPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square rounded-lg overflow-hidden relative group"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="rounded-full bg-white/80 hover:bg-white text-pink-600"
                        aria-label="View photo"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="interests" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Interests & Hobbies
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Photography", "Travel", "Cooking", "Yoga",
                      "Reading", "Hiking", "Art", "Music",
                      "Movies", "Dancing", "Swimming", "Meditation"
                    ].map((interest) => (
                      <span
                        key={interest}
                        className="px-4 py-2 rounded-full bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100 hover:border-pink-300 transition-colors"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Looking For
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    I&apos;m looking for someone who shares my passion for
                    adventure and exploration. Someone who is kind, thoughtful,
                    and has a good sense of humor. I value honesty, communication,
                    and mutual respect in a relationship.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar profiles section - shown below all tabs */}
        
      </div>
      <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Similar Profiles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarProfiles.map((profile) => (
              <Link 
                href={`/members/${profile.id}`} 
                key={profile.id} 
                className="block group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={profile.src}
                    alt={`Profile of ${profile.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-900/70 to-transparent p-2">
                    <p className="text-white font-medium text-sm">
                      {profile.name}, {profile.age}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
    </div>
  );
}