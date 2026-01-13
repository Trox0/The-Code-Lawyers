"use client"

import { useEffect, useRef, useState } from "react"

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

  return (
    <section className="py-24 md:py-32 border-y border-border relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p
          className={`text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6 text-balance transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-purple-500">Trusted</span> by businesses across industries
        </p>
        <p
          className={`text-muted-foreground text-lg transition-all duration-500 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          30+ happy clients and growing
        </p>

        <div className="mt-12 flex items-center justify-center gap-12 flex-wrap">
          {[
            { value: 30, label: "Happy Clients", suffix: "+" },
            { value: 50, label: "Projects Delivered", suffix: "+" },
            { value: 100, label: "Client Satisfaction", suffix: "%" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <p className="text-4xl md:text-5xl font-semibold text-purple-500 hover:scale-110 transition-transform duration-300">
                <AnimatedCounter target={stat.value} isVisible={isVisible} />
                {stat.suffix}
              </p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
