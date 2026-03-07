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
            "Engineered robust greenhouse control systems by integrating PID controllers with gradient-based anomaly detection, improving operational stability and reducing manual interventions.",
            "Refactored the core control module leveraging State Machine design patterns, enhancing system reliability and reducing code maintenance costs.",
            "Developed Physics-Informed ML model to model transpiration dynamics, outperforming baseline predictive accuracy by 90% while ensuring strict physical consistency."
        ]
    },
    {
        id: "astar",
        period: "Feb 2025 — Nov 2025",
        company: "A-Star Group",
        role: "AI Engineer (Promoted from Intern)",
        location: "Ha Noi, Vietnam",
        achievements: [
            { strong: true, text: "Startup Incubation & R&D: Spearheaded the technical R&D for Web3 AI initiatives, translating abstract business requirements into functional MVPs and scalable architectures for flagship portfolio products." },
            "Architected a Web3 Multi-Agent Platform using Model Context Protocol (MCP), successfully automating yield optimization strategies and serving as the core engine for a flagship product.",
            "Developed a crypto-wallet classification microservice with FastAPI, managing the full ML lifecycle from data curation to production inference.",
            "Implemented domain-specific RAG and NER pipelines tailored for blockchain data, reducing LLM hallucination rates and significantly improving autonomous agent reliability."
        ]
    },
    {
        id: "bkai",
        period: "May 2024 — Nov 2025",
        company: "NLP Lab — BKAI (HUST)",
        role: "Undergraduate Research Assistant",
        location: "Hanoi, Vietnam",
        achievements: [
            "Optimized pre-training and fine-tuning pipelines for Small Language Models, significantly enhancing Information Retrieval capabilities for low-resource domains.",
            "Standardized NLP workflows for NER and Text Classification, achieving substantial improvements in data processing efficiency and evaluation consistency."
        ]
    }
];
