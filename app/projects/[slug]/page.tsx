import { projectsData } from "@/lib/projects-data"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
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
        title: `${project.title} | The Code Lawyers`,
        description: project.tagline,
        openGraph: {
            title: `${project.title} | The Code Lawyers`,
            description: project.tagline,
            type: "website",
        },
    }
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = projectsData.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    const sections = [
        {
            title: project.problem.title,
            summary: project.problem.summary,
            href: `/projects/${project.slug}/problem`,
        },
        {
            title: project.architecture.title,
            summary: project.architecture.summary,
            href: `/projects/${project.slug}/architecture`,
        },
        {
            title: project.stack.title,
            summary: project.stack.summary,
            href: `/projects/${project.slug}/stack`,
        },
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
                        <ArrowRight className="h-4 w-4 rotate-180" />
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

            {/* Hero Section */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative">
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(147,51,234,0.05) 0%, transparent 50%, rgba(79,70,229,0.05) 100%)",
                    }}
                />

                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
                        {project.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-purple-400 font-medium mb-8">
                        {project.tagline}
                    </p>

                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 1200px"
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            </section>

            {/* Section Cards */}
            <section className="py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {sections.map((section) => (
                            <Link
                                key={section.title}
                                href={section.href}
                                className="group relative p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-purple-500/20"
                                style={{
                                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                                }}
                            >
                                {/* Gradient glow on hover */}
                                <div
                                    className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${project.gradient}`}
                                    style={{ filter: "blur(20px)", zIndex: -1 }}
                                />

                                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-purple-300 transition-colors duration-300">
                                    {section.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                    {section.summary}
                                </p>
                                <div className="flex items-center gap-1.5 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                                    Learn More
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 relative">
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(147,51,234,0.05) 0%, transparent 40%, rgba(79,70,229,0.05) 100%)",
                    }}
                />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                <div className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                        Interested in something similar?
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Let&apos;s discuss how we can build this for you.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="group bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
                    >
                        <Link href="/#contact">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    )
}
