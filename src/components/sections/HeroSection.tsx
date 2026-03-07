import Image from 'next/image';
import Link from 'next/link';
import avtImg from '../../../public/images/avt.jpg';

export default function HeroSection() {
    return (
        <section className="py-20 md:py-32 px-6" id="hero">
            <div className="max-w-6xl mx-auto">
                <div className="asymmetric-grid">
                    <div>
                        <span className="text-brand-blue font-semibold tracking-widest uppercase text-sm mb-4 block hero-animate hero-delay-1">
                            AI/ML Engineer
                        </span>
                        <h1 className="text-6xl md:text-8xl mb-8 leading-[0.95] hero-animate hero-delay-2">
                            <span className="font-extrabold">NGUYEN <br /> QUANG DUNG</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl mb-10 font-light hero-animate hero-delay-3">
                            Specializing in <span className="text-brand-charcoal dark:text-white font-medium">Agentic AI</span>,{' '}
                            <span className="text-brand-charcoal dark:text-white font-medium">LLM/SLM Fine-tuning</span>, and{' '}
                            <span className="text-brand-charcoal dark:text-white font-medium">Physics-Informed ML</span>.
                            Building intelligent systems for complex industrial and linguistic challenges.
                        </p>
                        <div className="flex items-center gap-6 hero-animate hero-delay-4">
                            <Link href="#contact" className="primary-button relative overflow-hidden group px-8 py-4 font-semibold shadow-md hover:shadow-xl hover:shadow-brand-blue/20 transition-all duration-300">
                                <span className="relative z-10">Contact Me</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/0 via-white/20 to-brand-blue/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            </Link>
                            <Link href="#experience" className="text-brand-charcoal dark:text-white font-semibold border-b-2 border-brand-charcoal dark:border-white pb-1 hover:text-brand-blue dark:hover:text-blue-400 dark:hover:border-blue-400 transition-all">
                                View Work
                            </Link>
                        </div>
                    </div>
                    <div className="mt-12 md:mt-0 flex justify-center md:justify-end">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue/30 to-blue-400/30 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="absolute -top-4 -right-4 w-full h-full border border-brand-blue/20 -z-10 rounded-lg"></div>
                            <Image
                                alt="Professional portrait of Nguyen Quang Dung"
                                className="w-80 h-80 md:w-96 md:h-96 object-cover transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:shadow-[0_20px_50px_rgba(0,100,250,0.15)] rounded-xl"
                                src={avtImg}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
