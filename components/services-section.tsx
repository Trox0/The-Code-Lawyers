"use client"

import { Bot, Phone, Workflow, Globe, Code } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const services = [
  {
    icon: Globe,
    title: "Websites & Applications",
    description: "Modern, fast, and conversion-focused websites and apps.",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Scalable backend systems tailored to business needs.",
  },
  {
    icon: Bot,
    title: "AI Website Chatbots",
    description: "Smart chatbots that engage visitors, answer questions, and convert leads 24/7.",
  },
  {
    icon: Phone,
    title: "AI Voice Bots",
    description: "Automated call handling, follow-ups, and appointment workflows using AI voice systems.",
  },
  {
    icon: Workflow,
    title: "AI Outreach & Automation",
    description: "AI-powered inbound and outbound workflows for lead qualification and follow-ups.",
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
    <section id="services" className="py-24 md:py-32 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`mb-16 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">What We Do</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground max-w-3xl text-balance">
            Our services span the full spectrum of <span className="text-purple-500">technology</span> and{" "}
            <span className="text-purple-500">AI solutions</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group p-8 bg-card/50 backdrop-blur-sm border border-border rounded-lg hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/5 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <service.icon className="h-8 w-8 text-purple-500 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400" />
              <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-purple-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
