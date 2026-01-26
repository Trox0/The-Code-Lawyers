"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, ArrowRight, Mail, Send, Loader2, CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"

// EmailJS configuration - Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID" // e.g., "service_xxxxxxx"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID" // e.g., "template_xxxxxxx"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY" // e.g., "xxxxxxxxxxx"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Dynamic import of emailjs-com for client-side only
      const emailjs = (await import("@emailjs/browser")).default

      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY)

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "The Code Lawyers",
        }
      )

      if (result.status === 200) {
        setSubmitStatus("success")
        toast.success("Message sent successfully!", {
          description: "We'll get back to you as soon as possible.",
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        })
        // Reset form
        setFormData({ name: "", email: "", message: "" })
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
      setSubmitStatus("error")
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly via phone.",
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      })
    } finally {
      setIsSubmitting(false)
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Contact</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-6 text-balance">
              Let&apos;s build something that <span className="text-purple-500">works</span>.
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Ready to <span className="text-purple-400">automate</span> your business with{" "}
              <span className="text-purple-400">AI</span>? Get in touch for a free consultation.
            </p>

            {/* Contact info cards with glassmorphism */}
            <div className="space-y-4 mb-8">
              <div 
                className="flex items-center gap-4 p-4 rounded-xl group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-all duration-300 group-hover:scale-110">
                  <Phone className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-foreground font-medium">+91 8454055228</p>
                </div>
              </div>

              <div 
                className="flex items-center gap-4 p-4 rounded-xl group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-all duration-300 group-hover:scale-110">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">contact@thecodelawyers.com</p>
                </div>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              <a href="tel:+918454055228">
                Book a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* Glassmorphism contact form */}
          <div
            className={`relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            {/* Glow effect behind card */}
            <div 
              className="absolute -inset-4 rounded-2xl opacity-30 blur-3xl"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(147,51,234,0.3), transparent 70%)',
              }}
            />
            
            {/* Main glassmorphism card */}
            <div 
              className="relative rounded-2xl p-8 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              {/* Animated gradient border */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-50"
                style={{
                  background: 'linear-gradient(135deg, rgba(147,51,234,0.2), transparent, rgba(79,70,229,0.2))',
                  padding: '1px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                }}
              />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground/90">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 focus:ring-2 focus:ring-purple-500/30 placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground/90">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 focus:ring-2 focus:ring-purple-500/30 placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground/90">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 focus:ring-2 focus:ring-purple-500/30 placeholder:text-muted-foreground/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full relative overflow-hidden transition-all duration-300 ${
                    submitStatus === "success" 
                      ? "bg-green-600 hover:bg-green-600" 
                      : submitStatus === "error"
                      ? "bg-red-600 hover:bg-red-600"
                      : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600"
                  } hover:scale-[1.02] shadow-lg shadow-purple-500/20`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Message Sent!
                    </>
                  ) : submitStatus === "error" ? (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Failed - Try Again
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-20 pointer-events-none">
                  <div className="absolute top-4 right-4 w-8 h-px bg-gradient-to-r from-transparent to-purple-500" />
                  <div className="absolute top-4 right-4 w-px h-8 bg-gradient-to-b from-transparent to-purple-500" />
                </div>
                <div className="absolute bottom-0 left-0 w-20 h-20 opacity-20 pointer-events-none">
                  <div className="absolute bottom-4 left-4 w-8 h-px bg-gradient-to-l from-transparent to-purple-500" />
                  <div className="absolute bottom-4 left-4 w-px h-8 bg-gradient-to-t from-transparent to-purple-500" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
