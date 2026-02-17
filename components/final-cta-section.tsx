"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export function FinalCTASection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            50,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        )
        camera.position.set(0, 0, 400)
        camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        containerRef.current.appendChild(renderer.domElement)

        // Post-processing for bloom effect
        const composer = new EffectComposer(renderer)
        const renderPass = new RenderPass(scene, camera)
        composer.addPass(renderPass)

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(containerRef.current.clientWidth, containerRef.current.clientHeight),
            1.5, // strength
            0.4, // radius
            0.85 // threshold
        )
        composer.addPass(bloomPass)

        // Create face mesh geometry - UPRIGHT orientation
        const createFaceGeometry = () => {
            const particles = []
            const colors = []

            // Define face profile curve (UPRIGHT - X is horizontal, Y is vertical)
            const faceProfile = [
                // Back of head (left side when facing right)
                { y: 90, x: -40 },
                { y: 70, x: -48 },
                { y: 50, x: -50 },
                { y: 30, x: -48 },
                { y: 10, x: -45 },
                { y: -10, x: -42 },
                { y: -30, x: -38 },
                { y: -50, x: -32 },
                { y: -70, x: -25 },
                { y: -90, x: -18 },

                // Top of head
                { y: 100, x: -30 },
                { y: 105, x: -10 },
                { y: 108, x: 10 },

                // Forehead
                { y: 100, x: 20 },
                { y: 80, x: 35 },
                { y: 60, x: 42 },
                { y: 40, x: 48 },

                // Nose bridge to tip
                { y: 20, x: 52 },
                { y: 10, x: 58 },
                { y: 0, x: 65 },   // Nose tip
                { y: -5, x: 63 },
                { y: -10, x: 60 },

                // Upper lip
                { y: -15, x: 57 },
                { y: -20, x: 55 },

                // Lower lip
                { y: -25, x: 54 },
                { y: -30, x: 52 },

                // Chin
                { y: -40, x: 48 },
                { y: -50, x: 42 },
                { y: -60, x: 35 },

                // Jaw to neck
                { y: -70, x: 28 },
                { y: -80, x: 22 },
                { y: -90, x: 18 },
                { y: -100, x: 15 },
                { y: -110, x: 12 },
            ]

            // Create ULTRA dense mesh with uniform grid
            const depthLayers = 60
            const verticalResolution = 0.8 // Ultra tight spacing
            const horizontalResolution = 1.2

            // For each vertical position
            for (let y = 115; y >= -115; y -= verticalResolution) {
                // Find the profile X position at this Y
                let profileX = 0

                // Interpolate between profile points
                for (let i = 0; i < faceProfile.length - 1; i++) {
                    const p1 = faceProfile[i]
                    const p2 = faceProfile[i + 1]

                    if ((y <= p1.y && y >= p2.y) || (y >= p1.y && y <= p2.y)) {
                        const t = (y - p1.y) / (p2.y - p1.y)
                        profileX = p1.x + (p2.x - p1.x) * t
                        break
                    }
                }

                // Create particles across the width (Z-depth for 3D face)
                const faceWidth = 25

                for (let z = -faceWidth; z <= faceWidth; z += horizontalResolution) {
                    // Create depth layers (flowing backward/left)
                    for (let layer = 0; layer < depthLayers; layer++) {
                        const depthFactor = layer / depthLayers

                        // Exponential dispersion
                        const dispersePower = Math.pow(depthFactor, 1.8)

                        // Position
                        const baseX = profileX
                        const baseY = y
                        const baseZ = z

                        // Add 3D curvature (face is curved, not flat)
                        const curvature = Math.cos((z / faceWidth) * Math.PI * 0.5) * 5

                        // Disperse backward (negative X) with scatter
                        const disperseX = -dispersePower * 280
                        const disperseY = (Math.random() - 0.5) * dispersePower * 60
                        const disperseZ = (Math.random() - 0.5) * dispersePower * 60

                        const finalX = baseX + disperseX + curvature
                        const finalY = baseY + disperseY
                        const finalZ = baseZ + disperseZ

                        particles.push(finalX, finalY, finalZ)

                        // Purple/Pink gradient based on depth
                        let r, g, b
                        if (depthFactor < 0.15) {
                            // Face - bright white/light purple
                            r = 0.98
                            g = 0.95
                            b = 1.0
                        } else if (depthFactor < 0.4) {
                            // Transition - light purple
                            const t = (depthFactor - 0.15) / 0.25
                            r = 0.98 - t * 0.18
                            g = 0.95 - t * 0.65
                            b = 1.0 - t * 0.08
                        } else {
                            // Scattered - purple to pink
                            const t = (depthFactor - 0.4) / 0.6
                            r = 0.80 + t * 0.13
                            g = 0.30 - t * 0.10
                            b = 0.92 - t * 0.32
                        }

                        colors.push(r, g, b)
                    }
                }
            }

            // Add extra scattered particles
            for (let i = 0; i < 10000; i++) {
                const x = -Math.random() * 350 - 50
                const y = (Math.random() - 0.5) * 280
                const z = (Math.random() - 0.5) * 180

                particles.push(x, y, z)

                const brightness = Math.random() * 0.3
                colors.push(0.70 + brightness, 0.25 + brightness * 0.2, 0.92 - brightness * 0.2)
            }

            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(particles, 3))
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

            return geometry
        }

        // Create particle material
        const material = new THREE.PointsMaterial({
            size: 1.2,
            vertexColors: true,
            transparent: true,
            opacity: 1.0,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        })

        const particleSystem = new THREE.Points(createFaceGeometry(), material)
        const geometry = particleSystem.geometry
        particleSystem.position.x = -50
        scene.add(particleSystem)

        // Mouse interaction
        const mouse = new THREE.Vector2()

        const handleMouseMove = (event: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate)

            // Render with bloom
            composer.render()
        }

        animate()

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) return
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
            composer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            if (containerRef.current && renderer.domElement.parentNode) {
                containerRef.current.removeChild(renderer.domElement)
            }
            geometry.dispose()
            material.dispose()
            renderer.dispose()
            composer.dispose()
        }
    }, [])

    return (
        <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
            {/* Three.js container */}
            <div
                ref={containerRef}
                className="absolute inset-0 w-full h-full"
                style={{ width: '100%', height: '100%' }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - empty space for particle person */}
                <div className="hidden md:block" />

                {/* Right side - CTA content */}
                <div className={`text-right transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                    <p className="text-sm uppercase tracking-widest text-purple-400 mb-4">
                        READY TO TRANSFORM YOUR BUSINESS?
                    </p>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                        Request
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            a Call.
                        </span>
                    </h2>

                    <p className="text-lg text-gray-400 mb-8 max-w-md ml-auto">
                        Let's discuss how we can build the perfect solution for your business.
                    </p>

                    <Button
                        size="lg"
                        className="group bg-white text-black hover:bg-purple-100 hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
                        onClick={(e) => {
                            e.preventDefault()
                            const contactSection = document.getElementById('contact')
                            if (contactSection) {
                                contactSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                })
                            }
                        }}
                        aria-label="Request a call from The Code Lawyers"
                    >
                        Request a Call
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
