import { Hero } from "@/components/features/Hero";
import { FeatureCards } from "@/components/features/FeatureCards";
import { Mission } from "@/components/features/Mission";
import { DynamicContentSection } from "@/components/features/DynamicContentSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <FeatureCards />
      <DynamicContentSection />
      <Mission />
    </div>
  );
}
