"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function ServiceMockups({ forceHover }: { forceHover?: boolean }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        console.log('[ServiceMockups] Component mounted!')
    }, [])

    return (
        <>
            {/* Website Mockup - Left */}
            <div
                className={`absolute left-[2%] top-[15%] z-20 transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                    }`}
                aria-hidden="true"
            >
                <div className={`relative w-[220px] md:w-[280px] lg:w-[350px] xl:w-[420px] transition-all duration-500 ${forceHover
                    ? "transform rotate-[-5deg] scale-105"
                    : "transform rotate-[-8deg] hover:rotate-[-5deg] hover:scale-105"
                    }`}>
                    <div className="rounded-lg shadow-[0_20px_60px_rgba(139,92,246,0.4)] bg-gradient-to-br from-purple-900/20 to-purple-600/20 p-1">
                        {/* Browser Chrome */}
                        <div className="bg-slate-800 rounded-t-lg px-3 py-2 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="flex-1 ml-2 bg-slate-700 rounded px-3 py-1 text-xs text-slate-400">
                                https://example.com
                            </div>
                        </div>
                        {/* Website Preview */}
                        <div className="bg-slate-900 rounded-b-lg p-6 min-h-[300px] relative">
                            <div className="space-y-4">
                                <div className="h-8 bg-gradient-to-r from-purple-600 to-purple-400 rounded w-3/4" />
                                <div className="h-4 bg-slate-700 rounded w-full" />
                                <div className="h-4 bg-slate-700 rounded w-5/6" />
                                <div className="grid grid-cols-3 gap-3 mt-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-24 bg-gradient-to-br from-purple-600/30 to-purple-900/30 rounded border border-purple-500/30" />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Mockup - Right */}
            <div
                className={`absolute right-[4%] top-[15%] z-20 transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
                    }`}
                aria-hidden="true"
            >
                <div className={`relative w-[140px] md:w-[160px] lg:w-[180px] xl:w-[220px] transition-all duration-500 ${forceHover
                        ? "transform rotate-[6deg] scale-105"
                        : "transform rotate-[10deg] hover:rotate-[6deg] hover:scale-105"
                    }`}>
                    {/* Phone Frame */}
                    <div className="relative bg-slate-900 rounded-[2.5rem] p-3 shadow-[0_20px_60px_rgba(139,92,246,0.5)]">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-10" />

                        {/* Screen */}
                        <div className="relative bg-gradient-to-b from-slate-950 to-slate-900 rounded-[2rem] overflow-hidden aspect-[9/19]">
                            {/* App UI */}
                            <div className="p-4 space-y-4">
                                {/* Status Bar */}
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>9:41</span>
                                    <div className="flex gap-1">
                                        <div className="w-4 h-3 border border-slate-400 rounded-sm" />
                                    </div>
                                </div>

                                {/* Header */}
                                <div className="pt-4">
                                    <div className="h-6 bg-gradient-to-r from-purple-600 to-purple-400 rounded w-2/3" />
                                    <div className="h-3 bg-slate-700 rounded w-1/2 mt-2" />
                                </div>

                                {/* Content Cards */}
                                <div className="space-y-3 pt-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="bg-gradient-to-br from-purple-900/30 to-purple-600/20 rounded-xl p-3 border border-purple-500/30">
                                            <div className="h-3 bg-slate-700 rounded w-3/4 mb-2" />
                                            <div className="h-2 bg-slate-800 rounded w-full" />
                                            <div className="h-2 bg-slate-800 rounded w-4/5 mt-1" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Automation Dashboard - Background */}
            <div
                className={`absolute inset-0 z-5 flex items-center justify-center transition-opacity duration-1500 ${mounted ? "opacity-20" : "opacity-0"
                    }`}
                aria-hidden="true"
            >
                <div className="relative w-[85%] max-w-5xl">
                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-3 gap-4 p-6 blur-sm">
                        {/* Graph/Chart Panels */}
                        <div className="col-span-2 bg-gradient-to-br from-purple-900/40 to-purple-600/20 rounded-xl p-6 border border-purple-500/20">
                            <div className="h-40 relative">
                                {/* Simulated line graph */}
                                <svg className="w-full h-full" viewBox="0 0 300 100">
                                    <path
                                        d="M 0 80 L 50 60 L 100 70 L 150 40 L 200 50 L 250 30 L 300 20"
                                        stroke="url(#grad)"
                                        strokeWidth="3"
                                        fill="none"
                                    />
                                    <defs>
                                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-gradient-to-br from-purple-900/30 to-purple-600/20 rounded-lg p-4 border border-purple-500/20">
                                    <div className="h-8 bg-purple-500/40 rounded w-16" />
                                    <div className="h-3 bg-slate-700/50 rounded w-full mt-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
