import RevealOnScroll from '../RevealOnScroll';

export default function AboutSection() {
    return (
        <section className="py-24 px-6 border-t border-brand-border dark:border-white/10" id="about">
            <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-start">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">About</h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                        Most AI projects die between the notebook and production. I work in that gap.
                    </p>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                        At Koidra, I build physics-informed models that control real greenhouses — where a wrong prediction 
                        means wasted water or stressed crops. At A-Star, I architected multi-agent platforms that needed to 
                        handle real money and real latency constraints. At BKAI, I research agentic memory architectures 
                        because LLMs that forget everything between turns are not useful agents.
                    </p>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        The common thread: models that need to be reliable, fast, and grounded in domain constraints. 
                        Not demos. Systems.
                    </p>
                </div>

                <div className="flex md:flex-col gap-8 md:gap-6 md:pt-12">
                    <RevealOnScroll>
                        <div className="border-l-2 border-brand-blue dark:border-blue-500 pl-5">
                            <div className="text-3xl md:text-4xl font-extrabold text-brand-blue dark:text-blue-500">3</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium mt-1">AI Systems in Production</div>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll delay={1}>
                        <div className="border-l-2 border-brand-blue dark:border-blue-500 pl-5">
                            <div className="text-3xl md:text-4xl font-extrabold text-brand-blue dark:text-blue-500">3</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium mt-1">Companies — Startup to Research Lab</div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}
