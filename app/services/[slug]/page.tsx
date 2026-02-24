import { servicesData } from "@/lib/services-data"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LazyBackgrounds } from "@/components/lazy-backgrounds"
import { AnimatedRocket } from "@/components/animated-rocket"
import { PremiumMindMap } from "@/components/premium-mindmap"
import { FloatUp } from "@/components/float-up"
import { HighlightedText } from "@/components/highlighted-text"

export function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.slug,
    }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const service = servicesData.find((s) => s.slug === slug)
    if (!service) return { title: "Service Not Found" }

    return {
        title: `${service.title} | The Code Lawyers`,
        description: service.description,
        openGraph: {
            title: `${service.title} | The Code Lawyers`,
            description: service.description,
            type: "website",
        },
    }
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const service = servicesData.find((s) => s.slug === slug)

    if (!service) {
        notFound()
    }

    const Icon = service.icon

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
                        <span className="text-sm">← Back</span>
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

            <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative">
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(147,51,234,0.05) 0%, transparent 50%, rgba(79,70,229,0.05) 100%)",
                    }}
                />

                <div className="max-w-4xl mx-auto px-6 text-center">
                    <FloatUp>
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 bg-purple-500/10">
                            <Icon className="h-8 w-8 text-purple-400" />
                        </div>
                    </FloatUp>

                    <FloatUp delay={100}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
                            {service.title}
                        </h1>
                    </FloatUp>

                    <FloatUp delay={200}>
                        <p className="text-xl md:text-2xl text-purple-400 font-medium mb-6">
                            <HighlightedText text={service.tagline} keywords={service.highlights} />
                        </p>
                    </FloatUp>

                    <FloatUp delay={300}>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            <HighlightedText text={service.description} keywords={service.highlights} />
                        </p>
                    </FloatUp>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            </section>

            <FloatUp>
                <section className="py-16 md:py-24">
                    <div className="max-w-5xl mx-auto px-6">
                        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-10 text-center">
                            System Architecture
                        </p>
                        <PremiumMindMap root={service.mindMap} />
                    </div>
                </section>
            </FloatUp>

            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <FloatUp>
                        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 text-center">
                            How It Works
                        </p>
                    </FloatUp>
                    <FloatUp delay={100}>
                        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-16 text-center">
                            Our process, step by step
                        </h2>
                    </FloatUp>

                    <div className="relative">
                        <div
                            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(147,51,234,0.5), rgba(79,70,229,0.5))",
                            }}
                        />

                        {service.steps.map((step, index) => (
                            <FloatUp key={index} delay={200 + index * 100}>
                                <div
                                    className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 mb-12 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    <div
                                        className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, rgba(147,51,234,0.3), rgba(79,70,229,0.3))",
                                            border: "2px solid rgba(147,51,234,0.5)",
                                            boxShadow: "0 0 20px rgba(147,51,234,0.3)",
                                        }}
                                    >
                                        <span className="text-sm font-bold text-purple-300">
                                            {index + 1}
                                        </span>
                                    </div>

                                    <div
                                        className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-4" : "md:pl-4"
                                            }`}
                                    >
                                        <div
                                            className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                                backdropFilter: "blur(10px)",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                                </div>
                            </FloatUp>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 relative">
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(79,70,229,0.03) 0%, transparent 50%, rgba(147,51,234,0.03) 100%)",
                    }}
                />

                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <FloatUp>
                            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 text-center lg:text-left">
                                Technology
                            </p>
                            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center lg:text-left">
                                Tools & Stack
                            </h2>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                                {service.techStack.map((tech, index) => (
                                    <FloatUp key={index} delay={index * 50}>
                                        <span
                                            className="px-4 py-2 rounded-full text-sm font-medium text-purple-300 transition-all duration-300 hover:scale-105 cursor-default hover:shadow-lg hover:shadow-purple-500/20"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, rgba(147,51,234,0.15), rgba(79,70,229,0.15))",
                                                border: "1px solid rgba(147,51,234,0.3)",
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    </FloatUp>
                                ))}
                            </div>
                        </FloatUp>

                        <FloatUp delay={200}>
                            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4 text-center lg:text-left">
                                What You Get
                            </p>
                            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center lg:text-left">
                                Deliverables
                            </h2>
                            <div className="space-y-4">
                                {service.deliverables.map((item, index) => (
                                    <FloatUp key={index} delay={300 + index * 50}>
                                        <div
                                            className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:translate-x-2 hover:border-purple-500/20 hover:shadow-md"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                            }}
                                        >
                                            <CheckCircle className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                                            <p className="text-foreground text-sm leading-relaxed">
                                                {item}
                                            </p>
                                        </div>
                                    </FloatUp>
                                ))}
                            </div>
                        </FloatUp>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="max-w-xl mx-auto px-6 text-center">
                    <FloatUp>
                        <div className="bg-purple-500/5 border border-purple-500/15 rounded-xl p-6">
                            <p className="text-foreground/80 italic text-sm leading-relaxed">
                                "{service.philosophy}"
                            </p>
                        </div>
                    </FloatUp>
                </div>
            </section>

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
                    <FloatUp>
                        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                            Ready to get started?
                        </h2>
                    </FloatUp>
                    <FloatUp delay={100}>
                        <p className="text-muted-foreground mb-8">
                            Tell us about your project and we&apos;ll get back to you within 24
                            hours.
                        </p>
                    </FloatUp>
                    <FloatUp delay={200}>
                        <Button
                            asChild
                            size="lg"
                            className="group bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
                        >
                            <Link href="/#contact">
                                Start This Project
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </FloatUp>
                </div>
            </section>
        </main>
    )
}
