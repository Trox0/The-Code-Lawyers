"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "Student Moderation & Management App",
    description:
      "A real application built to manage student activity and moderation workflows. Focused on usability, structure, and real-world academic use cases.",
    image: "/modern-dark-dashboard-with-data-analytics-charts-a.jpg",
    gradient: "from-blue-500/40 to-purple-500/40",
  },
  {
    title: "Business Website Project",
    description: "Clean, professional business website with modern UI and responsive design.",
    image: "/sleek-corporate-website-homepage-dark-theme-with-h.jpg",
    gradient: "from-purple-500/40 to-pink-500/40",
  },
  {
    title: "Corporate Web Platform",
    description: "Enterprise-grade website with advanced functionality and premium aesthetics.",
    image: "/enterprise-saas-platform-dashboard-dark-mode-with-.jpg",
    gradient: "from-cyan-500/40 to-purple-500/40",
  },
]

export function ProjectsSection() {
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
    <section id="work" className="py-24 md:py-32 relative" ref={sectionRef}>
      {/* Section background with subtle gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(147,51,234,0.03) 0%, transparent 50%, rgba(79,70,229,0.03) 100%)',
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`mb-16 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Our Work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4 text-balance">
            What We&apos;ve <span className="text-purple-500">Built</span>
          </h2>
          <p className="text-muted-foreground text-sm">Some projects shown are internal or client-approved demos.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group cursor-pointer transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card container with glassmorphism */}
              <div 
                className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                {/* Image container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  {/* Gradient overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  />
                  {/* Bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content with glassmorphism */}
                <div 
                  className="relative p-6"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)',
                  }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Decorative line */}
                  <div 
                    className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(147,51,234,0.5), transparent)',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
