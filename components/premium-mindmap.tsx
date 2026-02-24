"use client"

import { useEffect, useRef, useState } from "react"
import { MindMapNode } from "@/lib/services-data"

interface PremiumMindMapProps {
  root: MindMapNode
}

interface MindMapCategoryProps {
  title: string
  items: string[]
  gradient: string
  index: number
}

function MindMapCategory({ title, items, gradient, index }: MindMapCategoryProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`relative flex flex-col transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${200 + index * 150}ms` }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background: `linear-gradient(to bottom, transparent, ${gradient.includes('purple') ? '#a855f7' : gradient.includes('cyan') ? '#06b6d4' : gradient.includes('blue') ? '#3b82f6' : gradient.includes('pink') ? '#ec4899' : '#8b5cf6'}, transparent)`,
        }}
      />
      <div
        className="ml-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(10px)',
          border: `1px solid rgba(255,255,255,0.1)`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        <h4
          className="text-sm font-semibold mb-3 pb-2 border-b border-white/10"
          style={{
            background: `linear-gradient(90deg, ${gradient.includes('purple') ? '#a855f7' : gradient.includes('cyan') ? '#06b6d4' : gradient.includes('blue') ? '#3b82f6' : gradient.includes('pink') ? '#ec4899' : '#8b5cf6'}, transparent)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </h4>
        <div className="flex flex-wrap gap-2">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full text-xs text-muted-foreground bg-white/5 border border-white/5 hover:border-purple-500/30 hover:text-purple-300 transition-all duration-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PulseRoot({ label }: { label: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
    >
      <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
      <div
        className="relative px-6 py-4 rounded-2xl text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(147,51,234,0.3) 0%, rgba(79,70,229,0.3) 100%)',
          border: '2px solid rgba(147,51,234,0.5)',
          boxShadow: '0 0 30px rgba(147,51,234,0.4), inset 0 0 20px rgba(147,51,234,0.1)',
        }}
      >
        <span className="text-foreground font-semibold text-lg">{label}</span>
      </div>
    </div>
  )
}

export function PremiumMindMap({ root }: PremiumMindMapProps) {
  const categories = root.children || []
  const categoryGradients = [
    "from-purple-500 to-pink-500",
    "from-cyan-500 to-blue-500",
    "from-violet-500 to-purple-500",
    "from-indigo-500 to-cyan-500",
  ]

  return (
    <div className="relative">
      <div className="absolute left-1/2 top-24 bottom-24 w-px -translate-x-1/2 bg-gradient-to-b from-purple-500/50 via-purple-500/30 to-transparent hidden lg:block" />
      
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-6">
        <div className="flex-shrink-0 lg:w-1/2 flex justify-center lg:justify-end lg:pr-8">
          <PulseRoot label={root.label} />
        </div>
        
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 lg:pl-8">
          {categories.map((category, idx) => (
            <MindMapCategory
              key={idx}
              title={category.label}
              items={category.children?.map(c => c.label) || []}
              gradient={categoryGradients[idx % categoryGradients.length]}
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
