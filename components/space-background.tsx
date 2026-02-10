"use client"

import { useEffect, useState } from "react"

export function SpaceBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [maxScroll, setMaxScroll] = useState(1)

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


    </>
  )
}
