import { expertiseCategories } from '@/data/expertise';

export default function ExpertiseSection() {
    return (
        <section className="py-16 bg-brand-charcoal dark:bg-black text-white px-6" id="expertise">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">Technical Expertise</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    {expertiseCategories.map((category) => (
                        <div key={category.title} className="border-l-2 border-brand-blue/40 pl-5">
                            <h4 className="text-brand-blue dark:text-blue-400 uppercase tracking-widest text-[11px] font-bold mb-3">
                                {category.title}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {category.skills.map((skill) => (
                                    <span key={skill} className="pill-tag-dark">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
