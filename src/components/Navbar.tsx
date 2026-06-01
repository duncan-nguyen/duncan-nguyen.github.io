'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    // Scroll state — single throttled listener via rAF
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active section tracking — IntersectionObserver
    useEffect(() => {
        if (pathname !== '/') {
            setActiveSection('');
            return;
        }

        const sections = document.querySelectorAll<HTMLElement>('section[id], footer[id]');
        const visible = new Set<string>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute('id');
                    if (!id) return;
                    if (entry.isIntersecting) {
                        visible.add(id);
                    } else {
                        visible.delete(id);
                    }
                });
                // Pick the first visible section in DOM order
                for (const section of sections) {
                    const id = section.getAttribute('id');
                    if (id && visible.has(id)) {
                        setActiveSection(id);
                        return;
                    }
                }
            },
            { rootMargin: '-100px 0px -50% 0px', threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'clip' : '';
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav id="navbar"
                className={`fixed top-0 w-full bg-white/70 dark:bg-dm-bg/70 backdrop-blur-xl z-50 border-b border-brand-border dark:border-white/10 transition-all duration-300 ${scrolled ? 'nav-scrolled dark:shadow-none py-0' : 'py-2'} ${menuOpen ? 'menu-open' : ''}`}
            >
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center transition-all duration-300 relative">
                    <div className="hidden md:flex gap-7 text-[13px] font-medium tracking-wide uppercase items-center mx-auto">
                        <Link className={`nav-link dark:text-gray-300 ${activeSection === 'about' ? 'active' : ''}`} href="/#about">About</Link>
                        <Link className={`nav-link dark:text-gray-300 ${activeSection === 'experience' ? 'active' : ''}`} href="/#experience">Experience</Link>
                        <Link className={`nav-link dark:text-gray-300 ${activeSection === 'expertise' ? 'active' : ''}`} href="/#expertise">Expertise</Link>
                        <Link className={`nav-link dark:text-gray-300 ${pathname.startsWith('/blog') ? 'active' : ''}`} href="/blog/">Blog</Link>
                        <Link className={`nav-link dark:text-gray-300 ${activeSection === 'contact' ? 'active' : ''}`} href="/#contact">Contact</Link>
                    </div>
                    <div className="hidden md:block absolute right-6">
                        <ThemeToggle />
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button onClick={toggleMenu} aria-label="Toggle menu" className="flex flex-col gap-1.5 p-2 relative z-[100]">
                            <span id="bar1" className="block w-6 h-0.5 bg-brand-charcoal dark:bg-white transition-all duration-300"></span>
                            <span id="bar2" className="block w-6 h-0.5 bg-brand-charcoal dark:bg-white transition-all duration-300"></span>
                            <span id="bar3" className="block w-6 h-0.5 bg-brand-charcoal dark:bg-white transition-all duration-300"></span>
                        </button>
                    </div>
                </div>
            </nav>

            <MobileMenu isOpen={menuOpen} onClose={closeMenu} currentPath={pathname} activeSection={activeSection} />
        </>
    );
}
