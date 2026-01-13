"use client"

import { CheckCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const reasons = [
  "Built systems, not just designs",
  "Practical AI implementations",
  "Clear communication and transparency",
  "Founder-led, quality-focused execution",
  "Scalable and future-ready solutions",
]

export function WhyUsSection() {
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
    <section id="about" className="py-24 md:py-32 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Why FrameYourCode</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-8 text-balance">
              We build <span className="text-purple-500">systems</span> that actually{" "}
              <span className="text-purple-500">work</span>.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our focus is on delivering practical, scalable solutions that solve real business problems. No fluff, no
              gimmicks — just quality work that drives results.
            </p>
          </div>

          <div
            className={`space-y-6 transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 group transition-all duration-500 hover:translate-x-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <CheckCircle className="h-6 w-6 text-purple-500 shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400" />
                <p className="text-lg text-foreground group-hover:text-purple-400 transition-colors duration-300">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
