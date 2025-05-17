"use client";

import { ShowcaseSection } from "./componets/Showcash";
import { UIShowcaseSlider } from "./componets/Slider";
import { HowItWorksSection } from "./componets/Howlovefindsway";
import { OnboardingGuard } from "@/guards/OnboardingGuard"; // or use ProtectedRoute
import MemberCards from "./componets/MemberCards";

export default function Home() {
  return (
    <OnboardingGuard>
      <div>
        <h1>helklo</h1>
        <ShowcaseSection  />
        <MemberCards  />
        <UIShowcaseSlider />
        <HowItWorksSection />
      </div>
    </OnboardingGuard>
  );
}
