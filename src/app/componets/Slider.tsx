"use client";
import { useState, useEffect } from "react";
import {
  Heart,
  MessageSquare,
  User,
  MapPin,
  Star,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

export function UIShowcaseSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const features = [
    {
      id: 1,
      title: "Smart Matching",
      description: "Our AI finds compatible partners based on your preferences",
      uiElement: (
        <div className="relative h-64 w-64 mx-auto">
          {/* Animated profile card */}
          <motion.div
            className="absolute bg-white rounded-2xl shadow-xl p-4 w-full h-full"
            initial={{ rotate: -5 }}
            animate={{ rotate: 5 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3,
            }}
          >
            <div className="h-32 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg mb-3 relative overflow-hidden">
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center">
                  <User className="text-white w-8 h-8" />
                </div>
              </motion.div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-800">Sarah, 28</h3>
              <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>New York</span>
              </div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Instant Connection",
      description: "Real-time chat with your matches",
      uiElement: (
        <div className="relative h-64 w-64 mx-auto">
          {/* Animated chat bubble */}
          <div className="space-y-3">
            <motion.div
              className="bg-white rounded-2xl rounded-bl-none p-3 shadow-sm w-3/4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm">
                Hey there! 😊 How&apos;s your day going?
              </p>
            </motion.div>
            <motion.div
              className="ml-auto bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl rounded-br-none p-3 shadow-sm w-3/4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-sm">Great! Just finished work. You?</p>
            </motion.div>
            <motion.div
              className="flex gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full p-2">
                <MessageSquare className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Interactive Profiles",
      description: "Swipe, like, and discover potential matches",
      uiElement: (
        <div className="relative h-64 w-64 mx-auto">
          {/* Animated swipe card */}
          <motion.div
            className="absolute bg-white rounded-2xl shadow-xl p-4 w-full h-full flex flex-col"
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 50) {
                console.log("Liked!");
              } else if (info.offset.x < -50) {
                console.log("Passed!");
              }
            }}
          >
            <div className="h-40 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg mb-3 flex items-center justify-center">
              <User className="text-gray-400 w-12 h-12" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">Alex, 30</h3>
              <p className="text-sm text-gray-600">
                Photographer • 5 miles away
              </p>
            </div>
            <div className="flex justify-around">
              <button className="p-2 rounded-full bg-red-100 text-red-400">
                <X className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full bg-green-100 text-green-400">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, features.length]);

  return (
    <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
          Experience the App
        </h2>

        <div className="relative">
          {/* Slider container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {features.map((feature) => (
                <div key={feature.id} className="w-full flex-shrink-0 px-4">
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-6">
                        {feature.description}
                      </p>
                      <button
                        className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
                        onMouseEnter={() => setAutoPlay(false)}
                        onMouseLeave={() => setAutoPlay(true)}
                      >
                        Try It Now
                      </button>
                    </div>
                    <div className="flex-1">{feature.uiElement}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setAutoPlay(false);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-pink-500 w-6" : "bg-pink-200"
                }`}
                aria-label={`View feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
