export interface Experience {
    id: string;
    period: string;
    company: string;
    role: string;
    location: string;
    achievements: (string | { text: string; strong?: boolean })[];
}

export const experiences: Experience[] = [
    {
        id: "koidra",
        period: "Nov 2025 — Present",
        company: "Koidra AI",
        role: "AI Engineer",
        location: "Remote",
        achievements: [
            "Designed a hybrid control system that combines PID controllers with gradient-based anomaly detection for greenhouse climate regulation — processing sensor data in real-time to automatically adjust ventilation, irrigation, and heating.",
            { strong: true, text: "Automated temperature/humidity regulation across production greenhouses, replacing manual monitoring with continuous sensor-driven control and adaptive thresholds." },
            "Refactored the core control module with State Machine patterns — eliminating race conditions between control loops and making the system easier to maintain and extend.",
            "Developed a Physics-Informed ML model for transpiration dynamics that encodes thermodynamic constraints directly into the loss function — producing physically consistent predictions that pure data-driven models could not achieve."
        ]
    },
    {
        id: "astar",
        period: "Feb 2025 — Mar 2026",
        company: "A-Star Group",
        role: "AI Engineer (Promoted from Intern)",
        location: "Ha Noi, Vietnam",
        achievements: [
            { strong: true, text: "Led technical R&D for Web3 AI initiatives — translating ambiguous business requirements into production architecture, managing the full cycle from feasibility research to deployment." },
            "Architected a Web3 Multi-Agent Platform using MCP (Model Context Protocol) — building the core engine for automated yield optimization that became the flagship product's primary differentiator.",
            "Built a crypto-wallet classification microservice with FastAPI — handling the full ML lifecycle from data curation and labeling to model training and production inference.",
            "Implemented RAG and NER pipelines for blockchain data — grounding LLM responses in verified on-chain data to reduce hallucination on domain-specific queries."
        ]
    },
    {
        id: "bkai",
        period: "May 2024 — Nov 2025",
        company: "NLP Lab — BKAI (HUST)",
        role: "Undergraduate Research Assistant",
        location: "Hanoi, Vietnam",
        achievements: [
            "Designed Agentic Memory architectures for LLM agents — implementing persistent context storage and retrieval mechanisms that enabled multi-turn reasoning across complex task flows without prompt bloat.",
            "Developed LLM distillation pipelines that compress large teacher models into compact students — reducing inference cost while retaining task performance on domain benchmarks.",
            "Built a reasoning evaluation framework for analyzing chain-of-thought strategies — identifying systematic failure modes in CoT prompting that inform better prompt engineering practices."
        ]
    }
];
