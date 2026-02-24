export interface ProjectSection {
    title: string
    summary: string
    content: string[]
    bullets: string[]
    highlights?: string[]
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
            summary: "Manual student tracking consumed 40+ hours per week with no real-time visibility into student activities across the institution.",
            content: [
                "Staff spent over 40 hours weekly manually logging student attendance, behavior incidents, and academic progress in spreadsheets.",
                "Administrators had no visibility into student activities until end-of-week reports, missing critical intervention windows.",
                "Communication between teachers, counselors, and administrators relied on email chains and paper forms, causing delays in addressing student needs."
            ],
            bullets: [
                "85% reduction in administrative overhead through automated tracking",
                "Real-time dashboards give staff instant visibility into student activities",
                "Automated notifications route issues to the right staff within seconds"
            ],
            highlights: ["40+ hours saved weekly", "85% reduction", "real-time dashboards", "WebSocket"],
        },
        architecture: {
            title: "System Design",
            summary: "Mobile-first architecture with real-time sync enables staff to update and view student data instantly from any device.",
            content: [
                "React Native powers both iOS and Android apps with a shared codebase, allowing staff to work offline and sync when connectivity is available.",
                "Node.js REST API handles authentication, data validation, and business logic while exposing WebSocket endpoints for real-time updates.",
                "Couchbase NoSQL was chosen for its mobile-first sync capabilities, enabling seamless data replication between the mobile clients and central database.",
                "WebSocket connections push instant updates to dashboards and notify staff when new incidents are logged or require attention."
            ],
            bullets: [
                "Offline-first mobile architecture handles intermittent connectivity in schools",
                "Real-time WebSocket connections update all connected clients within 100ms",
                "Scalable NoSQL data model adapts to changing institutional requirements"
            ],
            highlights: ["React Native", "Couchbase", "offline-first", "100ms updates"],
        },
        stack: {
            title: "Technology Stack",
            summary: "Modern cross-platform mobile stack chosen for developer productivity and performance.",
            content: [
                "React Native enables single codebase deployment to both iOS and Android while maintaining native performance for smooth scrolling and interactions.",
                "Node.js with Express provides a lightweight backend that scales horizontally as the user base grows.",
                "Couchbase Mobile embeds a NoSQL database directly in the app, syncing automatically with the server when online.",
                "WebSocket infrastructure maintains persistent connections for push notifications and live dashboard updates.",
                "Redux manages complex client state including offline queues and sync status across the application."
            ],
            bullets: [
                "TypeScript throughout ensures type safety from mobile client to backend API",
                "Docker containerizes the backend for consistent deployment across environments",
                "GitHub Actions CI/CD pipeline runs tests and deploys to staging automatically"
            ],
            highlights: ["React Native", "Node.js", "TypeScript", "Docker"],
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
            summary: "Traditional crowdfunding platforms charged 12-15% in fees while offering no transparency into how funds were actually used by campaign owners.",
            content: [
                "Campaign creators paid 12-15% of raised funds in platform fees, significantly reducing the actual capital available for their projects.",
                "Backers had no way to verify that funds were being used as promised, leading to distrust and lower participation in legitimate campaigns.",
                "Payment processing took 5-10 days to complete, creating cash flow problems for campaign owners who needed to begin work immediately."
            ],
            bullets: [
                "Reduced platform fees to 3% by eliminating middlemen through blockchain",
                "Smart contract escrow releases funds only when verified milestones are met",
                "Instant settlements eliminate payment delays and provide full transaction transparency"
            ],
            highlights: ["3% fees", "smart contract escrow", "instant settlements", "blockchain"],
        },
        architecture: {
            title: "System Design",
            summary: "Decentralized architecture places campaign logic in smart contracts while maintaining a responsive user interface.",
            content: [
                "Solidity smart contracts handle campaign creation, contribution processing, and automatic fund distribution based on milestone completions.",
                "React frontend connects to the Ethereum network via ethers.js, enabling users to interact with contracts directly from their browsers.",
                "IPFS stores campaign media and documentation in a decentralized manner, ensuring content remains available without relying on centralized servers.",
                "MetaMask integration provides secure wallet connections while the contract architecture supports future wallet compatibility."
            ],
            bullets: [
                "Fully decentralized system means no single point of failure or control",
                "Automated fund distribution releases money only when milestone conditions are verified",
                "Real-time on-chain tracking lets backers monitor campaign progress and fund movements"
            ],
            highlights: ["Solidity", "ethers.js", "IPFS", "MetaMask"],
        },
        stack: {
            title: "Technology Stack",
            summary: "Full-stack Web3 development leveraging battle-tested libraries for security and performance.",
            content: [
                "Solidity smart contracts implement the crowdfunding logic, written with gas efficiency and security as primary concerns.",
                "React with TypeScript provides type-safe frontend development while ethers.js bridges the gap to Ethereum contracts.",
                "IPFS node infrastructure stores campaign content in a distributed manner accessible from any connected peer.",
                "Hardhat serves as the development environment, enabling comprehensive testing against local Ethereum networks before mainnet deployment."
            ],
            bullets: [
                "OpenZeppelin libraries provide audited implementations of standard contract patterns",
                "Comprehensive test suites achieve 95% code coverage across all contract paths",
                "Gas-optimized contract functions reduce transaction costs for users"
            ],
            highlights: ["Solidity", "Hardhat", "OpenZeppelin", "95% coverage"],
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
            summary: "Manual deployment processes caused 60% of production incidents while response times averaged over 4 hours for critical issues.",
            content: [
                "Engineering teams relied on ad-hoc scripts and manual steps for deployments, resulting in inconsistent environments and frequent configuration drift.",
                "Each team built their own CI/CD pipelines from scratch, creating maintenance burden and knowledge silos across the organization.",
                "When incidents occurred, engineers spent hours manually tracing logs across multiple systems before identifying the root cause."
            ],
            bullets: [
                "90% reduction in deployment-related incidents through standardized automation",
                "Incident response time dropped from 4+ hours to under 15 minutes",
                "Automated rollback triggers within 30 seconds of detecting failures"
            ],
            highlights: ["90% reduction", "15 minute response", "automated rollback", "60% less incidents"],
        },
        architecture: {
            title: "System Design",
            summary: "Event-driven automation architecture orchestrates the entire deployment lifecycle from code commit to production monitoring.",
            content: [
                "n8n serves as the orchestration layer, connecting git repositories, build systems, cloud infrastructure, and monitoring tools into unified workflows.",
                "Python scripts handle AI-powered log analysis and anomaly detection, learning from historical incident patterns to predict potential failures.",
                "Docker containers package all services consistently, ensuring the same environment runs from local development through production.",
                "GitHub Actions pipelines trigger automatically on code changes, running tests, building containers, and deploying to the appropriate environment."
            ],
            bullets: [
                "Event-driven triggers fire workflows based on git events, schedule, or external webhooks",
                "Multi-cloud deployment support runs workloads across AWS, GCP, and Azure simultaneously",
                "Comprehensive audit logging records every action for compliance and debugging"
            ],
            highlights: ["n8n orchestration", "Python AI/ML", "multi-cloud", "event-driven"],
        },
        stack: {
            title: "Technology Stack",
            summary: "Enterprise automation tooling chosen for reliability, scalability, and integration flexibility.",
            content: [
                "n8n provides visual workflow design with over 500 pre-built integrations, connecting tools without custom code for common patterns.",
                "Python scripts power AI/ML capabilities including log aggregation, pattern matching, and automated remediation recommendations.",
                "Docker and Kubernetes containerize all services, enabling consistent deployments and easy horizontal scaling under load.",
                "GitHub Actions handles continuous integration with parallel test execution and production deployment triggers.",
                "Prometheus collects metrics while Grafana visualizes system health and alerts on anomalies."
            ],
            bullets: [
                "Self-hosted or cloud deployment options match existing infrastructure requirements",
                "50+ pre-built integrations cover the entire DevOps toolchain out of the box",
                "Custom webhook support enables integration with proprietary internal systems"
            ],
            highlights: ["n8n", "Python", "Kubernetes", "Prometheus + Grafana"],
        },
    },
]
