export interface Honor {
    title: string;
    description: string;
    year?: string;
}

export const honors: Honor[] = [
    {
        title: "Silver Medal",
        description: "National Physics Olympiad (VPhO)",
    },
    {
        title: "Top 6 Globally",
        description: "Trustworthy NeuroSymbolic & XAI Workshop @ IJCNN 2025",
        year: "2025"
    },
    {
        title: "Top 5 Finalist",
        description: "DataFlow 2025 — National Data Analysis Hackathon",
        year: "2025"
    }
];

export const education = [
    {
        school: "Hanoi University of Science and Technology (HUST)",
        degree: "B.Sc. in Computer Science",
        period: "2023 — Present"
    }
];
