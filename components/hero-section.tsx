"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { ServiceMockups } from "./service-mockups"

// Continuous looping typewriter with purple word-by-word highlight
function TypewriterText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [started, setStarted] = useState(false)

  // Split text into words while preserving spaces
  const words = text.split(' ')

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return

    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length) // Loop continuously
    }, 600) // 600ms per word for readable pace

    return () => clearInterval(timer)
  }, [started, words.length])

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={index}>
          <span
            className={`transition-all duration-500 ease-in-out ${index === currentWordIndex
              ? 'text-purple-400 font-bold inline-block scale-110'
              : 'text-foreground inline-block scale-100'
              }`}
            style={{
              display: 'inline-block',
            }}
          >
            {word}
          </span>
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isMainTextHovered, setIsMainTextHovered] = useState(false)

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

      {/* Service Mockups */}
      <ServiceMockups forceHover={isMainTextHovered} />

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
          Software & AI That Delivers Results
        </p>

        <h1
          className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-8 transition-all duration-500 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          itemProp="headline"
        >
          <span className="block">We Build</span>
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
          className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 text-balance transition-all duration-500 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          itemProp="description"
        >
          <TypewriterText
            text="Websites that convert. Modern tech. AI that doubles your workforce."
            delay={800}
          />
        </p>

        <nav
          className={`flex items-center justify-center transition-all duration-500 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          aria-label="Primary call to action"
        >
          <Button
            size="lg"
            className="group bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault()
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }
            }}
            aria-label="Get your project reviewed by The Code Lawyers"
          >
            Get Your Project Reviewed
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
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
