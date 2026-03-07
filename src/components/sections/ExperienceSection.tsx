import { experiences } from '@/data/experience';
import RevealOnScroll from '../RevealOnScroll';

export default function ExperienceSection() {
    return (
        <section className="py-24 bg-brand-softGray px-6" id="experience">
            <div className="max-w-6xl mx-auto">
                <RevealOnScroll>
                    <h2 className="text-4xl font-bold mb-16">Professional Experience</h2>
                </RevealOnScroll>

                <div className="space-y-16">
                    {experiences.map((exp) => (
                        <RevealOnScroll key={exp.id} className="grid md:grid-cols-4 gap-4">
                            <div className="text-gray-400 font-medium">{exp.period}</div>
                            <div className="md:col-span-3">
                                <h3 className="text-2xl font-bold mb-1">{exp.company}</h3>
                                <p className="text-brand-blue font-semibold mb-4 uppercase tracking-wider text-xs">
                                    {exp.role} · {exp.location}
                                </p>
                                <ul className="space-y-3 text-gray-700 list-disc list-inside">
                                    {exp.achievements.map((acc, index) => {
                                        if (typeof acc === 'string') {
                                            return <li key={index}>{acc}</li>;
                                        } else {
                                            return (
                                                <li key={index}>
                                                    <strong>{acc.text.split(':')[0]}:</strong>{acc.text.split(':')[1]}
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
