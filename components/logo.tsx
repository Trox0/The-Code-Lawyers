"use client"

import { motion } from "framer-motion"

interface LogoProps {
    className?: string
    size?: number
}

export function Logo({ className = "", size = 48 }: LogoProps) {
    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Hexagon Background */}
                <motion.path
                    d="M50 5L89.1747 27.5V72.5L50 95L10.8253 72.5V27.5L50 5Z"
                    fill="currentColor"
                    fillOpacity="0.1"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Decorative Inner Hexagon */}
                <motion.path
                    d="M50 15L80.5 32.5V67.5L50 85L19.5 67.5V32.5L50 15Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* CL Initials */}
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="central"
                    textAnchor="middle"
                    fill="currentColor"
                    fontWeight="bold"
                    fontSize="28"
                    style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
                >
                    CL
                </text>

                {/* Subtle Glow (handled via CSS/Tailwind usually, but added as filter here) */}
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>
        </motion.div>
    )
}
