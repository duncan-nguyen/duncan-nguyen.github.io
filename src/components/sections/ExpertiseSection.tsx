import { expertiseCategories } from '@/data/expertise';
import RevealOnScroll from '../RevealOnScroll';

export default function ExpertiseSection() {
    return (
        <section className="py-24 bg-brand-charcoal text-white px-6" id="expertise">
            <div className="max-w-6xl mx-auto">
                <RevealOnScroll>
                    <h2 className="text-4xl font-bold mb-16">Technical Expertise</h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {expertiseCategories.map((category, idx) => (
                        <RevealOnScroll key={category.title} delay={(idx + 1) as 1 | 2 | 3 | 4}>
                            <h4 className="text-brand-blue uppercase tracking-widest text-xs font-bold mb-6">
                                {category.title}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span key={skill} className="pill-tag-dark">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
