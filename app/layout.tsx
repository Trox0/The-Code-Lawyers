import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono"
})

// Site configuration
const siteConfig = {
  name: "The Code Lawyers",
  description: "The Code Lawyers - Premier software engineering and AI solutions company. We deliver disciplined software development, AI chatbots, voice bots, automation, and custom applications with absolute code correctness and responsible AI deployment.",
  url: "https://thecodelawyers.com",
  ogImage: "https://thecodelawyers.com/og-image.jpg",
  keywords: [
    "The Code Lawyers",
    "TheCodeLawyers",
    "Code Lawyers",
    "software engineering",
    "AI solutions",
    "AI chatbots",
    "AI voice bots",
    "custom software development",
    "web development",
    "app development",
    "AI automation",
    "responsible AI",
    "enterprise software",
    "Yashwant Pandey",
    "software development company",
    "AI development company",
    "India software company",
    "AI integration",
    "business automation",
    "digital transformation"
  ],
  author: "Yashwant Pandey",
  twitterHandle: "@thecodelawyers",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "The Code Lawyers | Premier Software Engineering & AI Solutions",
    template: "%s | The Code Lawyers"
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.name,

  // Robots & Indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },

  // Open Graph - Facebook, LinkedIn, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "The Code Lawyers | Premier Software Engineering & AI Solutions",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "The Code Lawyers - Software Engineering & AI Solutions",
        type: "image/jpeg",
      },
      {
        url: `${siteConfig.url}/og-image-square.jpg`,
        width: 600,
        height: 600,
        alt: "The Code Lawyers Logo",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "The Code Lawyers | Premier Software Engineering & AI Solutions",
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)", sizes: "32x32", type: "image/png" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // Manifest for PWA
  manifest: "/manifest.json",

  // Additional metadata
  category: "technology",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Verification (add your actual verification codes)
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // App links
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },

  // Other
  generator: "Next.js",
  applicationName: siteConfig.name,
}

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      alternateName: ["TheCodeLawyers", "Code Lawyers", "TCL"],
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
        width: 512,
        height: 512,
      },
      image: siteConfig.ogImage,
      description: siteConfig.description,
      founder: {
        "@type": "Person",
        name: "Yashwant Pandey",
        jobTitle: "Principal Architect",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-8454055228",
        contactType: "customer service",
        email: "contact@thecodelawyers.com",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://twitter.com/thecodelawyers",
        "https://linkedin.com/company/thecodelawyers",
        "https://github.com/thecodelawyers",
        "https://instagram.com/thecodelawyers",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      areaServed: "Worldwide",
      serviceType: [
        "Software Development",
        "AI Solutions",
        "Web Development",
        "Mobile App Development",
        "AI Chatbots",
        "AI Voice Bots",
        "Business Automation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      url: siteConfig.url,
      name: "The Code Lawyers | Premier Software Engineering & AI Solutions",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      about: {
        "@id": `${siteConfig.url}/#organization`,
      },
      description: siteConfig.description,
      breadcrumb: {
        "@id": `${siteConfig.url}/#breadcrumb`,
      },
      inLanguage: "en-US",
      potentialAction: [
        {
          "@type": "ReadAction",
          target: [siteConfig.url],
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#service`,
      name: siteConfig.name,
      image: siteConfig.ogImage,
      url: siteConfig.url,
      telephone: "+91-8454055228",
      priceRange: "$$",
      description: "Premier software engineering and AI solutions company specializing in custom software development, AI chatbots, voice bots, automation, and web applications.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software & AI Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Websites & Applications",
              description: "Modern, fast, and conversion-focused websites and apps.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Software Development",
              description: "Scalable backend systems tailored to business needs.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Website Chatbots",
              description: "Smart chatbots that engage visitors, answer questions, and convert leads 24/7.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Voice Bots",
              description: "Automated call handling, follow-ups, and appointment workflows using AI voice systems.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Outreach & Automation",
              description: "AI-powered inbound and outbound workflows for lead qualification and follow-ups.",
            },
          },
        ],
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/images/yashwant-pandey.jpeg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}


