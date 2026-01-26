"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const words = ["Website", "AI Automations", "Applications"]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 2000) // Change word every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-20 pb-24 overflow-hidden"
      aria-label="Hero Section - The Code Lawyers Introduction"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" aria-hidden="true" />

      <div className="relative z-30 max-w-5xl mx-auto px-4 md:px-6 text-center">
        {/* SEO-friendly hidden content for search engines */}
        <div className="sr-only">
          <h2>The Code Lawyers - Premier Software Engineering & AI Solutions Company</h2>
          <p>We are The Code Lawyers, a leading software development and AI solutions company. We specialize in building high-performance websites, custom web applications, mobile apps, AI chatbots, AI voice bots, and business automation solutions. Founded by Yashwant Pandey, we deliver disciplined software engineering with absolute code correctness.</p>
        </div>

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

