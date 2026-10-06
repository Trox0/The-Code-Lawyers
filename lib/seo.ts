import type { Metadata } from "next"

export const siteUrl = "https://thecodelawyers.com"
export const siteName = "The Code Lawyers"
export const siteDescription = "The Code Lawyers builds custom software, websites, AI chatbots, voice agents and workflow automation for businesses in India. Explore our services and work."

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`
  const fullTitle = `${title} | ${siteName}`
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_IN", siteName, title: fullTitle, description, url,
      images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: `${siteName} — Software engineering & AI automation` }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [`${siteUrl}/opengraph-image`] },
  }
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${siteUrl}${item.path}` })) }
}
