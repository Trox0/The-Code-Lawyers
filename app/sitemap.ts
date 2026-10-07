import type { MetadataRoute } from "next"
import { servicesData } from "@/lib/services-data"
import { projectsData } from "@/lib/projects-data"
import { siteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...servicesData.map(s => `/services/${s.slug}`),
    ...projectsData.flatMap(p => [`/projects/${p.slug}`, ...["problem", "architecture", "stack"].map(section => `/projects/${p.slug}/${section}`)]),
    "/privacy", "/terms", "/disclaimer"]
  return paths.map(path => ({ url: `${siteUrl}${path === "/" ? "/" : path}` }))
}
