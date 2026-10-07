import { siteUrl, siteName, siteDescription } from "@/lib/seo"
import { raunakPerson } from "@/lib/raunak-profile"
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScrolling } from "@/components/smooth-scrolling"
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

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, userScalable: true, themeColor: "#08080b" }

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} | Software Engineering & AI Automation`, template: `%s | ${siteName}` },
  description: siteDescription,
  verification: { google: "jkudEBMrWPzA5mW2H4SABwd_D77zKPqrcMr3pwH4GdI" },
  publisher: siteName,
  applicationName: siteName,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/icon.png", apple: "/brand/apple-touch-180.png" },
  manifest: "/manifest.json",
  openGraph: { type: "website", locale: "en_IN", siteName, title: `${siteName} | Software Engineering & AI Automation`, description: siteDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "The Code Lawyers — Software engineering & AI automation" }] },
  twitter: { card: "summary_large_image", title: `${siteName} | Software Engineering & AI Automation`, description: siteDescription, images: ["/opengraph-image"] },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  alternateName: "TheCodeLawyers",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: siteDescription,
  areaServed: { "@type": "Country", name: "India" },
  email: "team@thecodelawyers.com",
  telephone: "+91-8454055228",
  founder: [
    { "@type": "Person", name: "Yashwant Pandey", jobTitle: "Co-Founder & CEO" },
    { "@type": "Person", name: "Kshitij Sharma", jobTitle: "Co-Founder & CTO" },
    raunakPerson,
  ],
  sameAs: ["https://www.linkedin.com/company/111461921/", "https://www.instagram.com/thecodelawyers/"],
  knowsAbout: ["Software engineering", "Custom software development", "Web development", "AI chatbots", "AI voice agents", "Workflow automation"],
  contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: "team@thecodelawyers.com", telephone: "+91-8454055228" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} overflow-x-hidden`}>
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

      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
        <Analytics />
      </body>
    </html>
  )
}


