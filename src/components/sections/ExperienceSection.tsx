import { experiences } from '@/data/experience';
import RevealOnScroll from '../RevealOnScroll';

export default function ExperienceSection() {
    return (
        <section className="py-24 bg-brand-softGray dark:bg-dm-subtle px-6" id="experience">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-14 tracking-tight">Professional Experience</h2>

                <div className="space-y-6">
                    {experiences.map((exp) => (
                        <RevealOnScroll key={exp.id}>
                            <div className="experience-item grid md:grid-cols-[140px_1fr] gap-3 md:gap-6">
                                <div className="text-sm text-gray-400 dark:text-gray-500 font-medium pt-0.5">{exp.period}</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-0.5">{exp.company}</h3>
                                    <p className="text-brand-blue dark:text-blue-400 font-semibold mb-3 text-xs uppercase tracking-wider">
                                        {exp.role} · {exp.location}
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                        {exp.achievements.map((acc, index) => {
                                            if (typeof acc === 'string') {
                                                return <li key={index} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-blue/30 dark:before:bg-blue-400/30">{acc}</li>;
                                            } else {
                                                return (
                                                    <li key={index} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-blue dark:before:bg-blue-400">
                                                        <strong className="font-semibold text-brand-charcoal dark:text-white">{acc.text.split(':')[0]}:</strong>{acc.text.split(':')[1]}
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
