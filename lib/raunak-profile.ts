import { siteUrl } from "./seo"

export const raunakProfilePath = "/team/raunak-sadhwani"
export const raunakPerson = {
  "@type": "Person",
  "@id": `${siteUrl}${raunakProfilePath}#person`,
  name: "Raunak Sadhwani",
  jobTitle: "Co-Founder & President",
  url: "https://raunak.me/",
  sameAs: ["https://raunak.me/"],
  image: `${siteUrl}/images/raunak-sadhwani.jpg`,
  description: "Raunak Sadhwani is Co-Founder & President of The Code Lawyers, specialising in AI systems, secure integrations and business automation, with international experience in Germany.",
  worksFor: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "The Code Lawyers", url: siteUrl },
  knowsAbout: ["AI systems", "Software engineering", "Secure integrations", "Business automation"],
  mainEntityOfPage: `${siteUrl}${raunakProfilePath}`,
}
