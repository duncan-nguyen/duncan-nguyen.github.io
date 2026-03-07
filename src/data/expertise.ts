export interface ExpertiseCategory {
    title: string;
    skills: string[];
}

export const expertiseCategories: ExpertiseCategory[] = [
    {
        title: "Languages",
        skills: ["Python", "SQL", "Bash/Shell"]
    },
    {
        title: "AI/ML Domains",
        skills: ["LLM/SLM Fine-tuning", "RAG", "Multi-Agent Systems", "PINNs", "NLP", "Knowledge Graphs"]
    },
    {
        title: "Frameworks & Libraries",
        skills: ["PyTorch", "Hugging Face", "LangChain/LangGraph", "OpenAI API", "MCP"]
    },
    {
        title: "MLOps & Engineering",
        skills: ["Docker", "Git", "CI/CD", "FastAPI", "RESTful APIs", "VectorDB", "MongoDB"]
    }
];
