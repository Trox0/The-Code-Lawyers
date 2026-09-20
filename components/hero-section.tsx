"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUpRight, Pause, Play, Sparkles } from "lucide-react"
import type { LampSceneController } from "@/lib/lamp-scene"

const tools = ["n8n", "ChatGPT", "Claude", "Gemini", "Zapier", "Make", "LangChain", "OpenClaw", "Hermes"]
const clamp = (value: number) => Math.max(0, Math.min(1, value))
const ease = (start: number, end: number, value: number) => {
  const p = clamp((value - start) / (end - start))
  return p * p * (3 - 2 * p)
}

export function HeroSection() {
  const runwayRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLProgressElement>(null)
  const percentageRef = useRef<HTMLSpanElement>(null)
  const controllerRef = useRef<LampSceneController | null>(null)
  const pausedRef = useRef(false)
  const [paused, setPaused] = useState(false)
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading")

  useEffect(() => {
    const abort = new AbortController()
    const root = document.documentElement
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const container = sceneRef.current!
    let disposed = false
    let finished = false
    let failed = false
    let frame = 0
    let revealTimer: ReturnType<typeof setTimeout> | undefined
    const start = performance.now()
    let previous = start
    let progress = 0
    let milestone = 0
    pausedRef.current = media.matches
    setPaused(media.matches)
    root.classList.toggle("lamp-motion-paused", media.matches)
    root.classList.add("lamp-loading")
    const blocked = Array.from(container.closest("main")?.children ?? [])
      .filter((element): element is HTMLElement => element instanceof HTMLElement && !element.classList.contains("lamp-loader"))
      .map(element => ({ element, inert: element.inert }))
    blocked.forEach(({ element }) => { element.inert = true })
    const unblock = () => blocked.forEach(({ element, inert }) => { element.inert = inert })

    // Asset milestones accelerate the estimate; time-based drift keeps it alive.
    // Never display 100 while the completed first frame is still pending.
    const animateProgress = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.15)
      previous = now
      const rate = progress < 65 ? 0.10 : progress < 90 ? 0.04 : 0.012
      progress = Math.min(99.999, progress + (100 - progress) * rate * dt)
      progress += Math.max(0, milestone - progress) * Math.min(1, dt * 2)
      if (progressRef.current) progressRef.current.value = progress
      if (percentageRef.current) percentageRef.current.textContent = String(Math.min(99, Math.floor(progress)))
      if (!disposed && !finished) frame = requestAnimationFrame(animateProgress)
    }
    frame = requestAnimationFrame(animateProgress)
    const finish = (next: "ready" | "fallback") => {
      if (disposed) return
      finished = true
      clearTimeout(deadline)
      clearTimeout(revealTimer)
      revealTimer = setTimeout(() => {
        if (disposed) return
        cancelAnimationFrame(frame)
        setStatus(next)
        root.classList.remove("lamp-loading")
        unblock()
        window.dispatchEvent(new Event("lamp-motion-change"))
      }, Math.max(0, 900 - (performance.now() - start)))
    }
    // Individual asset requests retry before the final branded fallback.
    const deadline = setTimeout(() => {
      failed = true
      abort.abort()
      controllerRef.current?.dispose()
      controllerRef.current = null
      finish("fallback")
    }, 90_000)

    void import("@/lib/lamp-scene").then(({ initLampScene }) => initLampScene(container, {
      signal: abort.signal,
      paused: pausedRef.current,
      onProgress: value => { milestone = Math.max(milestone, Math.min(94, value * 94)) },
      onError: () => {
        if (disposed) return
        failed = true
        controllerRef.current?.dispose()
        controllerRef.current = null
        finish("fallback")
      },
    })).then(controller => {
      if (disposed || abort.signal.aborted || failed) { controller.dispose(); return }
      controllerRef.current = controller
      controller.setPaused(pausedRef.current)
      finish("ready")
    }).catch(() => {
      if (!disposed) finish("fallback")
    })

    const onPreference = () => {
      pausedRef.current = media.matches
      setPaused(media.matches)
      controllerRef.current?.setPaused(media.matches)
      root.classList.toggle("lamp-motion-paused", media.matches)
      window.dispatchEvent(new Event("lamp-motion-change"))
    }
    media.addEventListener("change", onPreference)
    return () => {
      disposed = true
      abort.abort()
      cancelAnimationFrame(frame)
      clearTimeout(deadline)
      clearTimeout(revealTimer)
      media.removeEventListener("change", onPreference)
      controllerRef.current?.dispose()
      controllerRef.current = null
      root.classList.remove("lamp-loading", "lamp-motion-paused")
      unblock()
    }
  }, [])

  useEffect(() => {
    const runway = runwayRef.current!
    const hero = heroRef.current!
    const art = artRef.current!
    const copy = copyRef.current!
    const header = document.querySelector<HTMLElement>(".lamp-site-header")
    const reduced = matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    const update = () => {
      frame = 0
      const disabled = pausedRef.current || reduced.matches
      const span = runway.offsetHeight - hero.offsetHeight
      const progress = span > 0 ? -runway.getBoundingClientRect().top / span : 0
      const zoom = disabled ? 0 : ease(.04, .76, progress)
      const fade = disabled ? 0 : ease(.88, 1.42, progress)
      const headerHeight = (header?.querySelector("nav")?.offsetHeight ?? 48) + 32
      hero.style.setProperty("--lamp-header-height", `${headerHeight}px`)
      controllerRef.current?.setScrollProgress(zoom)
      if (matchMedia("(min-width: 1024px)").matches) art.style.removeProperty("top")
      else {
        const compact = innerHeight <= 650 && innerWidth > 600
        art.style.top = `${(headerHeight + (compact ? 0 : 50)) * (1 - (disabled ? 0 : ease(0, .3, progress)))}px`
      }
      art.style.opacity = String(1 - fade)
      art.style.transform = `scale(${1 + zoom * .12})`
      art.style.filter = `brightness(${1 + zoom * .3})`
      copy.style.opacity = String(disabled ? 1 : 1 - ease(.02, .29, progress))
      copy.style.transform = `translateY(${disabled ? 0 : -ease(.02, .29, progress) * 35}px)`
      copy.inert = !disabled && progress >= .29
      const approach = document.querySelector<HTMLElement>("#lamp-approach")
      if (approach) {
        const entrance = clamp((innerHeight - approach.getBoundingClientRect().top) / (innerHeight * .65))
        approach.style.setProperty("--lamp-entrance", String(disabled ? 1 : entrance))
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    observer.observe(runway)
    if (header) observer.observe(header)
    addEventListener("scroll", schedule, { passive: true })
    addEventListener("resize", schedule)
    addEventListener("lamp-motion-change", schedule)
    reduced.addEventListener("change", schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      removeEventListener("scroll", schedule)
      removeEventListener("resize", schedule)
      removeEventListener("lamp-motion-change", schedule)
      reduced.removeEventListener("change", schedule)
    }
  }, [])

  const toggleMotion = () => {
    const next = !pausedRef.current
    pausedRef.current = next
    setPaused(next)
    controllerRef.current?.setPaused(next)
    document.documentElement.classList.toggle("lamp-motion-paused", next)
    window.dispatchEvent(new Event("lamp-motion-change"))
  }

  return <>
    <div className="lamp-loader" data-loading={status === "loading"} aria-hidden={status !== "loading"}>
      <div className="lamp-loader-inner">
        <span className="lamp-kicker">The Code Lawyers</span>
        <div className="lamp-loader-orbit" aria-hidden="true"><i /><i /><i /><span>L</span></div>
        <h2>Bringing <em>Lamp</em> to life.</h2>
        <p role="status">Preparing your interactive experience</p>
        <div className="lamp-progress-line"><span>Loading Lamp</span><span><span ref={percentageRef}>0</span>%</span></div>
        <progress ref={progressRef} max="100" value="0" aria-label="Estimated loading progress" />
      </div>
    </div>
    <noscript><style>{`.lamp-loader{display:none!important}.lamp-runway{height:auto!important}.lamp-hero{position:relative!important}.lamp-fallback{opacity:1!important}html,body{overflow-y:auto!important}`}</style></noscript>
    <div ref={runwayRef} className="lamp-runway" data-lamp-status={status}>
      <section ref={heroRef} className="lamp-hero" aria-label="Introducing Lamp">
        <div className="lamp-coordinates" aria-hidden="true">Human ambition.<br />Intelligent execution.</div>
        <div className="lamp-portrait-controls">
          <button type="button" onClick={() => controllerRef.current?.pulse()} disabled={status !== "ready"} aria-label="Send a wave through Lamp"><Sparkles size={14} /> A spark of possibility</button>
          <button type="button" onClick={toggleMotion} aria-pressed={paused}>{paused ? "Resume motion" : "Pause motion"}{paused ? <Play size={12} /> : <Pause size={12} />}</button>
        </div>
        <div ref={artRef} className="lamp-particle-stage" aria-hidden="true">
          <div className="lamp-fallback" data-visible={status === "fallback"}>
            <div className="lamp-fallback-mark"><span>L</span></div>
            <div className="lamp-fallback-tools">{tools.map(tool => <span key={tool}>{tool}</span>)}</div>
          </div>
          <div ref={sceneRef} className="lamp-sculpture" />
        </div>
        <div ref={copyRef} className="lamp-intro-content">
          <p className="lamp-kicker">AI. Automation. Software that moves you forward.</p>
          <div className="lamp-intro-row">
            <h1>Introducing <em>Lamp.</em></h1>
            <a className="lamp-white-button" href="#contact">Let’s build <ArrowUpRight size={22} /></a>
          </div>
          <div className="lamp-intro-bottom"><p>Your next bright idea. Built to work.</p><a href="#lamp-approach">Discover the possibilities <ArrowDown size={16} /></a></div>
        </div>
        <p className="sr-only">Lamp is The Code Lawyers’ interactive character. We build websites, AI agents, custom software and workflow automations. Explore tools including {tools.join(", ")}. Move your pointer or touch the portrait to look around.</p>
      </section>
    </div>
  </>
}
