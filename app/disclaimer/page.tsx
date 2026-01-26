import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Legal Disclaimer for The Code Lawyers - Important information about our software engineering and AI solutions services, limitations, and warranties.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function Disclaimer() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-2">Disclaimer</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">General Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information provided by The Code Lawyers on thecodelawyers.com and through our services is 
              for general informational purposes only. All information on the site is provided in good faith, 
              however, we make no representation or warranty of any kind, express or implied, regarding the 
              accuracy, adequacy, validity, reliability, availability, or completeness of any information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Professional Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The site cannot and does not contain legal advice. The software engineering and AI solutions 
              information is provided for general informational and educational purposes only and is not a 
              substitute for professional advice. Accordingly, before taking any actions based upon such 
              information, we encourage you to consult with the appropriate professionals.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">External Links Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The site may contain links to other websites or content belonging to or originating from third 
              parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, 
              validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, 
              or assume responsibility for the accuracy or reliability of any information offered by third-party 
              websites linked through the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Testimonials Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The site may contain testimonials by users of our products and/or services. These testimonials 
              reflect the real-life experiences and opinions of such users. However, the experiences are 
              personal to those particular users, and may not necessarily be representative of all users of 
              our products and/or services. We do not claim, and you should not assume, that all users will 
              have the same experiences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">AI and Technology Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our AI solutions are designed to assist and enhance business processes but should not be solely 
              relied upon for critical decisions. AI systems may produce unexpected results, and we recommend 
              human oversight for all AI-powered processes. The Code Lawyers is not responsible for any 
              decisions made based solely on AI-generated outputs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">No Guarantees</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive to deliver high-quality software and AI solutions, we cannot guarantee specific 
              business results, revenue increases, or performance metrics. Results vary based on numerous 
              factors outside our control, including but not limited to market conditions, implementation, 
              and user adoption.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">&quot;The Code Lawyers&quot; Name</h2>
            <p className="text-muted-foreground leading-relaxed">
              Despite our name, &quot;The Code Lawyers,&quot; we are a software engineering and AI solutions company. 
              We do not provide legal services, legal advice, or legal representation. Our name is a creative 
              expression referring to our dedication to precision and discipline in software development.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Disclaimer, please contact us:
            </p>
            <p className="text-purple-400 mt-2">
              The Code Lawyers<br />
              Email: contact@thecodelawyers.com<br />
              Phone: +91 8454055228
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
