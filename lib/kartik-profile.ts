import { siteUrl } from "./seo"

export const kartikPerson = {
  "@type": "Person",
  "@id": `${siteUrl}/#kartik`,
  name: "Kartik",
  jobTitle: "Co-Founder & President",
  url: `${siteUrl}/#kartik`,
  image: `${siteUrl}/images/kartik.png`,
  description: "Kartik is Co-Founder & President of The Code Lawyers, specialising in AI systems, secure integrations and business automation, with international experience in Europe.",
  worksFor: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "The Code Lawyers", url: siteUrl },
  knowsAbout: ["AI systems", "Software engineering", "Secure integrations", "Business automation"],
  mainEntityOfPage: `${siteUrl}/#kartik`,
}
