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

// Компонент загрузки для Suspense
function SectionSkeleton({ className = "" }: { className?: string }) {
  return <div className={`min-h-[300px] animate-pulse bg-bg-secondary/30 ${className}`} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary overflow-x-hidden">
      {/* Hero - критический контент, загружаем сразу */}
      <Hero />
      
      {/* Остальные секции с приоритетами */}
      <Problems />
      <HowItWorks />
      <Pricing />
      <ROICalculator />
      <WhyUs />
      <TechStack />
      <Cases />
      <Process />
      <FAQ />
      
      {/* FinalCTA с Suspense из-за useSearchParams */}
      <Suspense fallback={<SectionSkeleton className="bg-bg-secondary/30" />}>
        <FinalCTA />
      </Suspense>
      
      <Footer />
    </main>
  );
}
