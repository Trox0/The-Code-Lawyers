"use client"

import { Bot, Phone, Workflow, Globe, Code, Video } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Services data configuration
const services = [
  {
    icon: Globe,
    title: "Websites & Applications",
    description: "Modern, fast, and conversion-focused websites and apps.",
    gradient: "from-blue-500/20 to-purple-500/20",
    steps: [
      { title: "Discovery", description: "We analyze your audience and business goals." },
      { title: "Design", description: "UI/UX wireframes and high-fidelity mockups." },
      { title: "Development", description: "Clean code using modern frameworks (Next.js, React)." },
      { title: "Launch", description: "Performance optimization, SEO setup, and deployment." },
    ]
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Scalable backend systems tailored to business needs.",
    gradient: "from-purple-500/20 to-pink-500/20",
    steps: [
      { title: "Analysis", description: "Deep dive into your workflow and requirements." },
      { title: "Architecture", description: "System design, database modeling, and stack selection." },
      { title: "Build", description: "Agile development with regular updates." },
      { title: "Scale", description: "Deployment on robust infrastructure with monitoring." },
    ]
  },
  {
    icon: Bot,
    title: "AI Website Chatbots",
    description: "Smart chatbots that engage visitors, answer questions, and convert leads 24/7.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    steps: [
      { title: "Strategy", description: "Identify key user intent and conversion triggers." },
      { title: "Training", description: "Feed the AI with your business knowledge base." },
      { title: "Integration", description: "Seamless embed into your existing website." },
      { title: "Refining", description: "Continuous improvement based on chat logs." },
    ]
  },
  {
    icon: Phone,
    title: "AI Voice Bots",
    description: "Automated call handling, follow-ups, and appointment workflows using AI voice systems.",
    gradient: "from-violet-500/20 to-purple-500/20",
    steps: [
      { title: "Flow Design", description: "Mapping out natural conversation scripts." },
      { title: "Voice Setup", description: "Selecting realistic voices and tone." },
      { title: "Backend Sync", description: "Connecting to your CRM and calendar." },
      { title: "Live Testing", description: "Simulating real calls to ensure reliability." },
    ]
  },
  {
    icon: Workflow,
    title: "AI Outreach & Automation",
    description: "AI-powered inbound and outbound workflows for lead qualification and follow-ups.",
    gradient: "from-indigo-500/20 to-cyan-500/20",
    steps: [
      { title: "Targeting", description: "Defining your ideal customer profile." },
      { title: "Sequence", description: "Crafting personalized multi-channel messages." },
      { title: "Automation", description: "Setting up triggers for replies and actions." },
      { title: "Reporting", description: "Tracking open rates and conversions." },
    ]
  },
  {
    icon: Video,
    title: "AI Video & Content Editing",
    description: "High-impact short-form content, AI-generated videos, and professional editing tailored for social growth.",
    gradient: "from-pink-500/20 to-violet-500/20",
    steps: [
      { title: "Concept", description: "Brainstorming viral-ready video ideas." },
      { title: "Production", description: "AI generation or professional editing." },
      { title: "Enhancement", description: "Adding captions, effects, and sound design." },
      { title: "Distribution", description: "Formatting for TikTok, Reels, and Shorts." },
    ]
  },
]

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Handle clicking outside to close active (clicked) cards
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If we clicked, activeIndex might be set. 
      // We only clear it if the click wasn't on a card (handled by stopPropagation in click handler)
      if (activeIndex !== null) {
        setActiveIndex(null)
      }
    }

    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [activeIndex])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    // Toggle active state. If clicking the same one, close it. If different, open that one.
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section
      id="services"
      className="py-24 md:py-32 relative"
      ref={sectionRef}
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemProp="numberOfItems" content="6" />
      <meta itemProp="name" content="The Code Lawyers Services" />

      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`mb-16 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">What We Do</p>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground max-w-3xl text-balance"
          >
            Our services span the full spectrum of <span className="text-purple-500">technology</span> and{" "}
            <span className="text-purple-500">AI solutions</span>.
          </h2>
          <p className="sr-only">
            The Code Lawyers offers comprehensive software engineering and AI solutions including web development,
            custom software, AI chatbots, AI voice bots, automation, and video content services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isFlipped = activeIndex === index || hoveredIndex === index

            return (
              <article
                key={`service-${index}`} // Updated key to force refresh
                className={`group cursor-pointer relative ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{
                  height: '400px', // Explicit height to prevent collapse
                  transitionDelay: `${index * 100}ms`,
                  perspective: '1000px' // Essential for 3D flip effect
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(e) => handleCardClick(e, index)}
              >
                {/* 3D Moving Container */}
                <div
                  className="relative w-full h-full transition-all duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >

                  {/* === FRONT FACE === */}
                  <div
                    className="absolute inset-0 p-8 rounded-xl h-full w-full"
                    style={{
                      backfaceVisibility: 'hidden', // Hides this face when flipped
                      WebkitBackfaceVisibility: 'hidden',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                    }}
                  >
                    {/* Gradient glow effect on hover provided by parent group hover, but since we are handling state manually, we can bind it to isFlipped or keeps existing group-hover behavior if meaningful. 
                         Since we flip away, the hover effects on the front face only matter before the flip starts. */}
                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.gradient}`}
                      style={{ filter: 'blur(20px)', zIndex: -1 }}
                    />

                    {/* Animated border gradient */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, rgba(147,51,234,0.3) 0%, rgba(79,70,229,0.3) 50%, rgba(147,51,234,0.3) 100%)',
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                      }}
                    />

                    <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 bg-purple-500/10 group-hover:bg-purple-500/20 transition-all duration-300">
                      <service.icon className="h-7 w-7 text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-300" />
                      <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                      {service.description}
                    </p>

                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(147,51,234,0.5), transparent)',
                      }}
                    />
                  </div>

                  {/* === BACK FACE (PROCESS STEPS) === */}
                  <div
                    className="absolute inset-0 p-6 rounded-xl h-full w-full bg-black/95 border border-purple-500/30 flex flex-col justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)', // Originally rotated so it faces 'away', comes to front when container flips
                    }}
                  >
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-4 text-center">
                      Our Process
                    </p>
                    <div className="space-y-4">
                      {service.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="flex gap-3 items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center text-[10px] font-bold text-purple-400 border border-purple-500/20 mt-0.5">
                            {stepIdx + 1}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white leading-none mb-1">
                              {step.title}
                            </h4>
                            <p className="text-[11px] text-muted-foreground leading-snug">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

