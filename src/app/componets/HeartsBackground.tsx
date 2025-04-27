// components/HeartsBackground.tsx
"use client";

import React from "react";

interface Heart {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface HeartsBackgroundProps {
  count?: number;
  baseSize?: number;
  sizeVariation?: number;
  baseDuration?: number;
  durationVariation?: number;
  baseOpacity?: number;
  opacityVariation?: number;
  color?: string;
  className?: string;
}

export const HeartsBackground = ({
  count = 100,
  baseSize = 10,
  sizeVariation = 200,
  baseDuration = 5,
  durationVariation = 5,
  baseOpacity = 0.3,
  opacityVariation = 0.1,
  color = "text-pink-300",
  className = "",
}: HeartsBackgroundProps) => {
  const hearts: Heart[] = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * sizeVariation + baseSize,
    left: Math.random() * 100,
    delay: Math.random() * 1,
    duration: Math.random() * durationVariation + baseDuration,
    opacity: Math.random() * opacityVariation + baseOpacity,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden z-0 ${className}`}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${color} animate-float`}
          style={{
            left: `${heart.left}%`,
            top: "110%",
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};
