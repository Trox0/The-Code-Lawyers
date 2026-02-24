"use client"

import { ReactLenis, useLenis } from "lenis/react"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

function ScrollToTop() {
    const pathname = usePathname()
    const lenis = useLenis()

    useEffect(() => {
        // Reset scroll to top when route changes
        if (lenis) {
            lenis.scrollTo(0, { immediate: true })
        } else {
            window.scrollTo(0, 0)
        }
    }, [pathname, lenis])

    return null
}

function MobileScrollToTop() {
    const pathname = usePathname()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

export function SmoothScrolling({ children }: { children: ReactNode }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])

    // On mobile, skip Lenis — native touch scroll is smoother and more performant
    if (isMobile) {
        return (
            <>
                <MobileScrollToTop />
                {children}
            </>
        )
    }

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, wheelMultiplier: 1 }}>
            <ScrollToTop />
            {children}
        </ReactLenis>
    )
}
