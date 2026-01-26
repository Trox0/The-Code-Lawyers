"use client"

import { Bot, Phone, Workflow, Globe, Code, Video } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const services = [
  {
    icon: Globe,
    title: "Websites & Applications",
    description: "Modern, fast, and conversion-focused websites and apps.",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Scalable backend systems tailored to business needs.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Bot,
    title: "AI Website Chatbots",
    description: "Smart chatbots that engage visitors, answer questions, and convert leads 24/7.",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Phone,
    title: "AI Voice Bots",
    description: "Automated call handling, follow-ups, and appointment workflows using AI voice systems.",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    icon: Workflow,
    title: "AI Outreach & Automation",
    description: "AI-powered inbound and outbound workflows for lead qualification and follow-ups.",
    gradient: "from-indigo-500/20 to-cyan-500/20",
  },
  {
    icon: Video,
    title: "AI Video & Content Editing",
    description: "High-impact short-form content, AI-generated videos, and professional editing tailored for social growth.",
    gradient: "from-pink-500/20 to-violet-500/20",
  },
]

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="services" 
      className="py-24 md:py-32 relative" 
      ref={sectionRef}
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="numberOfItems" content="6" />
      <meta itemProp="name" content="The Code Lawyers Services" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`mb-16 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">What We Do</p>
          <h2 
            id="services-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground max-w-3xl text-balance"
          >
            Our services span the full spectrum of <span className="text-purple-500">technology</span> and{" "}
            <span className="text-purple-500">AI solutions</span>.
          </h2>
          {/* Hidden SEO text */}
          <p className="sr-only">
            The Code Lawyers offers comprehensive software engineering and AI solutions including web development, 
            custom software, AI chatbots, AI voice bots, automation, and video content services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group cursor-pointer relative ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Glassmorphism card */}
              <div 
                className="relative p-8 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                {/* Gradient glow effect on hover */}
                <div 
                  className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.gradient}`}
                  style={{ filter: 'blur(20px)', zIndex: -1 }}
                />
                
                {/* Animated border gradient */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(147,51,234,0.3) 0%, rgba(79,70,229,0.3) 50%, rgba(147,51,234,0.3) 100%)',
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                  }}
                />

                {/* Icon container with glow */}
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 bg-purple-500/10 group-hover:bg-purple-500/20 transition-all duration-300">
                  <service.icon className="h-7 w-7 text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-300" />
                  {/* Icon glow */}
                  <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Bottom shine effect */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(147,51,234,0.5), transparent)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
