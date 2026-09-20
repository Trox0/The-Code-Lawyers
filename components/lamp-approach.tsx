"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import "./lamp-approach.css"

const areas = [
  {
    name: "AI that understands.",
    label: "AI agents",
    headline: "Your knowledge. A new way to use it.",
    description: "AI chatbots and voice agents connected to your documents, tools, and business workflows. Built around the questions your customers and team actually ask.",
    details: ["Knowledge retrieval", "Conversational interfaces", "Tool integrations"],
  },
  {
    name: "Work that flows.",
    label: "Automation",
    headline: "Connect the work between your tools.",
    description: "Workflow automation connects the systems you already use. We build integrations for handoffs, data synchronisation, and repeatable processes, with visibility into what happens next.",
    details: ["Connected applications", "Workflow orchestration", "Data synchronisation"],
  },
  {
    name: "Software that fits.",
    label: "Engineering",
    headline: "Built around the way your business works.",
    description: "Custom websites, applications, APIs, and internal tools. We turn your requirements into a maintainable codebase your team can use, inspect, and build on.",
    details: ["Web applications", "APIs & backend systems", "Internal tools"],
  },
] as const

type Particle = { x: number; y: number; z: number; size: number }

// A procedural point cloud keeps this section independent of the portrait download.
function createKnot(): Particle[] {
  const points: Particle[] = []
  const centre = (t: number) => ({
    x: (1 + 0.37 * Math.cos(3 * t)) * Math.cos(2 * t),
    y: (1 + 0.37 * Math.cos(3 * t)) * Math.sin(2 * t),
    z: 0.56 * Math.sin(3 * t),
  })
  for (let i = 0; i < 180; i++) {
    const t = (i / 180) * Math.PI * 2
    const c = centre(t)
    const next = centre(t + 0.001)
    const tangent = { x: next.x - c.x, y: next.y - c.y, z: next.z - c.z }
    const length = Math.hypot(tangent.x, tangent.y, tangent.z)
    tangent.x /= length; tangent.y /= length; tangent.z /= length
    const normalLength = Math.hypot(tangent.x, tangent.y)
    const normal = { x: -tangent.y / normalLength, y: tangent.x / normalLength, z: 0 }
    const binormal = {
      x: -tangent.z * normal.y,
      y: tangent.z * normal.x,
      z: tangent.x * normal.y - tangent.y * normal.x,
    }
    for (let j = 0; j < 12; j++) {
      const a = (j / 12) * Math.PI * 2 + t * 0.12
      const radius = 0.16 + 0.035 * Math.sin(t * 11 + j * 3.1)
      points.push({
        x: c.x + radius * (Math.cos(a) * normal.x + Math.sin(a) * binormal.x),
        y: c.y + radius * (Math.cos(a) * normal.y + Math.sin(a) * binormal.y),
        z: c.z + radius * Math.sin(a) * binormal.z,
        size: 0.6 + ((i * 7 + j * 11) % 9) * 0.085,
      })
    }
  }
  return points
}

function ParticleSystem({ active }: { active: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeRef = useRef(active)
  const renderRef = useRef<(() => void) | null>(null)
  useEffect(() => { activeRef.current = active; renderRef.current?.() }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d", { alpha: true })
    if (!context) return
    const container = canvas.parentElement!
    const points = createKnot()
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    let width = 0, height = 0, frame = 0, last = 0, time = 0
    let visible = false, paused = true, targetX = 0, targetY = 0, tiltX = 0, tiltY = 0
    let currentMode = activeRef.current

    const render = () => {
      context.clearRect(0, 0, width, height)
      tiltX += (targetX - tiltX) * 0.065
      tiltY += (targetY - tiltY) * 0.065
      currentMode += (activeRef.current - currentMode) * 0.045
      const angleX = 0.55 + tiltY * 0.35 + currentMode * 0.1
      const angleY = time * 0.12 + tiltX * 0.45
      const angleZ = -0.38 + Math.sin(time * 0.15) * 0.1
      const scale = Math.min(width, height) * 0.285
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX)
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY)
      const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ)
      const project = (x: number, y: number, z: number) => {
        const y1 = y * cosX - z * sinX, z1 = y * sinX + z * cosX
        const x2 = x * cosY + z1 * sinY, z2 = -x * sinY + z1 * cosY
        const perspective = 4.8 / (4.8 - z2)
        return {
          x: width / 2 + (x2 * cosZ - y1 * sinZ) * scale * perspective,
          y: height / 2 + (x2 * sinZ + y1 * cosZ) * scale * perspective,
          z: z2,
          perspective,
        }
      }

      for (let orbit = 0; orbit < 3; orbit++) {
        context.beginPath()
        for (let i = 0; i <= 100; i++) {
          const t = (i / 100) * Math.PI * 2
          const p = project(Math.cos(t) * 1.75, Math.sin(t) * (0.6 + orbit * 0.2), Math.sin(t) * (1.2 - orbit * 0.8))
          if (i === 0) context.moveTo(p.x, p.y)
          else context.lineTo(p.x, p.y)
        }
        context.strokeStyle = orbit === activeRef.current ? "rgba(186,169,255,.28)" : "rgba(168,162,191,.1)"
        context.lineWidth = 0.75
        context.stroke()
        const t = time * 0.2 + orbit * 2.09
        const p = project(Math.cos(t) * 1.75, Math.sin(t) * (0.6 + orbit * 0.2), Math.sin(t) * (1.2 - orbit * 0.8))
        context.beginPath(); context.arc(p.x, p.y, orbit === activeRef.current ? 3 : 1.8, 0, Math.PI * 2)
        context.fillStyle = "#d8ceff"; context.fill()
      }

      const projected = points.map(point => ({ ...project(point.x, point.y, point.z), size: point.size }))
      projected.sort((a, b) => a.z - b.z)
      for (const p of projected) {
        const alpha = Math.min(0.95, Math.max(0.15, 0.5 + p.z * 0.3))
        context.fillStyle = `rgba(${179 + Math.round(alpha * 56)},${166 + Math.round(alpha * 64)},255,${alpha})`
        context.beginPath()
        context.arc(p.x, p.y, p.size * p.perspective, 0, Math.PI * 2)
        context.fill()
      }
    }
    renderRef.current = render
    const animate = (now: number) => {
      frame = 0
      if (!visible || paused || document.hidden) { last = 0; return }
      if (!last || now - last >= 32) {
        if (last) time += Math.min((now - last) / 1000, 0.06)
        last = now
        render()
      }
      frame = requestAnimationFrame(animate)
    }
    const start = () => {
      if (!frame && visible && !paused && !document.hidden) frame = requestAnimationFrame(animate)
    }
    const updateMotion = () => {
      paused = media.matches || document.documentElement.classList.contains("lamp-motion-paused")
      if (paused) { cancelAnimationFrame(frame); frame = 0; last = 0; targetX = targetY = 0; render() }
      else start()
    }
    const resize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width; height = rect.height
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      render()
    }
    const pointer = (event: PointerEvent) => {
      if (paused) return
      const rect = container.getBoundingClientRect()
      targetX = (event.clientX - rect.left) / rect.width - 0.5
      targetY = (event.clientY - rect.top) / rect.height - 0.5
    }
    const resetPointer = () => { targetX = targetY = 0 }
    const viewportObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else { cancelAnimationFrame(frame); frame = 0; last = 0 }
    }, { rootMargin: "80px" })
    const resizeObserver = new ResizeObserver(resize)
    const motionObserver = new MutationObserver(updateMotion)
    motionObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    viewportObserver.observe(container); resizeObserver.observe(container)
    container.addEventListener("pointermove", pointer)
    container.addEventListener("pointerleave", resetPointer)
    document.addEventListener("visibilitychange", start)
    media.addEventListener("change", updateMotion)
    resize(); updateMotion()
    return () => {
      renderRef.current = null
      cancelAnimationFrame(frame)
      viewportObserver.disconnect(); resizeObserver.disconnect(); motionObserver.disconnect()
      container.removeEventListener("pointermove", pointer)
      container.removeEventListener("pointerleave", resetPointer)
      document.removeEventListener("visibilitychange", start)
      media.removeEventListener("change", updateMotion)
    }
  }, [])

  return <canvas ref={canvasRef} className="lamp-system-canvas" aria-hidden="true" />
}

export function LampApproach() {
  const [active, setActive] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % areas.length
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + areas.length - 1) % areas.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = areas.length - 1
    else return
    event.preventDefault(); setActive(next); buttons.current[next]?.focus()
  }

  return (
    <section id="lamp-approach" className="lamp-approach" aria-labelledby="lamp-approach-title">
      <div className="lamp-approach-inner">
        <div className="lamp-approach-intro">
          <p className="lamp-approach-eyebrow"><span /> Intelligence, put to work.</p>
          <h2 id="lamp-approach-title">A brighter idea.<br /><em>A connected business.</em></h2>
          <p className="lamp-approach-summary">AI, automation, and software engineering.<br className="lamp-desktop-break" /> Connected by The Code Lawyers.</p>
        </div>

        <div className="lamp-approach-grid">
          <div className="lamp-system-visual" aria-hidden="true">
            <div className="lamp-system-glow" />
            <ParticleSystem active={active} />
            <span className={`lamp-system-label lamp-system-label-ai ${active === 0 ? "is-active" : ""}`}>Intelligence</span>
            <span className={`lamp-system-label lamp-system-label-flow ${active === 1 ? "is-active" : ""}`}>Connection</span>
            <span className={`lamp-system-label lamp-system-label-code ${active === 2 ? "is-active" : ""}`}>Engineering</span>
            <span className="lamp-system-caption">One connected system <span>↗</span></span>
          </div>

          <div className="lamp-approach-explorer">
            <div className="lamp-approach-tabs" role="tablist" aria-orientation="vertical" aria-label="Explore what we build">
              {areas.map((area, index) => (
                <button
                  key={area.label}
                  ref={element => { buttons.current[index] = element }}
                  id={`lamp-area-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls={`lamp-area-panel-${index}`}
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={event => onTabKey(event, index)}
                >
                  <span className="lamp-tab-number">0{index + 1}</span>
                  <span>{area.name}</span>
                  <ArrowDownRight size={19} aria-hidden="true" />
                </button>
              ))}
            </div>
            {areas.map((area, index) => (
              <div
                key={area.label}
                id={`lamp-area-panel-${index}`}
                className="lamp-approach-panel"
                role="tabpanel"
                aria-labelledby={`lamp-area-tab-${index}`}
                hidden={active !== index}
                tabIndex={0}
              >
                <p className="lamp-panel-label">{area.label}</p>
                <h3>{area.headline}</h3>
                <p className="lamp-panel-description">{area.description}</p>
                <ul>{area.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
              </div>
            ))}
            <div className="lamp-approach-actions">
              <a href="#contact">Let’s build something <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href="#services" className="lamp-approach-secondary">Explore our services <ArrowDownRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
