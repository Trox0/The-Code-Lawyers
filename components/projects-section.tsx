"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "Student Moderation & Management App",
    description:
      "A real application built to manage student activity and moderation workflows. Focused on usability, structure, and real-world academic use cases.",
    image: "/modern-dark-dashboard-with-data-analytics-charts-a.jpg",
  },
  {
    title: "Business Website Project",
    description: "Clean, professional business website with modern UI and responsive design.",
    image: "/sleek-corporate-website-homepage-dark-theme-with-h.jpg",
  },
  {
    title: "Corporate Web Platform",
    description: "Enterprise-grade website with advanced functionality and premium aesthetics.",
    image: "/enterprise-saas-platform-dashboard-dark-mode-with-.jpg",
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
    <section id="work" className="py-24 md:py-32 bg-card/50 relative" ref={sectionRef}>
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
              className={`group transition-all duration-500 delay-${index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-secondary mb-6">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-purple-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
