"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function FounderSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 md:py-32 bg-card/50 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={`flex flex-col md:flex-row items-center gap-12 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative w-48 h-48 shrink-0 group">
            <div className="w-full h-full rounded-full bg-secondary overflow-hidden ring-4 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-500">
              <Image
                src="/images/yashwant-pandey.jpeg"
                alt="Yashwant Pandey"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors duration-500" />
          </div>

          <div
            className={`transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Meet the Founder</p>
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
              <span className="text-purple-500">Yashwant Pandey</span>
            </h3>
            <p className="text-muted-foreground mb-6">Founder, FrameYourCode</p>
            <p className="text-foreground leading-relaxed text-balance">
              FrameYourCode was started with a simple goal — to build <span className="text-purple-400">software</span>{" "}
              and <span className="text-purple-400">AI systems</span> that actually solve business problems, not just
              look good on paper.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
