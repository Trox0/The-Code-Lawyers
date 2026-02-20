export interface ProjectSection {
    title: string
    summary: string
    content: string[]
    bullets: string[]
}

export interface ProjectData {
    slug: string
    title: string
    tagline: string
    image: string
    gradient: string
    techStackSummary: string
    problem: ProjectSection
    architecture: ProjectSection
    stack: ProjectSection
}

export const projectsData: ProjectData[] = [
    {
        slug: "student-management",
        title: "Student Moderation & Management App",
        tagline: "Real-time moderation and workflow management for educational institutions.",
        image: "/LetsCatchUp.png",
        gradient: "from-blue-500/40 to-purple-500/40",
        techStackSummary: "React Native, Node.js, Couchbase",
        problem: {
            title: "Problem & Outcome",
            summary: "Manual student tracking consumed 40+ hours/week with no real-time visibility.",
            content: [
                "Manual student tracking consumed 40+ hours/week",
                "No real-time visibility into student activities",
                "Inefficient communication between staff and students",
            ],
            bullets: [
                "85% reduction in administrative overhead",
                "Real-time dashboards provide instant insights",
                "Automated workflow notifications",
            ],
        },
        architecture: {
            title: "System Design",
            summary: "Mobile-first architecture with real-time sync capabilities.",
            content: [
                "React Native mobile app for iOS and Android",
                "Node.js REST API with Express",
                "Couchbase NoSQL for flexible data modeling",
                "WebSocket for real-time updates",
                "Role-based access control (RBAC)",
            ],
            bullets: [
                "Offline-first mobile architecture",
                "Real-time WebSocket connections",
                "Scalable NoSQL data model",
            ],
        },
        stack: {
            title: "Technology Stack",
            summary: "Modern cross-platform mobile stack.",
            content: [
                "React Native for cross-platform mobile",
                "Node.js backend with Express",
                "Couchbase mobile database",
                "WebSocket for real-time sync",
                "Redux for state management",
            ],
            bullets: [
                "TypeScript throughout",
                "Docker containerized backend",
                "CI/CD with GitHub Actions",
            ],
        },
    },
    {
        slug: "crowdfunding-dapp",
        title: "Crowdfunding DAPP",
        tagline: "Decentralized fundraising with smart contract escrow.",
        image: "/CrowdFundingDapp.png",
        gradient: "from-purple-500/40 to-pink-500/40",
        techStackSummary: "Solidity, React, Web3.js",
        problem: {
            title: "Problem & Outcome",
            summary: "Traditional crowdfunding had high fees and slow payment processing.",
            content: [
                "Traditional crowdfunding had high fees (12-15%)",
                "Lack of transparency in fund usage",
                "Slow payment processing (5-10 days)",
            ],
            bullets: [
                "Reduced fees to 3% via blockchain",
                "Instant settlements and full transparency",
                "Smart contract escrow protection",
            ],
        },
        architecture: {
            title: "System Design",
            summary: "Decentralized architecture with smart contract integration.",
            content: [
                "Solidity smart contracts on Ethereum",
                "React frontend with Web3.js integration",
                "IPFS for decentralized file storage",
                "MetaMask wallet integration",
                "Oracle integration for price feeds",
            ],
            bullets: [
                "Fully decentralized and transparent",
                "Automated fund distribution",
                "Real-time campaign tracking",
            ],
        },
        stack: {
            title: "Technology Stack",
            summary: "Full-stack Web3 development.",
            content: [
                "Solidity smart contracts",
                "React with TypeScript",
                "ethers.js for blockchain interaction",
                "IPFS for storage",
                "Hardhat for testing",
            ],
            bullets: [
                "OpenZeppelin security libraries",
                "Comprehensive test coverage",
                "Gas-optimized contracts",
            ],
        },
    },
    {
        slug: "ai-devops-workflow",
        title: "AI Automation DevOps Workflow",
        tagline: "Multi-tenant workflow automation for enterprise DevOps teams.",
        image: "/AIAutomation.png",
        gradient: "from-cyan-500/40 to-purple-500/40",
        techStackSummary: "n8n automations",
        problem: {
            title: "Problem & Outcome",
            summary: "Manual deployments caused 60% of downtime incidents.",
            content: [
                "Manual deployments caused 60% of downtime incidents",
                "No standardized CI/CD across teams",
                "Slow incident response times (4+ hours)",
            ],
            bullets: [
                "90% reduction in deployment-related incidents",
                "Incident response now under 15 minutes",
                "Automated rollback capabilities",
            ],
        },
        architecture: {
            title: "System Design",
            summary: "Event-driven automation architecture.",
            content: [
                "n8n for workflow orchestration",
                "Python scripts for AI processing",
                "Docker containerization",
                "GitHub Actions for CI/CD",
                "Slack/Teams integrations for alerts",
            ],
            bullets: [
                "Event-driven triggers",
                "Multi-cloud deployment support",
                "Comprehensive audit logging",
            ],
        },
        stack: {
            title: "Technology Stack",
            summary: "Enterprise automation tooling.",
            content: [
                "n8n workflow automation",
                "Python for AI/ML scripts",
                "Docker and Kubernetes",
                "GitHub Actions CI/CD",
                "Prometheus and Grafana monitoring",
            ],
            bullets: [
                "Self-hosted or cloud deployment",
                "50+ pre-built integrations",
                "Custom webhook support",
            ],
        },
    },
]
