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
          <span className="text-purple-500">Trusted</span> by businesses across industries
        </p>
        <p
          className={`text-muted-foreground text-lg transition-all duration-500 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          30+ happy clients and growing
        </p>

        <div className="mt-12 flex items-center justify-center gap-8 md:gap-12 flex-wrap">
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
      </div>
    </section>
  )
}
