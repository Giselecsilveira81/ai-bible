import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import Manifesto from "@/components/landing/Manifesto";
import Features from "@/components/landing/Features";
import ShowcaseAI from "@/components/landing/ShowcaseAI";
import DemoChat from "@/components/landing/DemoChat";
import ShowcasePlans from "@/components/landing/ShowcasePlans";
import VerseFeature from "@/components/landing/VerseFeature";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import Compare from "@/components/landing/Compare";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTAFinal from "@/components/landing/CTAFinal";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Features />
      <ShowcaseAI />
      <DemoChat />
      <ShowcasePlans />
      <VerseFeature />
      <Stats />
      <HowItWorks />
      <Compare />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTAFinal />
    </>
  );
}
