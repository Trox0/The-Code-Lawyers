"use client"

import { useEffect, useState, useRef } from "react"

export function SpaceBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [maxScroll, setMaxScroll] = useState(1)
  const rocketRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setMaxScroll(document.documentElement.scrollHeight - window.innerHeight)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const scrollProgress = Math.min(scrollY / maxScroll, 1)
  const rocketY = scrollProgress * (typeof window !== "undefined" ? window.innerHeight - 120 : 600)

  return (
    <>
      {/* Fixed starfield background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Distant stars layer */}
        <div
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
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        />
        {/* Mid-range stars */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(1.5px 1.5px at 100px 50px, rgba(167,139,250,0.8), transparent),
                              radial-gradient(1px 1px at 200px 150px, white, transparent),
                              radial-gradient(2px 2px at 300px 100px, rgba(167,139,250,0.6), transparent),
                              radial-gradient(1px 1px at 400px 200px, white, transparent),
                              radial-gradient(1.5px 1.5px at 150px 250px, white, transparent)`,
            backgroundSize: "500px 400px",
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        {/* Nebula glow */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(ellipse 600px 400px at 20% 30%, rgba(147,51,234,0.3), transparent),
                         radial-gradient(ellipse 500px 300px at 80% 70%, rgba(139,92,246,0.2), transparent)`,
            transform: `translateY(${scrollY * 0.02}px)`,
          }}
        />
      </div>

      {/* Scrolling spaceship */}
      <div
        ref={rocketRef}
        className="fixed right-4 md:right-8 z-20 transition-transform duration-100 ease-out pointer-events-none scale-75 md:scale-100 origin-center"
        style={{
          top: `${Math.max(100, rocketY)}px`,
          transform: `rotate(${180 + scrollProgress * 0}deg)`,
        }}
      >
        <div className="relative">
          {/* Rocket body */}
          <svg width="40" height="80" viewBox="0 0 40 80" className="drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">
            {/* Rocket flame */}
            <ellipse cx="20" cy="75" rx="6" ry="10" fill="url(#flameGradient)" className="animate-pulse" />
            <ellipse cx="20" cy="73" rx="4" ry="6" fill="#fbbf24" className="animate-pulse" />

            {/* Rocket body */}
            <path
              d="M20 5 L30 25 L30 55 L25 60 L15 60 L10 55 L10 25 Z"
              fill="url(#bodyGradient)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.5"
            />

            {/* Rocket nose cone */}
            <path d="M20 0 L28 20 L12 20 Z" fill="url(#noseGradient)" />

            {/* Window */}
            <circle cx="20" cy="30" r="5" fill="#1e1b4b" stroke="rgba(167,139,250,0.6)" strokeWidth="1" />
            <circle cx="20" cy="30" r="3" fill="rgba(167,139,250,0.3)" />

            {/* Fins */}
            <path d="M10 50 L2 65 L10 60 Z" fill="url(#finGradient)" />
            <path d="M30 50 L38 65 L30 60 Z" fill="url(#finGradient)" />

            {/* Gradients */}
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e4e4e7" />
                <stop offset="50%" stopColor="#fafafa" />
                <stop offset="100%" stopColor="#a1a1aa" />
              </linearGradient>
              <linearGradient id="noseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#5b21b6" />
              </linearGradient>
              <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          {/* Engine glow */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-12 rounded-full blur-md animate-pulse"
            style={{
              background: "linear-gradient(to bottom, rgba(251,146,60,0.6), rgba(239,68,68,0.4), transparent)",
            }}
          />
        </div>
      </div>
    </>
  )
}
