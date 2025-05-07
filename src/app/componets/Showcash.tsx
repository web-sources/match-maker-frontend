"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/bg-overlay/bg-ol-12.jpg",
    title: "Find Your Perfect Match",
    description:
      "Join thousands of happy couples who found love through our app. It's time to write your own love story!",
    buttonText: "Start Your Journey",
  },
  {
    image: "/bg-overlay/bg-ol-11.jpg",
    title: "Love Knows No Distance",
    description:
      "Whether near or far, love is just a heartbeat away. Discover meaningful connections today!",
    buttonText: "Discover Connections",
  },
  {
    image: "/bg-overlay/bg-ol-5.jpg",
    title: "Your Happily Ever After Begins Here",
    description:
      "Every great story starts with a hello. Find someone special and write your next chapter.",
    buttonText: "Begin Your Story",
  },
  {
    image: "/bg-overlay/bg-ol-8.jpg",
    title: "Spark Meaningful Connections",
    description:
      "True love starts with a simple conversation. Take the first step toward your beautiful journey today.",
    buttonText: "Start Chatting",
  },
  {
    image: "/bg-overlay/bg-ol-7.jpg",
    title: "Love is Just a Click Away",
    description:
      "Find someone who makes your heart smile. Explore endless possibilities and real connections now.",
    buttonText: "Find Your Match",
  },
];

export function ShowcaseSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Preload all images
    slides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image;
    });
  }, []);

  const { image, title, description, buttonText } = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black z-0" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-10"
        >
          <Image
            src={image}
            alt="Romantic background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </motion.div>
      </AnimatePresence>

      {/* Centered Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide} // again key based on slide index
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                {title}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-6 text-lg shadow-lg"
                >
                  {buttonText}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-6 text-lg backdrop-blur-sm"
                >
                  How It Works
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
