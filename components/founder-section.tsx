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

  const founders = [
    {
      name: "Yashwant Pandey",
      role: "Co-Founder & CEO",
      image: "/images/yashwant-pandey.jpeg",
      bio: (
        <>
          Engineering <span className="text-purple-400 font-medium">strategic assets</span>, not just software. We bring discipline to digital chaos to drive <span className="text-purple-400 font-medium">measurable business impact</span>.
        </>
      )
    },
    {
      name: "Kshitij Sharma",
      role: "Co-Founder & CTO",
      image: "/images/kshitij.jpg",
      bio: (
        <>
          Architecting <span className="text-purple-400 font-medium">scalable, future-proof systems</span> that leverage cutting-edge AI to secure your <span className="text-purple-400 font-medium">technological advantage</span>.
        </>
      )
    }
  ]

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(147,51,234,0.04) 0%, transparent 50%, rgba(79,70,229,0.04) 100%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6">

        <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Meet the Founders</p>
        </div>

        <div className="flex flex-col gap-8">
          {founders.map((founder, index) => (
            <div
              key={index}
              className={`group relative cursor-pointer rounded-3xl p-8 md:p-12 transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Gradient glow effect on hover */}
              <div
                className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(147,51,234,0.4), rgba(79,70,229,0.3), rgba(147,51,234,0.4))',
                  filter: 'blur(25px)',
                }}
              />

              {/* Animated gradient border */}
              <div
                className="absolute inset-0 rounded-3xl opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(147,51,234,0.3), transparent, rgba(79,70,229,0.3))',
                  padding: '1px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                }}
              />

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                {/* Profile image with animated glow */}
                <div className="relative w-48 h-48 shrink-0 group/image">
                  {/* Animated glow ring */}
                  <div
                    className="absolute -inset-3 rounded-full opacity-50 animate-pulse"
                    style={{
                      background: 'linear-gradient(135deg, rgba(147,51,234,0.4), rgba(79,70,229,0.4))',
                      filter: 'blur(15px)',
                    }}
                  />

                  {/* Profile container */}
                  <div
                    className="relative w-full h-full rounded-full overflow-hidden transition-all duration-500 group-hover/image:scale-105 bg-black/50 flex items-center justify-center border-2 border-purple-500/30"
                    style={{
                      boxShadow: '0 0 30px rgba(147,51,234,0.3), inset 0 0 30px rgba(0,0,0,0.3)',
                    }}
                  >
                    {founder.image ? (
                      <Image
                        src={founder.image}
                        alt={`${founder.name} - ${founder.role}`}
                        fill
                        sizes="192px"
                        quality={75}
                        unoptimized={true} // Bypassing optimization to fix potential caching/rendering issues
                        className="object-cover object-top transition-transform duration-700 group-hover/image:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-900/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-purple-500/50">{founder.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`text-center md:text-left transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                >
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                    <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">{founder.name}</span>
                  </h3>
                  <p className="text-muted-foreground mb-6">{founder.role}, The Code Lawyers</p>
                  <p className="text-foreground leading-relaxed text-balance">
                    {founder.bio}
                  </p>

                  {/* Decorative elements */}
                  <div className="flex items-center gap-2 mt-6 justify-center md:justify-start">
                    <div className="w-12 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                    <div className="w-2 h-2 rounded-full bg-purple-500/50" />
                    <div className="w-8 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-6 left-6 opacity-20">
                <div className="w-6 h-px bg-gradient-to-r from-purple-500 to-transparent" />
                <div className="w-px h-6 bg-gradient-to-b from-purple-500 to-transparent" />
              </div>
              <div className="absolute bottom-6 right-6 opacity-20">
                <div className="w-6 h-px bg-gradient-to-l from-purple-500 to-transparent ml-auto" />
                <div className="w-px h-6 bg-gradient-to-t from-purple-500 to-transparent ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
