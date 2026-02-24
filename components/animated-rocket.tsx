"use client"

import { useEffect, useRef, useState } from "react"

export function AnimatedRocket() {
    const rocketRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        let rafId: number
        let currentY = 0
        let targetY = 0
        let running = true

        const getTargetY = () => {
            const scrollY = window.scrollY
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
            return progress * (window.innerHeight - 100)
        }

        // Continuous lerp loop — runs every frame for buttery smooth movement
        const animate = () => {
            if (!running) return
            targetY = getTargetY()
            // Ease toward target: 0.12 = smooth but responsive
            currentY += (targetY - currentY) * 0.18
            if (rocketRef.current) {
                rocketRef.current.style.transform = `translate3d(0, ${currentY}px, 0) rotate(180deg)`
            }
            rafId = requestAnimationFrame(animate)
        }

        // Seed initial position
        currentY = getTargetY()
        targetY = currentY
        rafId = requestAnimationFrame(animate)

        return () => {
            running = false
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [])

    const handleTouchStart = (e: React.TouchEvent) => {
        if (window.innerWidth >= 768) return // Desktop: non-interactive
        setIsDragging(true)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || window.innerWidth >= 768) return

        const touch = e.touches[0]
        const touchY = touch.clientY
        const viewportHeight = window.innerHeight
        const maxScroll = document.documentElement.scrollHeight - viewportHeight

        // Map touch position to scroll position
        const scrollPercentage = Math.max(0, Math.min(1, touchY / viewportHeight))
        const targetScroll = scrollPercentage * maxScroll

        window.scrollTo({ top: targetScroll, behavior: 'auto' })
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    return (
        <div
            ref={rocketRef}
            className={`fixed right-4 md:right-8 z-[100] origin-center md:pointer-events-none ${isDragging ? 'scale-90' : 'scale-75 md:scale-100'
                }`}
            style={{
                top: '80px', // Start below header
                willChange: 'transform',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="scrollbar"
            aria-label="Scroll indicator - drag to navigate on mobile"
        >
            <div className="relative">
                {/* Rocket SVG */}
                <svg width="40" height="80" viewBox="0 0 40 80">
                    {/* Rocket flame */}
                    <ellipse cx="20" cy="75" rx="6" ry="10" fill="url(#flameGradient)" className="animate-pulse" />
                    <ellipse cx="20" cy="73" rx="4" ry="6" fill="#fbbf24" />

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
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-12 rounded-full blur-sm"
                    style={{
                        background: "linear-gradient(to bottom, rgba(251,146,60,0.6), rgba(239,68,68,0.4), transparent)",
                    }}
                />
            </div>
        </div>
    )
}
