import { Bot, Phone, Workflow, Globe, Code, Video } from "lucide-react"
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
    gradient: string
    steps: ServiceStep[]
    techStack: string[]
    deliverables: string[]
}

export const servicesData: ServiceData[] = [
    {
        slug: "websites",
        icon: Globe,
        title: "Websites & Applications",
        tagline: "Websites that convert visitors into customers",
        description:
            "We build fast, responsive websites and web applications designed around your business goals. Every page is optimized for speed, search rankings, and conversions — not just aesthetics.",
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
                    "Wireframes and high-fidelity mockups — you approve every screen before a single line of code is written.",
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
        title: "Custom Software Development",
        tagline: "Backend systems built for your specific workflow",
        description:
            "Off-the-shelf tools don't fit every business. We build custom software that matches exactly how your team works — from CRMs and dashboards to internal tools and APIs.",
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
        title: "AI Website Chatbots",
        tagline: "Your best salesperson works 24/7 and never takes a break",
        description:
            "We build AI chatbots that answer customer questions, qualify leads, and book meetings — while you sleep. Trained on your business data, so they sound like your team.",
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
        title: "AI Voice Bots",
        tagline: "Handle calls, book appointments, and follow up automatically",
        description:
            "AI voice bots that handle inbound and outbound calls with natural-sounding conversations. Perfect for appointment scheduling, lead follow-ups, and customer support at scale.",
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
        slug: "ai-outreach",
        icon: Workflow,
        title: "AI Outreach & Automation",
        tagline: "Find leads, engage them, and follow up — without lifting a finger",
        description:
            "Automated outreach workflows that find your ideal customers, send personalized messages across email and social, and follow up until they respond. You close the deals; we fill the pipeline.",
        gradient: "from-indigo-500/20 to-cyan-500/20",
        steps: [
            {
                title: "Ideal Customer Profile",
                description:
                    "Define who your best customers are — industry, role, company size, and buying signals.",
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
        slug: "ai-video",
        icon: Video,
        title: "AI Video & Content Editing",
        tagline: "Short-form content that gets attention and drives growth",
        description:
            "We produce high-impact short-form videos and social media content using AI tools and professional editing. Optimized for TikTok, Instagram Reels, and YouTube Shorts.",
        gradient: "from-pink-500/20 to-violet-500/20",
        steps: [
            {
                title: "Content Strategy",
                description:
                    "Research trending formats in your niche. Plan a content calendar that aligns with your goals.",
            },
            {
                title: "Production",
                description:
                    "AI-assisted video generation or professional editing of your raw footage. Fast turnaround.",
            },
            {
                title: "Post-Production",
                description:
                    "Captions, effects, sound design, and color grading. Every detail matters for engagement.",
            },
            {
                title: "Distribution",
                description:
                    "Format and optimize for each platform. Scheduling, hashtag strategy, and performance tracking.",
            },
        ],
        techStack: [
            "Adobe Premiere Pro",
            "After Effects",
            "CapCut",
            "Runway ML",
            "ElevenLabs",
            "Canva",
        ],
        deliverables: [
            "Edited short-form videos (batch of 10-30/month)",
            "Platform-optimized exports (TikTok, Reels, Shorts)",
            "Thumbnail designs",
            "Content calendar",
            "Monthly engagement analytics",
        ],
    },
]
