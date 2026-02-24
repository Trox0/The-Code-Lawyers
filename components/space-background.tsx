"use client"

import { useEffect, useRef } from "react"

export function SpaceBackground() {
  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    let ticking = false

    const updateParallax = () => {
      const scrollY = window.scrollY
      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translate3d(0, ${scrollY * 0.05}px, 0)`
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translate3d(0, ${scrollY * 0.1}px, 0)`
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translate3d(0, ${scrollY * 0.02}px, 0)`
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        rafId = requestAnimationFrame(updateParallax)
      }
    }

    // Seed initial position
    updateParallax()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Fixed starfield background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Distant stars layer */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, white, transparent),
                              radial-gradient(1px 1px at 40px 70px, white, transparent),
                              radial-gradient(1px 1px at 50px 160px, white, transparent),
                              radial-gradient(1px 1px at 90px 40px, white, transparent),
                              radial-gradient(1px 1px at 130px 80px, white, transparent),
                              radial-gradient(1.5px 1.5px at 160px 120px, white, transparent),
                              radial-gradient(1px 1px at 200px 50px, white, transparent),
                              radial-gradient(1px 1px at 250px 180px, white, transparent),
                              radial-gradient(1.5px 1.5px at 280px 90px, white, transparent),
                              radial-gradient(1px 1px at 320px 140px, white, transparent)`,
            backgroundSize: "350px 350px",
            willChange: "transform",
          }}
        />
        {/* Mid-range stars */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(1.5px 1.5px at 100px 50px, rgba(167,139,250,0.8), transparent),
                              radial-gradient(1px 1px at 200px 150px, white, transparent),
                              radial-gradient(2px 2px at 300px 100px, rgba(167,139,250,0.6), transparent),
                              radial-gradient(1px 1px at 400px 200px, white, transparent),
                              radial-gradient(1.5px 1.5px at 150px 250px, white, transparent)`,
            backgroundSize: "500px 400px",
            willChange: "transform",
          }}
        />
        {/* Nebula glow */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(ellipse 600px 400px at 20% 30%, rgba(147,51,234,0.3), transparent),
                         radial-gradient(ellipse 500px 300px at 80% 70%, rgba(139,92,246,0.2), transparent)`,
            willChange: "transform",
          }}
        />
      </div>
    </>
  )
}
