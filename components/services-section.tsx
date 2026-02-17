"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { servicesData } from "@/lib/services-data"

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
              <article
                key={service.slug}
                className={`group relative transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="relative p-8 rounded-xl h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
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
                      background: 'linear-gradient(135deg, rgba(147,51,234,0.3) 0%, rgba(79,70,229,0.3) 50%, rgba(147,51,234,0.3) 100%)',
                      padding: '1px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                    }}
                  />

                  {/* Icon */}
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 bg-purple-500/10 group-hover:bg-purple-500/20 transition-all duration-300">
                    <Icon className="h-7 w-7 text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-300" />
                    <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Process steps (compact) */}
                  <div className="space-y-2 mb-6">
                    {service.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center text-[10px] font-bold text-purple-400 border border-purple-500/20 shrink-0">
                          {stepIdx + 1}
                        </div>
                        <span className="text-xs text-muted-foreground">{step.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More link */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors mt-auto group/link"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(147,51,234,0.5), transparent)',
                    }}
                  />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
