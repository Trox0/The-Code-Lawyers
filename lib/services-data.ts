import { Bot, Phone, Workflow, Globe, Code, Brain } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ServiceStep {
    title: string
    description: string
}

export interface ServiceData {
    slug: string
    icon: LucideIcon
    title: string
    tagline: string
    description: string
    bullets: string[]
    gradient: string
    steps: ServiceStep[]
    techStack: string[]
    deliverables: string[]
    highlighted?: boolean
}

export const servicesData: ServiceData[] = [
    {
        slug: "websites",
        icon: Globe,
        title: "Websites & Web Apps",
        tagline: "Production-grade sites built for performance.",
        description:
            "Every project ships with SEO architecture, mobile-first design, SOC2-compliant codebase, and a maintainable stack your team can own.",
        bullets: ["Mobile-first responsive", "Next.js + TypeScript + Web3", "SEO architecture baked in", "Conversion-optimized"],
        gradient: "from-blue-500/20 to-purple-500/20",
        steps: [
            {
                title: "Discovery",
                description:
                    "We learn about your audience, competitors, and business goals to define what success looks like.",
            },
            {
                title: "Design",
                description:
                    "Wireframes and high-fidelity mockups. You approve every screen before a single line of code is written.",
            },
            {
                title: "Development",
                description:
                    "Clean, maintainable code using Next.js, React, and TypeScript. Mobile-first and fully responsive.",
            },
            {
                title: "Launch & Optimize",
                description:
                    "Performance tuning, SEO setup, analytics integration, and deployment to production.",
            },
        ],
        techStack: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Vercel",
            "PostgreSQL",
            "Node.js",
        ],
        deliverables: [
            "Fully responsive website or web application",
            "SEO-optimized pages with meta tags and structured data",
            "Performance audit report (Core Web Vitals)",
            "Admin dashboard (if applicable)",
            "30 days of post-launch support",
        ],
    },
    {
        slug: "custom-software",
        icon: Code,
        title: "Custom Software Engineering",
        tagline: "Backend systems architected for your workflow.",
        description:
            "We build APIs, internal tools, and backend systems from scratch. Database-first design. Scalable architecture. Zero technical debt.",
        bullets: ["Custom REST/GraphQL APIs", "PostgreSQL/MongoDB design", "Docker + AWS deployment", "Zero technical debt"],
        gradient: "from-purple-500/20 to-pink-500/20",
        steps: [
            {
                title: "Requirements Analysis",
                description:
                    "Deep dive into your current workflow, pain points, and what the ideal system looks like.",
            },
            {
                title: "Architecture & Design",
                description:
                    "Database modeling, API design, and system architecture. You get a clear technical blueprint.",
            },
            {
                title: "Agile Development",
                description:
                    "Two-week sprints with regular demos. You see progress and give feedback at every stage.",
            },
            {
                title: "Deployment & Scaling",
                description:
                    "Production deployment with monitoring, backups, and infrastructure that handles growth.",
            },
        ],
        techStack: [
            "Node.js",
            "Python",
            "PostgreSQL",
            "MongoDB",
            "Redis",
            "Docker",
            "AWS",
            "REST APIs",
            "GraphQL",
        ],
        deliverables: [
            "Custom-built software matching your exact requirements",
            "API documentation",
            "Database schema and migration scripts",
            "CI/CD pipeline setup",
            "Training session for your team",
            "60 days of post-launch support",
        ],
    },
    {
        slug: "ai-chatbots",
        icon: Bot,
        title: "AI Chatbots & Assistants",
        tagline: "24/7 frontline that qualifies leads and books meetings.",
        description:
            "Handles pricing queries, product questions, and booking. Average 35% lift in qualified leads. Saves 20+ hours/week on repetitive queries. Trained on your docs. Integrated with your CRM.",
        bullets: ["24/7 instant responses", "Qualifies & books automatically", "~35% more qualified leads", "Saves 20+ hours weekly"],
        gradient: "from-cyan-500/20 to-blue-500/20",
        steps: [
            {
                title: "Strategy & Intent Mapping",
                description:
                    "Identify the top questions your customers ask and the actions you want the chatbot to drive.",
            },
            {
                title: "Knowledge Base Training",
                description:
                    "Feed the AI with your services, pricing, FAQs, and brand voice. It learns your business.",
            },
            {
                title: "Integration & Testing",
                description:
                    "Embed into your website with seamless handoff to human agents. Tested with real scenarios.",
            },
            {
                title: "Monitoring & Improvement",
                description:
                    "Review chat logs monthly, refine responses, and improve conversion rates over time.",
            },
        ],
        techStack: [
            "OpenAI GPT",
            "LangChain",
            "Pinecone",
            "Next.js",
            "WebSocket",
            "REST APIs",
        ],
        deliverables: [
            "Custom AI chatbot trained on your business data",
            "Website widget with your branding",
            "Human handoff integration",
            "Analytics dashboard for chat metrics",
            "Monthly performance reports (first 3 months)",
        ],
    },
    {
        slug: "ai-voice-bots",
        icon: Phone,
        title: "AI Voice & Calling",
        tagline: "Inbound/outbound calls handled autonomously.",
        description:
            "Natural voice agents book meetings, qualify leads, and follow up. Average 40% increase in booked calls. Replaces 2-3 full-time receptionists. Syncs with CRM and calendar in real-time.",
        bullets: ["Natural voice conversations", "~40% more bookings", "Replaces 2-3 FTEs", "CRM + calendar sync"],
        gradient: "from-violet-500/20 to-purple-500/20",
        steps: [
            {
                title: "Conversation Design",
                description:
                    "Map out natural call flows, handling edge cases, objections, and forwarding rules.",
            },
            {
                title: "Voice & Tone Setup",
                description:
                    "Select realistic AI voices that match your brand. Configure speed, pauses, and personality.",
            },
            {
                title: "System Integration",
                description:
                    "Connect to your CRM, calendar, and phone system. Calls sync with your existing tools.",
            },
            {
                title: "Live Testing & Launch",
                description:
                    "Simulated calls to verify reliability, then gradual rollout with real-time monitoring.",
            },
        ],
        techStack: [
            "Vapi",
            "Twilio",
            "ElevenLabs",
            "Make/n8n",
            "CRM Integrations",
            "Zapier",
        ],
        deliverables: [
            "Configured AI voice bot with custom call flows",
            "CRM and calendar integration",
            "Call recording and transcript access",
            "Performance dashboard",
            "Ongoing optimization (optional retainer)",
        ],
    },
    {
        slug: "ai-automation",
        icon: Workflow,
        title: "AI Automation & Workflows",
        tagline: "Repetitive work eliminated. Ops on autopilot.",
        description:
            "Workflow orchestration across 50+ tools. Event-driven triggers. Real-time data sync. Full audit logging.",
        bullets: ["Automated social posting", "Scraping & data sorting", "Customized outreach sequences", "Full audit logging"],
        gradient: "from-indigo-500/20 to-cyan-500/20",
        steps: [
            {
                title: "Ideal Customer Profile",
                description:
                    "Define who your best customers are: industry, role, company size, and buying signals.",
            },
            {
                title: "Sequence Design",
                description:
                    "Craft personalized multi-channel outreach: email, LinkedIn, and SMS. No generic templates.",
            },
            {
                title: "Automation Setup",
                description:
                    "Configure triggers, delays, and follow-up rules. Warm replies get flagged instantly.",
            },
            {
                title: "Tracking & Reporting",
                description:
                    "Track open rates, reply rates, and meetings booked. Optimize sequences based on data.",
            },
        ],
        techStack: [
            "n8n",
            "Make",
            "Instantly",
            "Apollo",
            "LinkedIn Sales Navigator",
            "Gmail/Outlook APIs",
        ],
        deliverables: [
            "Complete outreach automation system",
            "Prospect list of verified leads",
            "Email sequences with A/B testing",
            "CRM integration for lead tracking",
            "Weekly performance reports (first month)",
        ],
    },
    {
        slug: "custom-llm",
        icon: Brain,
        title: "Custom LLM Integration",
        tagline: "Enterprise-grade AI embedded in your stack.",
        description:
            "We embed fine-tuned LLMs directly into your systems. RAG pipelines, vector search, retrieval evaluation. SOC2-compliant. Cost controls included.",
        bullets: ["Fine-tuned on your data", "RAG + vector DB", "Enterprise security", "Cost controls built-in"],
        gradient: "from-amber-500/20 to-orange-500/20",
        steps: [
            {
                title: "Requirements & Scope",
                description:
                    "Define use cases, data sources, and success metrics for your LLM integration.",
            },
            {
                title: "Data Preparation",
                description:
                    "Clean, structure, and embed your proprietary data for retrieval.",
            },
            {
                title: "Pipeline Development",
                description:
                    "Build RAG pipelines, fine-tuning workflows, and evaluation frameworks.",
            },
            {
                title: "Deployment & Monitoring",
                description:
                    "Deploy to production with monitoring, cost controls, and continuous evaluation.",
            },
        ],
        techStack: [
            "OpenAI",
            "Anthropic",
            "LangChain",
            "LangGraph",
            "Pinecone",
            "Chroma",
            "Python",
            "FastAPI",
        ],
        deliverables: [
            "Custom LLM integration in your existing systems",
            "RAG pipeline with your knowledge base",
            "Evaluation framework and monitoring dashboard",
            "Cost optimization and rate limiting",
            "Documentation and team training",
        ],
        highlighted: true,
    },
]
