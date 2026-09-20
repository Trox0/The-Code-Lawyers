"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { Menu, X } from "lucide-react"
import SocialLinks from "./SocialLinks"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onResize = () => {
      if (desktop.matches) setIsMenuOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onResize)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onResize)
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: "#services", label: "Services", ariaLabel: "View our services" },
    { href: "#work", label: "Work", ariaLabel: "View our portfolio" },
    { href: "#about", label: "About", ariaLabel: "Learn about The Code Lawyers" },
    { href: "#contact", label: "Contact", ariaLabel: "Contact us" },
  ]

  return (
    <header
      className="lamp-site-header fixed top-0 left-0 right-0 z-50 bg-transparent"
      data-menu-open={isMenuOpen}
      itemScope
      itemType="https://schema.org/WPHeader"
      role="banner"
    >
      <div className="max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-12 py-4">
        <nav
          className="flex items-center justify-between"
          aria-label="Main navigation"
          role="navigation"
        >
          {/* Logo/Brand - Important for SEO */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 text-sm sm:text-base lg:text-xl font-semibold tracking-tight text-foreground hover:text-purple-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
            aria-label="The Code Lawyers - Home"
            itemProp="url"
          >
            <Image
              src="/logo.png"
              alt="The Code Lawyers Logo"
              width={40}
              height={40}
              className="w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-md"
              priority
            />
            <span
              itemProp="name"
              className="relative"
            >
              The Code Lawyers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-purple-400 transition-colors relative group"
                aria-label={link.ariaLabel}
              >
                {link.label}
                {/* Underline animation */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            <div className="hidden xl:block border-l border-border pl-6" aria-label="Social media links">
              <SocialLinks />
            </div>


          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden text-foreground p-3 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            className="lamp-mobile-navigation lg:hidden py-4 px-5 border border-white/10 rounded-2xl mt-4 bg-[#08070d]/95 backdrop-blur-xl shadow-2xl max-h-[calc(100svh-100px)] overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-purple-400 transition-colors py-3"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={link.ariaLabel}
                >
                  {link.label}
                </Link>
              ))}

              <div className="py-2" aria-label="Social media links">
                <SocialLinks />
              </div>


            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

