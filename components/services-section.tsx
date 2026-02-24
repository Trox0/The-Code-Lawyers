"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { servicesData } from "@/lib/services-data"

function highlightText(text: string) {
  const keywords = [
    "SOC2-compliant codebase", "Web3", "Next.js", "TypeScript", "REST", "GraphQL", "PostgreSQL",
    "MongoDB", "Docker", "AWS", "API", "APIs", "RAG", "vector", "LLM",
    "SOC2-compliant", "GPT", "LangChain", "Pinecone", "WebSocket",
    "SEO architecture", "codebase", "scalable architecture",
    "Average 35%", "Average 40%", "20+ hours", "your docs", "your CRM",
    "2-3", "FTEs", "CRM", "calendar", "qualified leads", "Syncs",
    "Workflow orchestration", "Event-driven", "Real-time data sync", "Full audit logging", "50+"
  ]

  let result = text
  keywords.forEach(kw => {
    const regex = new RegExp(`(${kw})`, 'gi')
    result = result.replace(regex, '|||$1|||')
  })

  const parts = result.split('|||')

  return parts.map((part, i) => {
    const clean = part.trim()
    if (keywords.some(k => k.toLowerCase() === clean.toLowerCase())) {
      return <span key={i} className="text-purple-400 font-semibold">{part}</span>
    }
    return part
  })
}

function AnimatedBullets({ bullets, highlighted }: { bullets: string[]; highlighted?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const bulletRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 },
    )

    if (bulletRef.current) {
      observer.observe(bulletRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView || bullets.length === 0) return

    let idx = 0
    const cycle = () => {
      setActiveIndex(idx)
      idx = (idx + 1) % bullets.length
    }

    cycle()
    const interval = setInterval(cycle, 1000)

    return () => clearInterval(interval)
  }, [isInView, bullets.length])

  const activeColor = highlighted ? "bg-amber-400" : "bg-purple-400"
  const textActiveColor = highlighted ? "text-amber-300" : "text-purple-300"

  return (
    <div ref={bulletRef} className="min-h-[72px]">
      {bullets.map((bullet, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2"
        >
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${activeIndex === idx ? activeColor + " scale-125" : "bg-white/30"}`} />
          <span className={`text-xs transition-all duration-200 ${activeIndex === idx ? textActiveColor + " translate-x-1 font-medium" : "text-white/80"}`}>
            {bullet}
          </span>
        </div>
      ))}
    </div>
  )
}

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
            What we build for <span className="text-purple-500">businesses</span> like yours
          </h2>
          <p className="sr-only">
            The Code Lawyers offers comprehensive software engineering and AI solutions including web development,
            custom software, AI chatbots, AI voice bots, automation, and video content services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => {
            const Icon = service.icon

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`group relative transition-all duration-500 block ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="relative p-5 md:p-8 rounded-xl h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: service.highlighted
                      ? '1px solid rgba(245,158,11,0.3)'
                      : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: service.highlighted
                      ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(245,158,11,0.1)'
                      : '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Gradient glow on hover */}
                  <div
                    className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.gradient}`}
                    style={{ filter: 'blur(20px)', zIndex: -1 }}
                  />

                  {/* Animated border */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: service.highlighted
                        ? 'linear-gradient(135deg, rgba(245,158,11,0.3) 0%, rgba(217,119,6,0.3) 50%, rgba(245,158,11,0.3) 100%)'
                        : 'linear-gradient(135deg, rgba(147,51,234,0.3) 0%, rgba(79,70,229,0.3) 50%, rgba(147,51,234,0.3) 100%)',
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 bg-purple-500/10 group-hover:bg-purple-500/20 transition-all duration-300 animate-icon-float"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <Icon className="h-7 w-7 text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-300" />
                    <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                  </div>

                  {/* Advanced Badge */}
                  {service.highlighted && (
                    <div className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-3">
                      Advanced
                    </div>
                  )}

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold uppercase tracking-wider text-purple-400 mb-3 group-hover:text-purple-300 transition-colors duration-300 pb-1 border-b border-purple-500/30 group-hover:border-purple-400">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 flex-grow">
                    {highlightText(service.description)}
                  </p>

                  {/* Animated bullets */}
                  <div className="space-y-2 mb-6">
                    <AnimatedBullets bullets={service.bullets} highlighted={service.highlighted} />
                  </div>

                  {/* Learn More indicator */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors mt-auto animate-learn-more-pulse">
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(147,51,234,0.5), transparent)',
                    }}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
