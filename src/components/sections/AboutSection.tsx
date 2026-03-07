import RevealOnScroll from '../RevealOnScroll';

export default function AboutSection() {
    return (
        <section className="py-20 px-6 border-t border-brand-border" id="about">
            <div className="max-w-6xl mx-auto">
                <RevealOnScroll className="grid md:grid-cols-3 gap-16">
                    <div className="md:col-span-2">
                        <h2 className="text-4xl font-bold mb-8">About</h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            Results-oriented AI/ML Engineer specializing in Agentic AI, Large/Small Language Models, and
                            Physics-Informed Machine Learning. Proven expertise in architecting scalable multi-agent
                            systems and deploying Small Language Models for domain-specific applications.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Proficient in integrating scientific constraints into neural networks through
                            Physics-Informed ML, enhancing model interpretability and performance in complex production
                            environments. Published researcher with work accepted at SOICT 2025.
                        </p>
                    </div>
                    <div className="flex flex-col gap-8 justify-center">
                        <div className="border-l-2 border-brand-blue pl-6">
                            <div className="text-4xl font-extrabold text-brand-blue">3+</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider font-medium mt-1">Professional Roles</div>
                        </div>
                        <div className="border-l-2 border-brand-blue pl-6">
                            <div className="text-4xl font-extrabold text-brand-blue">1</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider font-medium mt-1">First-Author Publication</div>
                        </div>
                        <div className="border-l-2 border-brand-blue pl-6">
                            <div className="text-4xl font-extrabold text-brand-blue">Top 6</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider font-medium mt-1">Globally @ IJCNN 2025</div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
