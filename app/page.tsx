import Header from "@/components/sections/Header"
import Hero from "@/components/sections/Hero"
import Problems from "@/components/sections/Problems"
import HowItWorks from "@/components/sections/HowItWorks"
import Pricing from "@/components/sections/Pricing"
import Calculator from "@/components/sections/Calculator"
import Advantages from "@/components/sections/Advantages"
import Integrations from "@/components/sections/Integrations"
import Cases from "@/components/sections/Cases"
import Process from "@/components/sections/Process"
import FAQ from "@/components/sections/FAQ"
import Footer from "@/components/sections/Footer"
import ChatWidget from "@/components/ChatWidget"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <HowItWorks />
        <Pricing />
        <Calculator />
        <Advantages />
        <Integrations />
        <Cases />
        <Process />
        <FAQ />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
