"use client"

import { useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"

export function SmoothScrolling({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  useEffect(() => {
    // Native wheel/touch scrolling and a stable tree across breakpoints.
    // Swapping wrappers would destroy and reload WebGL on phones.
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return <>{children}</>
}
