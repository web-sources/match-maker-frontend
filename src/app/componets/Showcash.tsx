"use client";

import {} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ShowcaseSection() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-rose-50 to-white w-full -mt-16 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image with emojis */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/showcase/showcase.jpg"
                alt="Happy woman using dating app"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />

              {/* Floating emojis */}
              <div className="absolute -top-6 -left-6 bg-white p-3 rounded-full shadow-lg text-2xl animate-bounce">
                😍
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-full shadow-lg text-2xl animate-bounce delay-100">
                💑
              </div>
              <div className="absolute top-1/2 -right-8 bg-white p-3 rounded-full shadow-lg text-2xl animate-bounce delay-200">
                ❤️
              </div>
            </div>
          </div>

          {/* Right side - Content with thoughts and slider */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Find Your Perfect Match
            </h2>

            <p className="text-lg text-gray-600">
              Join thousands of happy couples who found love through our app.
              It&apos;s time to write your own love story!
            </p>

            <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-6 text-lg">
              Start Your Journey Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
