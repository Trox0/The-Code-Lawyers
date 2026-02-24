"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

export function SmoothScrolling({ children }: { children: ReactNode }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])

    // On mobile, skip Lenis entirely — native scroll is smoother and more performant
    if (isMobile) {
        return <>{children}</>
    }

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, wheelMultiplier: 1 }}>
            {children}
        </ReactLenis>
    )
}
