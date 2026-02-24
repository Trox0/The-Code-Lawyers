"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  // New properties for automatic continuous motion
  driftAngle: number
  driftSpeed: number
  driftPhase: number
  twinkleSpeed: number
  baseOpacity: number
}

export function SandParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 }) // Start offscreen so no initial push
  const animationRef = useRef<number>(undefined)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      // Fewer particles on mobile for better performance
      const isMobile = window.innerWidth < 768
      const divisor = isMobile ? 6000 : 3000
      const particleCount = Math.floor((canvas.width * canvas.height) / divisor)
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const baseOpacity = Math.random() * 0.5 + 0.15
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: baseOpacity,
          // Automatic drift properties - each particle has unique motion
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.008 + 0.003, // Very slow drift
          driftPhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          baseOpacity: baseOpacity,
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      // Pause rendering when tab is hidden to save resources
      if (document.hidden) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Increment time for continuous motion
      timeRef.current += 1

      const particles = particlesRef.current
      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y
      const time = timeRef.current
      const cw = canvas.width
      const ch = canvas.height

      for (let i = 0, len = particles.length; i < len; i++) {
        const particle = particles[i]

        // Automatic continuous drift motion (slow orbital/wave motion)
        const driftX = Math.sin(time * particle.driftSpeed + particle.driftPhase) * 0.4
        const driftY = Math.cos(time * particle.driftSpeed * 0.7 + particle.driftPhase) * 0.3

        // Calculate distance from mouse
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distSq = dx * dx + dy * dy
        const maxDistance = 150
        const maxDistSq = maxDistance * maxDistance

        // Parallax push effect from mouse (use squared distance to avoid sqrt)
        if (distSq < maxDistSq) {
          const distance = Math.sqrt(distSq)
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          particle.x -= Math.cos(angle) * force * 3
          particle.y -= Math.sin(angle) * force * 3
        }

        // Apply automatic drift motion
        particle.x += driftX
        particle.y += driftY

        // Gentle floating motion with original speed
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Slowly return to base position (slower return for more floaty effect)
        particle.x += (particle.baseX - particle.x) * 0.005
        particle.y += (particle.baseY - particle.y) * 0.005

        // Subtle twinkle effect
        particle.opacity = particle.baseOpacity + Math.sin(time * particle.twinkleSpeed) * 0.15

        // Wrap around edges
        if (particle.x < 0) particle.x = cw
        if (particle.x > cw) particle.x = 0
        if (particle.y < 0) particle.y = ch
        if (particle.y > ch) particle.y = 0

        // Draw particle with subtle glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Add subtle purple tint to some particles
        const isPurple = particle.driftPhase > Math.PI * 1.5
        if (isPurple) {
          ctx.fillStyle = `rgba(167, 139, 250, ${particle.opacity * 0.8})`
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        }
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}
