import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"

const ServicesSection = dynamic(() => import("@/components/services-section").then(mod => mod.ServicesSection))
const ProjectsSection = dynamic(() => import("@/components/projects-section").then(mod => mod.ProjectsSection))
const SocialProofSection = dynamic(() => import("@/components/social-proof-section").then(mod => mod.SocialProofSection))
const WhyUsSection = dynamic(() => import("@/components/why-us-section").then(mod => mod.WhyUsSection))
const FounderSection = dynamic(() => import("@/components/founder-section").then(mod => mod.FounderSection))
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => mod.ContactSection))
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer))
import { LazyBackgrounds } from "@/components/lazy-backgrounds"
import { AnimatedRocket } from "@/components/animated-rocket"


export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <LazyBackgrounds />
      <AnimatedRocket />
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <SocialProofSection />
      <WhyUsSection />
      <FounderSection />
      <ContactSection />
      <Footer />

    </main>
  )
}
