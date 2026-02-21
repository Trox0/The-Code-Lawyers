import { Bot, Phone, Workflow, Globe, Code, Brain } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ServiceStep {
    title: string
    description: string
}

export interface MindMapNode {
    label: string
    children?: MindMapNode[]
}

export interface ServiceData {
    slug: string
    icon: LucideIcon
    title: string
    tagline: string
    description: string
    whatItIs: string
    useCases: string[]
    philosophy: string
    mindMap: MindMapNode
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
        whatItIs: "We build production-grade websites and web applications. Every site ships as a maintainable codebase with SEO architecture, responsive design, and a deployment pipeline. No templates. No page builders. Just clean code your team owns.",
        useCases: [
            "Founder replacing a Wix/Squarespace site with a custom-built, brandable presence",
            "SaaS company needing a marketing site plus docs site on a shared stack",
            "Services business requiring a client intake portal with form logic",
            "Startup launching an MVP web app with auth, payments, and a user dashboard"
        ],
        philosophy: "Every website we ship is written in code we own, test, and maintain. No page builders. No black-box plugins. The result is a codebase your team can inspect, extend, and deploy independently.",
        mindMap: { 
            label: "Websites & Web Apps", 
            children: [
                { label: "Inputs", children: [{ label: "Business goals & audience" }, { label: "Content strategy" }, { label: "Brand assets" }] },
                { label: "Engineering", children: [{ label: "Next.js / React / TypeScript" }, { label: "Responsive layout system" }, { label: "SEO: meta, schema, sitemap" }, { label: "Performance: Core Web Vitals" }] },
                { label: "Outputs", children: [{ label: "Production deployment (Vercel / AWS)" }, { label: "Admin or CMS interface" }, { label: "Analytics integration" }] },
                { label: "Post-Launch", children: [{ label: "Performance audit" }, { label: "30-day support window" }, { label: "Handoff documentation" }] }
            ] 
        },
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
                    "Wireframes and high-fidelity mockups. You approve every screen before code is written.",
            },
            {
                title: "Development",
                description:
                    "Clean code using Next.js, React, and TypeScript. Mobile-first and fully responsive.",
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
        whatItIs: "We build bespoke software systems designed around how a specific business operates. Backends, APIs, dashboards, and internal tools built from scratch to match your exact workflow.",
        useCases: [
            "Operations team replacing a spreadsheet-based process with a dedicated internal tool",
            "Company consolidating 5 disconnected SaaS tools into one unified system",
            "Startup building a custom platform that does not exist yet",
            "Business needing a secure API layer between legacy systems and modern frontends"
        ],
        philosophy: "We treat every system as infrastructure, not a project. That means clean architecture, documented APIs, tested code, and a deployment pipeline.",
        mindMap: { 
            label: "Custom Software Engineering", 
            children: [
                { label: "Inputs", children: [{ label: "Workflow analysis" }, { label: "Data model requirements" }, { label: "Integration map (existing tools)" }] },
                { label: "Engineering", children: [{ label: "Database design (PostgreSQL / MongoDB)" }, { label: "API layer (REST / GraphQL)" }, { label: "Auth, roles, permissions" }, { label: "CI/CD pipeline" }] },
                { label: "Outputs", children: [{ label: "Deployed application" }, { label: "API documentation" }, { label: "Database schema + migrations" }] },
                { label: "Post-Launch", children: [{ label: "Monitoring & alerting" }, { label: "60-day support window" }, { label: "Team training session" }] }
            ] 
        },
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
            "Handles pricing queries, product questions, and booking. Average 35% lift in qualified leads. Saves 20+ hours per week on repetitive queries. Trained on your docs. Integrated with your CRM.",
        whatItIs: "We build AI chatbots trained on your own data. These are engineered conversational systems with defined intent, fallback logic, and human handoff. Not generic widget installs.",
        useCases: [
            "Services business automating first response for inbound inquiries",
            "E-commerce store handling pre-sale questions and order status",
            "SaaS company deflecting tier-1 support tickets with AI",
            "Agency qualifying leads before routing to a sales rep"
        ],
        philosophy: "A chatbot is only useful if it answers correctly. We train every bot against verified business data and test edge cases before launch.",
        mindMap: { 
            label: "AI Chatbots & Assistants", 
            children: [
                { label: "Inputs", children: [{ label: "FAQs, docs, knowledge base" }, { label: "Intent map (what users ask)" }, { label: "Brand voice guidelines" }] },
                { label: "Engineering", children: [{ label: "RAG pipeline (embeddings + retrieval)" }, { label: "Conversation state management" }, { label: "Human handoff logic" }, { label: "Widget integration (site / app)" }] },
                { label: "Outputs", children: [{ label: "Deployed chatbot with branding" }, { label: "Lead capture + CRM sync" }, { label: "Chat analytics dashboard" }] },
                { label: "Post-Launch", children: [{ label: "Monthly response accuracy review" }, { label: "Knowledge base updates" }, { label: "Conversion rate tracking" }] }
            ] 
        },
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
                    "Embed into your website with seamless handoff to human agents. Test with real scenarios.",
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
        whatItIs: "We build AI-powered phone systems that handle real conversations. Scheduling, follow-ups, and support without a human on the line.",
        useCases: [
            "Medical or dental practice automating appointment booking and reminders",
            "Real estate agency following up with leads within minutes of inquiry",
            "Service business handling after-hours calls without a call center",
            "Sales team running outbound qualification at scale"
        ],
        philosophy: "Voice AI is high-stakes. A bad call flow damages trust. We design every conversation path with explicit fallback logic and test against real scenarios.",
        mindMap: { 
            label: "AI Voice & Calling", 
            children: [
                { label: "Inputs", children: [{ label: "Call flow requirements" }, { label: "CRM / calendar access" }, { label: "Voice and tone preferences" }] },
                { label: "Engineering", children: [{ label: "Conversation design (branching logic)" }, { label: "Voice synthesis (ElevenLabs / Vapi)" }, { label: "Telephony integration (Twilio)" }, { label: "CRM sync + data capture" }] },
                { label: "Outputs", children: [{ label: "Live AI phone agent" }, { label: "Call recordings + transcripts" }, { label: "Performance dashboard" }] },
                { label: "Post-Launch", children: [{ label: "Call outcome monitoring" }, { label: "Flow refinement" }, { label: "Optional retainer for ongoing optimization" }] }
            ] 
        },
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
        whatItIs: "We build automated workflows that eliminate repetitive manual processes. Connecting tools, triggering actions, and moving data without human intervention.",
        useCases: [
            "Agency auto-routing new client inquiries to the right team with context",
            "E-commerce store syncing orders, inventory, and fulfillment across platforms",
            "Recruiting firm automating candidate pipeline stages and notifications",
            "Operations team replacing a 12-step manual process with a single trigger"
        ],
        philosophy: "Automation without structure creates new problems. Every workflow we build has defined triggers, explicit error states, and logging.",
        mindMap: { 
            label: "AI Automation & Workflows", 
            children: [
                { label: "Inputs", children: [{ label: "Process audit (current manual steps)" }, { label: "Tool inventory (SaaS, APIs, DBs)" }, { label: "Trigger definitions" }] },
                { label: "Engineering", children: [{ label: "Workflow design (n8n / Make)" }, { label: "API connectors + webhooks" }, { label: "Conditional logic + branching" }, { label: "Error handling + retry logic" }] },
                { label: "Outputs", children: [{ label: "Live automation workflows" }, { label: "Monitoring dashboard" }, { label: "Process documentation" }] },
                { label: "Post-Launch", children: [{ label: "Failure alerting" }, { label: "Monthly workflow review" }, { label: "Expansion to adjacent processes" }] }
            ] 
        },
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
        whatItIs: "We integrate large language models into existing software systems. Not as standalone chatbots, but as embedded intelligence within production applications.",
        useCases: [
            "Legal firm adding AI-powered contract analysis to their internal platform",
            "Healthcare company building a clinical document summarizer with compliance guardrails",
            "Fintech product embedding transaction classification using fine-tuned models",
            "Enterprise adding natural-language search across internal knowledge repositories"
        ],
        philosophy: "LLMs are powerful but unpredictable. We treat every integration as a systems engineering problem with defined inputs, tested outputs, cost monitoring, and fallback behavior.",
        mindMap: { 
            label: "Custom LLM Integration", 
            children: [
                { label: "Inputs", children: [{ label: "Existing system architecture" }, { label: "Data sources (docs, DBs, APIs)" }, { label: "Use case definition" }] },
                { label: "Engineering", children: [{ label: "Model selection (GPT-4, Claude, open-source)" }, { label: "RAG pipeline (embeddings -> vector DB -> retrieval)" }, { label: "Prompt framework (versioned, evaluated)" }, { label: "API layer (auth, rate limits, logging)" }, { label: "Cost and latency monitoring" }] },
                { label: "Outputs", children: [{ label: "LLM-powered feature in production" }, { label: "Evaluation benchmarks + test suite" }, { label: "Documentation + runbooks" }] },
                { label: "Post-Launch", children: [{ label: "Model performance monitoring" }, { label: "Prompt drift detection" }, { label: "Cost optimization reviews" }] }
            ] 
        },
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
