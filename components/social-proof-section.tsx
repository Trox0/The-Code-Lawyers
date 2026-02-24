"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

function AnimatedCounter({
  target,
  duration = 1000,
  isVisible,
}: { target: number; duration?: number; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return <>{count}</>
}

export function SocialProofSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: 30, label: "Happy Clients", suffix: "+", gradient: "from-blue-500 to-purple-500" },
    { value: 50, label: "Projects Delivered", suffix: "+", gradient: "from-purple-500 to-pink-500" },
    { value: 100, label: "Client Satisfaction", suffix: "%", gradient: "from-cyan-500 to-blue-500" },
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(147,51,234,0.05) 0%, transparent 40%, rgba(79,70,229,0.05) 100%)',
        }}
      />

      {/* Decorative borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <p
          className={`text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6 text-balance transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-purple-500">Results</span> our clients count on
        </p>
        <p
          className={`text-muted-foreground text-lg transition-all duration-500 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Delivering real outcomes for 30+ businesses and counting
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`cursor-pointer relative group transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Glassmorphism card */}
              <div
                className="relative px-8 py-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${stat.gradient}`}
                  style={{ filter: 'blur(20px)' }}
                />

                {/* Stat value with gradient text effect */}
                <p
                  className={`relative text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110`}
                >
                  <AnimatedCounter target={stat.value} isVisible={isVisible} />
                  {stat.suffix}
                </p>

                {/* Label */}
                <p className="relative text-sm text-muted-foreground mt-2 group-hover:text-foreground/70 transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${stat.gradient}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Content - merged from Final CTA */}
        <div
          className={`mt-20 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm uppercase tracking-widest text-purple-400 mb-4">
            READY TO TRANSFORM YOUR BUSINESS?
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Request{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              a Call.
            </span>
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can build the perfect solution for your business.
          </p>

          <Button
            size="lg"
            className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 shadow-lg shadow-purple-500/25"
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
            aria-label="Request a call from The Code Lawyers"
          >
            Request a Call
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
