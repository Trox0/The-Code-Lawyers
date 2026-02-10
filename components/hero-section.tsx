"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { ServiceMockups } from "./service-mockups"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [maxScroll, setMaxScroll] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [isMainTextHovered, setIsMainTextHovered] = useState(false)
  const rocketRef = useRef<HTMLDivElement>(null)

  const words = ["Website", "AI Automations", "Applications"]

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setMaxScroll(document.documentElement.scrollHeight - window.innerHeight)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 2000) // Change word every 2 seconds

    return () => clearInterval(interval)
  }, [])

  const scrollProgress = Math.min(scrollY / maxScroll, 1)
  const rocketY = 20 + (scrollProgress * (typeof window !== "undefined" ? window.innerHeight - 120 : 600))

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return // Desktop only - keep non-interactive
    setIsDragging(true)
    setDragStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || window.innerWidth >= 768) return

    const touchY = e.touches[0].clientY
    const viewportHeight = window.innerHeight
    const maxScroll = document.documentElement.scrollHeight - viewportHeight

    // Calculate scroll position based on touch position
    const scrollPercentage = Math.max(0, Math.min(1, touchY / viewportHeight))
    const newScrollY = scrollPercentage * maxScroll

    window.scrollTo({ top: newScrollY, behavior: 'auto' })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 pb-24 overflow-hidden"
      aria-label="Hero Section - The Code Lawyers Introduction"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" aria-hidden="true" />

      {/* Service Mockups */}
      <ServiceMockups forceHover={isMainTextHovered} />

      {/* Rocket - Moved here for better z-index control */}
      <div
        ref={rocketRef}
        className={`fixed right-4 md:right-8 md:pointer-events-none origin-center transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${isDragging ? 'scale-90 md:scale-110' : 'scale-75 md:scale-100'
          }`}
        style={{
          zIndex: 50,
          transform: `translateY(${rocketY}px) rotate(180deg)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="scrollbar"
        aria-label="Scroll indicator - drag to navigate page on mobile"
      >
        <div className="relative">
          {/* Rocket body */}
          <svg width="40" height="80" viewBox="0 0 40 80" className="drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">
            {/* Rocket flame */}
            <ellipse cx="20" cy="75" rx="6" ry="10" fill="url(#flameGradient)" className="animate-pulse" />
            <ellipse cx="20" cy="73" rx="4" ry="6" fill="#fbbf24" className="animate-pulse" />

            {/* Rocket body */}
            <path
              d="M20 5 L30 25 L30 55 L25 60 L15 60 L10 55 L10 25 Z"
              fill="url(#bodyGradient)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.5"
            />

            {/* Rocket nose cone */}
            <path d="M20 0 L28 20 L12 20 Z" fill="url(#noseGradient)" />

            {/* Window */}
            <circle cx="20" cy="30" r="5" fill="#1e1b4b" stroke="rgba(167,139,250,0.6)" strokeWidth="1" />
            <circle cx="20" cy="30" r="3" fill="rgba(167,139,250,0.3)" />

            {/* Fins */}
            <path d="M10 50 L2 65 L10 60 Z" fill="url(#finGradient)" />
            <path d="M30 50 L38 65 L30 60 Z" fill="url(#finGradient)" />

            {/* Gradients */}
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e4e4e7" />
                <stop offset="50%" stopColor="#fafafa" />
                <stop offset="100%" stopColor="#a1a1aa" />
              </linearGradient>
              <linearGradient id="noseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#5b21b6" />
              </linearGradient>
              <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          {/* Engine glow */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-12 rounded-full blur-md animate-pulse"
            style={{
              background: "linear-gradient(to bottom, rgba(251,146,60,0.6), rgba(239,68,68,0.4), transparent)",
            }}
          />
        </div>
      </div>

      {/* SEO-friendly hidden content for search engines */}
      <div className="sr-only">
        <h2>The Code Lawyers - Premier Software Engineering & AI Solutions Company</h2>
        <p>We are The Code Lawyers, a leading software development and AI solutions company. We specialize in building high-performance websites, custom web applications, mobile apps, AI chatbots, AI voice bots, and business automation solutions. Founded by Yashwant Pandey, we deliver disciplined software engineering with absolute code correctness.</p>
      </div>

      <div
        className="relative z-30 max-w-5xl mx-auto px-4 md:px-6 text-center"
        onMouseEnter={() => setIsMainTextHovered(true)}
        onMouseLeave={() => setIsMainTextHovered(false)}
      >
        <p
          className={`text-sm uppercase tracking-widest text-muted-foreground mb-6 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          itemProp="alternativeHeadline"
        >
          Digital Excellence
        </p>

        <h1
          className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-8 transition-all duration-500 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          itemProp="headline"
        >
          <span className="block">We Architect</span>
          <span className="text-purple-500 block relative h-[1.2em] my-2" aria-live="polite" aria-atomic="true">
            <span
              key={currentWordIndex}
              className="absolute left-1/2 -translate-x-1/2 animate-[fadeInOut_2s_ease-in-out] whitespace-nowrap"
            >
              {words[currentWordIndex]}
            </span>
            {/* Hidden text for SEO - includes all rotating words */}
            <span className="sr-only">Websites, AI Automations, and Applications</span>
          </span>
        </h1>

        <p
          className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-balance transition-all duration-500 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          itemProp="description"
        >
          Specializing in <span className="text-purple-400 font-medium">High-Performance Websites</span>, <span className="text-purple-400 font-medium">Custom Applications</span>, and <span className="text-purple-400 font-medium">Strategic AI Solutions</span>.
        </p>

        <nav
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          aria-label="Primary call to action"
        >
          <Button
            asChild
            size="lg"
            className="group bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300"
          >
            <Link href="#contact" aria-label="Book a free consultation with The Code Lawyers">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="hover:scale-105 hover:border-purple-500/50 transition-all duration-300 bg-transparent"
          >
            <Link href="#work" aria-label="View The Code Lawyers portfolio and projects">View Our Work</Link>
          </Button>
        </nav>
      </div>

      {/* Scroll indicator */}
      <div
        className={`hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
        role="presentation"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-purple-500 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
