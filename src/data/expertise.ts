export interface ExpertiseCategory {
    title: string;
    description: string;
    skills: string[];
}

export const expertiseCategories: ExpertiseCategory[] = [
    {
        title: "Languages",
        description: "Daily drivers for data pipelines, training scripts, and production services.",
        skills: ["Python", "SQL", "Bash/Shell"]
    },
    {
        title: "AI/ML Domains",
        description: "Core research areas — from agentic architectures to physics-constrained models.",
        skills: ["Agentic Memory", "GraphRAG", "Multi-Agent Systems", "PINNs", "NLP", "Knowledge Graphs"]
    },
    {
        title: "Frameworks & Libraries",
        description: "The stack that turns research code into deployable systems.",
        skills: ["PyTorch", "Hugging Face", "LangChain/LangGraph", "OpenAI API", "MCP"]
    },
    {
        title: "MLOps & Engineering",
        description: "Infrastructure for reliable model serving, monitoring, and iteration.",
        skills: ["Docker", "Git", "CI/CD", "FastAPI", "RESTful APIs", "VectorDB", "MongoDB"]
    }
];
