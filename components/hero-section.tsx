"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SandParticles } from "./sand-particles"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <SandParticles />

      <div className="relative z-30 max-w-5xl mx-auto px-4 md:px-6 text-center">
        <p
          className={`text-sm uppercase tracking-widest text-muted-foreground mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Technology & AI Solutions
        </p>

        <h1
          className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-8 text-balance transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          We Build{" "}
          <span className="text-purple-500 inline-block hover:scale-105 transition-transform duration-300">
            Intelligent Systems
          </span>{" "}
          That Work for Your{" "}
          <span className="text-purple-500 inline-block hover:scale-105 transition-transform duration-300">
            Business
          </span>
        </h1>

        <p
          className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 text-balance transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          FrameYourCode designs and develops <span className="text-purple-400">websites</span>,{" "}
          <span className="text-purple-400">applications</span>, and{" "}
          <span className="text-purple-400">AI-powered systems</span> that automate conversations, capture leads, and
          scale operations.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Button
            asChild
            size="lg"
            className="group bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300"
          >
            <Link href="#contact">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="hover:scale-105 hover:border-purple-500/50 transition-all duration-300 bg-transparent"
          >
            <Link href="#work">View Our Work</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-purple-500 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
