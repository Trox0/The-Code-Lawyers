import Image from "next/image"
import Link from "next/link"
import { pageMetadata, siteUrl } from "@/lib/seo"
import { raunakPerson, raunakProfilePath } from "@/lib/raunak-profile"

export const metadata = pageMetadata(
  "Raunak Sadhwani — Co-Founder & President",
  raunakPerson.description,
  raunakProfilePath,
)

export default function RaunakProfile() {
  const schema = { "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${siteUrl}${raunakProfilePath}#profile`, url: `${siteUrl}${raunakProfilePath}`, name: "Raunak Sadhwani — Co-Founder & President of The Code Lawyers", mainEntity: raunakPerson }
  return (
    <main className="min-h-screen bg-background px-6 py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="max-w-3xl mx-auto">
        <Link href="/#raunak-sadhwani" className="text-sm text-muted-foreground hover:text-purple-400">← Meet the founders</Link>
        <div className="mt-12 flex flex-col sm:flex-row items-start gap-8">
          <Image src="/images/raunak-sadhwani.jpg" alt="Raunak Sadhwani, Co-Founder & President of The Code Lawyers" width={192} height={192} className="rounded-2xl object-cover aspect-square" />
          <div>
            <p className="text-purple-400 text-sm font-medium mb-3">The Code Lawyers · Leadership</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Raunak Sadhwani</h1>
            <p className="mt-4 text-xl text-muted-foreground">Co-Founder &amp; President</p>
          </div>
        </div>
        <p className="mt-10 text-lg leading-relaxed">Raunak Sadhwani is Co-Founder &amp; President of The Code Lawyers, a software engineering and AI solutions company serving businesses in India.</p>
        <p className="mt-5 text-muted-foreground leading-relaxed">He brings over 2 years of international experience in Germany and 3 years of development expertise, specialising in AI systems, secure integrations and business automation.</p>
        <h2 className="mt-10 text-2xl font-semibold">AI and software expertise</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">His expertise spans AI systems, software engineering, secure integrations and workflow automation. The Code Lawyers builds custom software, websites, AI chatbots and voice agents that connect with business tools and processes.</p>
        <div className="mt-10 flex flex-wrap gap-6">
          <a href="https://raunak.me/" className="rounded-full bg-foreground text-background px-6 py-3 font-medium">Visit Raunak’s personal website ↗</a>
          <Link href="/#contact" className="px-2 py-3 text-purple-400">Contact The Code Lawyers →</Link>
        </div>
      </article>
    </main>
  )
}
