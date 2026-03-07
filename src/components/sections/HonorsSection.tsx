import { education, honors } from '@/data/honors';
import RevealOnScroll from '../RevealOnScroll';

export default function HonorsSection() {
    return (
        <section className="py-24 px-6 border-b border-brand-border">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-20">
                    <RevealOnScroll>
                        <h2 className="text-4xl font-bold mb-12">Honors &amp; Awards</h2>
                        <ul className="space-y-8">
                            {honors.map((honor, idx) => (
                                <li key={idx} className="flex justify-between items-start border-b border-brand-border pb-6">
                                    <div>
                                        <h4 className="font-bold text-lg">{honor.title}</h4>
                                        <p className="text-gray-500">{honor.description}</p>
                                    </div>
                                    {honor.year && <span className="font-medium shrink-0 ml-4">{honor.year}</span>}
                                </li>
                            ))}
                        </ul>
                    </RevealOnScroll>

                    <RevealOnScroll delay={2}>
                        <h2 className="text-4xl font-bold mb-12">Education</h2>
                        <div className="space-y-8">
                            {education.map((edu, idx) => (
                                <div key={idx} className="border-b border-brand-border pb-6">
                                    <h4 className="font-bold text-lg">{edu.school}</h4>
                                    <p className="text-brand-blue font-medium mb-1">{edu.degree}</p>
                                    <p className="text-gray-500 text-sm">{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
