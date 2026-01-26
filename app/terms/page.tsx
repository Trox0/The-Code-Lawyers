import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for The Code Lawyers - Read our terms and conditions for software engineering, AI solutions, and digital services.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the services provided by The Code Lawyers, you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Code Lawyers provides software engineering and AI solutions including but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Custom software development</li>
              <li>Website and web application development</li>
              <li>AI chatbot and voice bot development</li>
              <li>Business process automation</li>
              <li>AI video and content editing</li>
              <li>Technical consultation services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Project Agreements</h2>
            <p className="text-muted-foreground leading-relaxed">
              Each project will be governed by a separate project agreement or statement of work (SOW) that 
              outlines specific deliverables, timelines, payment terms, and other project-specific details. 
              These agreements supplement but do not replace these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              Upon full payment, clients receive ownership rights to custom-developed code and deliverables 
              as specified in the project agreement. The Code Lawyers retains the right to use general 
              knowledge, skills, and experience gained during the project.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Payment terms are specified in individual project agreements. Generally, projects require an 
              upfront deposit with remaining payments tied to milestone completions. Late payments may result 
              in project delays or suspension.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed">
              We maintain strict confidentiality regarding all client information, business data, and project 
              details. We will not disclose confidential information to third parties without prior written 
              consent, except as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Code Lawyers shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages arising from the use of our services. Our total liability shall not exceed 
              the amount paid for the specific service giving rise to the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              Either party may terminate a project agreement with written notice as specified in the 
              individual agreement. Upon termination, the client shall pay for all work completed up to 
              the termination date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of India. 
              Any disputes shall be resolved through arbitration in accordance with applicable arbitration rules.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions regarding these Terms of Service, please contact:
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
