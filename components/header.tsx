"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { Menu, X } from "lucide-react"
import SocialLinks from "./SocialLinks"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#services", label: "Services", ariaLabel: "View our services" },
    { href: "#work", label: "Work", ariaLabel: "View our portfolio" },
    { href: "#about", label: "About", ariaLabel: "Learn about The Code Lawyers" },
    { href: "#contact", label: "Contact", ariaLabel: "Contact us" },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      itemScope
      itemType="https://schema.org/WPHeader"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav
          className="flex items-center justify-between"
          aria-label="Main navigation"
          role="navigation"
        >
          {/* Logo/Brand - Important for SEO */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-foreground hover:text-purple-400 transition-colors"
            aria-label="The Code Lawyers - Home"
            itemProp="url"
          >
            <Image
              src="/logo.png"
              alt="The Code Lawyers Logo"
              width={56}
              height={56}
              className="rounded-md"
              priority
            />
            <span
              itemProp="name"
              className="relative"
            >
              The Code Lawyers
              {/* Invisible text for additional SEO keywords */}
              <span className="sr-only"> - Premier Software Engineering & AI Solutions Company</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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

            <div className="border-l border-border pl-6" aria-label="Social media links">
              <SocialLinks />
            </div>


          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 hover:bg-muted rounded-lg transition-colors"
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
            className="md:hidden py-4 border-t border-border mt-4"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-purple-400 transition-colors py-2"
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

