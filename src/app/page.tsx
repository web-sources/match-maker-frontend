"use client";

import { ShowcaseSection } from "./componets/Showcash";
import { UIShowcaseSlider } from "./componets/Slider";
import { HowItWorksSection } from "./componets/Howlovefindsway";
import { OnboardingGuard } from "@/guards/OnboardingGuard"; // or use ProtectedRoute

export default function Home() {
  return (
    <OnboardingGuard>
      <div className="relative min-h-screen">
        <main className="pt-16">
          <ShowcaseSection />
          <UIShowcaseSlider />
          <HowItWorksSection />
        </main>
      </div>
    </OnboardingGuard>
  );
}
