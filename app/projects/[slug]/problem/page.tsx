import { projectsData } from "@/lib/projects-data"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LazyBackgrounds } from "@/components/lazy-backgrounds"
import { AnimatedRocket } from "@/components/animated-rocket"
import { FloatUp } from "@/components/float-up"
import { HighlightedText } from "@/components/highlighted-text"

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
        title: `${project.problem.title} - ${project.title} | The Code Lawyers`,
        description: project.tagline,
    }
}

export default async function ProblemPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = projectsData.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    const sectionData = project.problem

    const otherSections = [
        { key: "architecture", label: "System Design" },
        { key: "stack", label: "Technology Stack" },
    ]

    return (
        <main className="min-h-screen bg-background">
            <LazyBackgrounds />
            <AnimatedRocket />
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

            <section className="pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="max-w-4xl mx-auto px-6">
                    <FloatUp>
                        <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-purple-400 transition-colors mb-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="text-sm">Back to {project.title}</span>
                        </Link>
                    </FloatUp>

                    <FloatUp delay={100}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-12">
                            {sectionData.title}
                        </h1>
                    </FloatUp>

                    <div className="space-y-6 mb-12">
                        {sectionData.content.map((item, idx) => (
                            <FloatUp key={idx} delay={200 + idx * 50}>
                                <p className="text-muted-foreground text-base leading-relaxed">
                                    <HighlightedText text={item} keywords={sectionData.highlights} />
                                </p>
                            </FloatUp>
                        ))}
                    </div>

                    <div className="space-y-4 mb-16">
                        {sectionData.bullets.map((bullet, idx) => (
                            <FloatUp key={idx} delay={400 + idx * 50}>
                                <div
                                    className="flex items-start gap-3 p-4 rounded-xl hover:border-purple-500/20 hover:shadow-md transition-all duration-300"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        borderLeft: "3px solid rgba(147,51,234,0.5)",
                                    }}
                                >
                                    <CheckCircle className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                                    <p className="text-foreground text-sm leading-relaxed">
                                        <HighlightedText text={bullet} keywords={sectionData.highlights} />
                                    </p>
                                </div>
                            </FloatUp>
                        ))}
                    </div>

                    <FloatUp delay={600}>
                        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
                            {otherSections.map((other) => (
                                <Button
                                    key={other.key}
                                    asChild
                                    variant="outline"
                                    className="flex-1 justify-between sm:justify-start gap-2 hover:border-purple-500/30 hover:bg-purple-500/5"
                                >
                                    <Link href={`/projects/${project.slug}/${other.key}`}>
                                        {other.label}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </FloatUp>
                </div>
            </section>
        </main>
    )
}
