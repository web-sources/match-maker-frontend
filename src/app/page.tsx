import { ShowcaseSection } from "./componets/Showcash";
import { UIShowcaseSlider } from "./componets/Slider";
import { HowItWorksSection } from "./componets/Howlovefindsway";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <main className="pt-16">
        <ShowcaseSection />
        <UIShowcaseSlider />
        <HowItWorksSection />
      </main>
    </div>
  );
}
