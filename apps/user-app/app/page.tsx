// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "./lib/auth";

import CtaSection from "../components/CtaSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LogoSection from "../components/LogoSection";
import PricingSection from "../components/PricingSection";
import TestimonialsSection from "../components/TestimonialsSection";

// export default async function Home() { 
//   const session = await getServerSession(authOptions);
//   if (session?.user) {
//     redirect('/dashboard')
//   } else {
//     redirect('/api/auth/signin')
//   }
// }


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col theme-transition">
      <Header  />
      <main>
        <HeroSection />
        <LogoSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
