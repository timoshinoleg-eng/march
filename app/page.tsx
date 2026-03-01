import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import ROICalculator from "@/components/sections/ROICalculator";
import WhyUs from "@/components/sections/WhyUs";
import TechStack from "@/components/sections/TechStack";
import Cases from "@/components/sections/Cases";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Hero />
      <Problems />
      <HowItWorks />
      <Pricing />
      <ROICalculator />
      <WhyUs />
      <TechStack />
      <Cases />
      <Process />
      <FAQ />
      <Suspense fallback={<div className="h-96 bg-bg-secondary/30" />}>
        <FinalCTA />
      </Suspense>
      <Footer />
    </main>
  );
}
