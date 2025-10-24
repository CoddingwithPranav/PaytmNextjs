import CtaSection from "../components/CtaSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import PricingSection from "../components/PricingSection";
import TestimonialsSection from "../components/TestimonialsSection";
import { AppBarClient } from "./AppBarClinet";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col theme-transition">
      <AppBarClient  />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
