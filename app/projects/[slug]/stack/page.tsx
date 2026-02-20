import { projectsData } from "@/lib/projects-data"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LazyBackgrounds } from "@/components/lazy-backgrounds"
import { AnimatedRocket } from "@/components/animated-rocket"

export function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.slug,
    }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const project = projectsData.find((p) => p.slug === slug)
    if (!project) return { title: "Project Not Found" }

    return {
        title: `${project.stack.title} - ${project.title} | The Code Lawyers`,
        description: project.tagline,
    }
}

export default async function StackPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = projectsData.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    const sectionData = project.stack

    const otherSections = [
        { key: "problem", label: "Problem & Outcome" },
        { key: "architecture", label: "System Design" },
    ]

    return (
        <main className="min-h-screen bg-background">
            <LazyBackgrounds />
            <AnimatedRocket />
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back to Home</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-lg font-semibold text-foreground hover:text-purple-400 transition-colors"
                    >
                        The Code Lawyers
                    </Link>
                    <Button
                        asChild
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300"
                    >
                        <Link href="/#contact">Get Started</Link>
                    </Button>
                </div>
            </header>

            {/* Content */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Back to Project */}
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back to {project.title}</span>
                    </Link>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-12">
                        {sectionData.title}
                    </h1>

                    {/* Content paragraphs */}
                    <div className="space-y-6 mb-12">
                        {sectionData.content.map((item, idx) => (
                            <p key={idx} className="text-muted-foreground text-base leading-relaxed">
                                {item}
                            </p>
                        ))}
                    </div>

                    {/* Bullets checklist */}
                    <div className="space-y-4 mb-16">
                        {sectionData.bullets.map((bullet, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-3 p-4 rounded-xl"
                                style={{
                                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <CheckCircle className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                                <p className="text-foreground text-sm leading-relaxed">
                                    {bullet}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Sibling navigation */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
                        {otherSections.map((other) => (
                            <Button
                                key={other.key}
                                asChild
                                variant="outline"
                                className="flex-1 justify-between sm:justify-start gap-2"
                            >
                                <Link href={`/projects/${project.slug}/${other.key}`}>
                                    {other.key === "problem" && <ArrowLeft className="h-4 w-4" />}
                                    {other.label}
                                    {other.key === "architecture" && <ArrowRight className="h-4 w-4" />}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
