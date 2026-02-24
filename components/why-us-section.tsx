"use client"

import { CheckCircle, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const reasons = [
  { text: "Clean, Bug-Free Code", gradient: "from-blue-500 to-purple-500" },
  { text: "AI You Can Understand & Trust", gradient: "from-purple-500 to-pink-500" },
  { text: "Built-In Security", gradient: "from-cyan-500 to-blue-500" },
  { text: "Ethical AI Practices", gradient: "from-violet-500 to-purple-500" },
  { text: "Systems That Grow With You", gradient: "from-indigo-500 to-cyan-500" },
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
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <p className="text-sm uppercase tracking-widest text-muted-foreground">The Code Lawyers Advantage</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-8 text-balance">
              Why businesses <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">choose</span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">us</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We build software that works reliably, handles growth, and gives you a competitive edge, without cutting corners.
            </p>
          </div>

          <div
            className={`space-y-4 transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`group cursor-pointer relative transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Glassmorphism card */}
                <div
                  className="relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${reason.gradient}`}
                    style={{ filter: 'blur(15px)' }}
                  />

                  {/* Check icon with glow */}
                  <div className="relative">
                    <CheckCircle className={`h-6 w-6 text-purple-500 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400`} />
                    <div className="absolute inset-0 bg-purple-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Text with gradient on hover */}
                  <p className={`relative text-lg text-foreground transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r ${reason.gradient} group-hover:bg-clip-text font-medium`}>
                    {reason.text}
                  </p>

                  {/* Right arrow indicator */}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2">
                    <div className={`w-6 h-px bg-gradient-to-r ${reason.gradient}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
