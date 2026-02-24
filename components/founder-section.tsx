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
          A <span className="text-purple-400 font-medium">researcher</span> with 2 years as a <span className="text-purple-400 font-medium">data scientist</span>, combined with 3 years of <span className="text-purple-400 font-medium">social media brand management</span> expertise.
        </>
      )
    },
    {
      name: "Kshitij Sharma",
      role: "Co-Founder & CTO",
      image: "/images/kshitij.jpg",
      bio: (
        <>
          An <span className="text-purple-400 font-medium">SDE1</span> with 3.5 years of experience, bringing strong technical expertise from <span className="text-purple-400 font-medium">Mumbai</span>.
        </>
      )
    },
    {
      name: "Raunak Sadhwani",
      role: "Co-Founder & Senior AI Software Engineer",
      image: "/images/raunak-sadhwani.jpg",
      bio: (
        <>
          Over 2 years of <span className="text-purple-400 font-medium">international experience in Germany</span> combined with 3 years of <span className="text-purple-400 font-medium">development expertise</span>.
        </>
      )
    }
  ]

  const topFounder = founders[0]
  const bottomFounders = founders.slice(1)

  const FounderCard = ({ founder, index, isVertical = false }: { founder: typeof founders[0], index: number, isVertical?: boolean }) => (
    <div
      className={`group relative cursor-pointer rounded-3xl p-6 md:p-10 transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        transitionDelay: `${index * 200}ms`
      }}
    >
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(147,51,234,0.4), rgba(79,70,229,0.3), rgba(147,51,234,0.4))',
          filter: 'blur(25px)',
        }}
      />
      <div
        className="absolute inset-0 rounded-3xl opacity-30 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(147,51,234,0.3), transparent, rgba(79,70,229,0.3))',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
      />

      <div className={`flex ${isVertical ? 'flex-col' : 'flex-col md:flex-row'} items-center gap-6 md:gap-10 relative z-10`}>
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 group/image">
          <div
            className="absolute -inset-3 rounded-full opacity-50 animate-pulse"
            style={{
              background: 'linear-gradient(135deg, rgba(147,51,234,0.4), rgba(79,70,229,0.4))',
              filter: 'blur(15px)',
            }}
          />
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
                sizes="160px"
                quality={75}
                unoptimized={true}
                className="object-cover object-top transition-transform duration-700 group-hover/image:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-purple-900/20 flex items-center justify-center">
                <span className="text-3xl font-bold text-purple-500/50">{founder.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        <div className={`text-center ${!isVertical ? 'md:text-left' : ''} transition-all duration-500 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">{founder.name}</span>
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">{founder.role}, The Code Lawyers</p>
          <p className="text-foreground leading-relaxed text-sm md:text-base text-balance">
            {founder.bio}
          </p>
          <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
            <div className="w-8 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-purple-500/50" />
            <div className="w-6 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 opacity-20">
        <div className="w-4 h-px bg-gradient-to-r from-purple-500 to-transparent" />
        <div className="w-px h-4 bg-gradient-to-b from-purple-500 to-transparent" />
      </div>
      <div className="absolute bottom-4 right-4 opacity-20">
        <div className="w-4 h-px bg-gradient-to-l from-purple-500 to-transparent ml-auto" />
        <div className="w-px h-4 bg-gradient-to-t from-purple-500 to-transparent ml-auto" />
      </div>
    </div>
  )

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
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

        <div className="flex flex-col items-center gap-6">
          <div className={`w-full transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <FounderCard founder={topFounder} index={0} />
          </div>

          <div className="w-px h-6 bg-gradient-to-b from-purple-500/50 to-purple-500/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {bottomFounders.map((founder, idx) => (
              <div
                key={founder.name}
                className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${(idx + 1) * 200}ms` }}
              >
                <FounderCard founder={founder} index={idx + 1} isVertical={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
