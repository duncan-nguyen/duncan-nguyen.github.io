import { Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import avtImg from '../../../public/images/avt.jpg';

export default function HeroSection() {
    return (
        <section className="pt-28 pb-20 md:pt-36 md:pb-28 px-6" id="hero">
            <div className="max-w-6xl mx-auto">
                <div className="asymmetric-grid">
                    <div>
                        <h1 className="text-5xl md:text-7xl mb-6 leading-[1] hero-animate hero-delay-1 tracking-tight">
                            <span className="font-extrabold">NGUYEN <br /> QUANG DUNG</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg mb-8 leading-relaxed hero-animate hero-delay-2">
                            AI engineer building systems that run in the real world — not just in notebooks. 
                            Currently at <span className="text-brand-charcoal dark:text-white font-medium">Koidra AI</span>, 
                            where physics constraints meet real-time greenhouse control.
                        </p>
                        <div className="flex flex-wrap items-center gap-5 hero-animate hero-delay-3">
                            <Link href="#experience" className="primary-button px-7 py-3.5 font-semibold shadow-md hover:shadow-xl hover:shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                                See my work
                            </Link>
                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-charcoal dark:text-white font-semibold border-b-2 border-brand-charcoal dark:border-white pb-0.5 hover:text-brand-blue dark:hover:text-blue-400 dark:hover:border-blue-400 transition-all">
                                <Download className="w-4 h-4" />
                                Download CV
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 md:mt-0 flex justify-center md:justify-end">
                        <div className="relative">
                            <div className="absolute -top-3 -right-3 w-full h-full border border-brand-blue/15 -z-10 rounded-2xl"></div>
                            <Image
                                alt="Portrait of Nguyen Quang Dung"
                                className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
                                src={avtImg}
                                priority
                                width={384}
                                height={384}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
