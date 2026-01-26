import Link from "next/link"
import SocialLinks from "./SocialLinks"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer 
      className="py-12 border-t border-border"
      itemScope
      itemType="https://schema.org/WPFooter"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Company Info */}
          <div 
            className="text-center md:text-left"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <Link 
              href="/" 
              className="text-lg font-semibold text-foreground hover:text-purple-400 transition-colors"
              itemProp="url"
              aria-label="The Code Lawyers - Home"
            >
              <span itemProp="name">The Code Lawyers</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              <span itemProp="description">Premier Software Engineering & AI Solutions</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              © {currentYear} The Code Lawyers. All rights reserved.
            </p>
            {/* Hidden contact info for SEO */}
            <div className="sr-only" itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
              <span itemProp="telephone">+91-8454055228</span>
              <span itemProp="email">contact@thecodelawyers.com</span>
              <span itemProp="contactType">customer service</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav 
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
            aria-label="Footer navigation"
          >
            <Link 
              href="#services" 
              className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
              aria-label="Our Services"
            >
              Services
            </Link>
            <Link 
              href="#work" 
              className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
              aria-label="Our Work and Portfolio"
            >
              Portfolio
            </Link>
            <Link 
              href="#contact" 
              className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
              aria-label="Contact Us"
            >
              Contact
            </Link>
            <span className="hidden md:inline text-muted-foreground/30">|</span>
            <Link 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Privacy Policy"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Terms of Service"
            >
              Terms
            </Link>
            <Link 
              href="/disclaimer" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Disclaimer"
            >
              Disclaimer
            </Link>
          </nav>

          {/* Social Icons */}
          <div aria-label="Social media links">
            <SocialLinks />
          </div>
        </div>

        {/* Additional SEO Text */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground/60 max-w-3xl mx-auto">
            The Code Lawyers is a premier software engineering and AI solutions company specializing in 
            custom software development, AI chatbots, AI voice bots, web applications, mobile apps, 
            and business automation. We deliver disciplined engineering with absolute code correctness.
          </p>
        </div>
      </div>
    </footer>
  )
}

