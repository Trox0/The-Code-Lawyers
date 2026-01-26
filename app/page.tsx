import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { WhyUsSection } from "@/components/why-us-section"
import { FounderSection } from "@/components/founder-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { SpaceBackground } from "@/components/space-background"
import { SandParticles } from "@/components/sand-particles"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <SpaceBackground />
      <SandParticles />
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

