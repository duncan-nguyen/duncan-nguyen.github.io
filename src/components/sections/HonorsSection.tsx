import { education, honors } from '@/data/honors';

export default function HonorsSection() {
    return (
        <section className="py-24 px-6 border-b border-brand-border dark:border-white/10">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-14 tracking-tight">Honors &amp; Awards</h2>
                <div className="grid md:grid-cols-2 gap-x-20 gap-y-0 mb-20">
                    {honors.map((honor, idx) => (
                        <div key={idx} className="honor-item flex justify-between items-start border-b border-brand-border dark:border-white/10 py-5">
                            <div>
                                <h4 className="font-bold text-base">{honor.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{honor.description}</p>
                            </div>
                            {honor.year && <span className="text-sm font-medium text-gray-400 dark:text-gray-500 shrink-0 ml-4">{honor.year}</span>}
                        </div>
                    ))}
                </div>

                <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">Education</h2>
                    <div className="space-y-0">
                        {education.map((edu, idx) => (
                            <div key={idx} className="border-b border-brand-border dark:border-white/10 py-5">
                                <h4 className="font-bold text-base">{edu.school}</h4>
                                <p className="text-brand-blue dark:text-blue-400 font-medium text-sm mt-0.5">{edu.degree}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{edu.period}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
