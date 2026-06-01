import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-20 px-6 bg-brand-dark text-white" id="contact">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Let's build something that ships.</h2>
                <p className="text-gray-400 mb-10 text-sm md:text-base">Looking for AI engineering roles where models face real constraints — latency, reliability, and domain physics. Open to remote or Hanoi-based.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 mb-14">
                    <a className="text-base md:text-lg font-bold hover:text-brand-blue transition-colors duration-200 inline-flex items-center gap-2"
                        href="mailto:nqdung.work@gmail.com">
                        <Mail className="w-4 h-4" />
                        Email
                    </a>
                    <a className="text-base md:text-lg font-bold hover:text-brand-blue transition-colors duration-200 inline-flex items-center gap-2"
                        href="https://linkedin.com/in/-duncan-nguyen" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                    </a>
                    <a className="text-base md:text-lg font-bold hover:text-brand-blue transition-colors duration-200 inline-flex items-center gap-2"
                        href="https://github.com/duncan-nguyen" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        GitHub
                    </a>
                </div>
                <div className="pt-8 border-t border-white/10 text-[11px] uppercase tracking-widest text-gray-500">
                    &copy; {new Date().getFullYear()} NGUYEN QUANG DUNG. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
}
