'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);

            // Active link logic for homepage sections
            if (pathname === '/') {
                const sections = document.querySelectorAll('section[id], footer[id]');
                let current = '';
                sections.forEach((section) => {
                    const sectionTop = (section as HTMLElement).offsetTop - 100;
                    if (window.scrollY >= sectionTop) {
                        current = section.getAttribute('id') || '';
                    }
                });

                document.querySelectorAll('.nav-link').forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `/#${current}`) {
                        link.classList.add('active');
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav id="navbar"
                className={`fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-brand-border transition-shadow duration-300 ${scrolled ? 'nav-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
            >
                <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                    <Link href="/#hero" className="group flex items-center gap-2.5 transition-colors">
                        <span
                            className="w-9 h-9 border-2 border-brand-charcoal group-hover:border-brand-blue group-hover:bg-brand-blue flex items-center justify-center transition-all duration-300 select-none"
                            style={{ fontFamily: 'var(--font-cormorant), serif', letterSpacing: '0.02em' }}
                        >
                            <span className="text-brand-charcoal transition-colors duration-300 text-xs group-hover:text-white">N</span>
                            <span className="text-brand-blue transition-colors duration-300 text-base leading-none group-hover:text-white">Q</span>
                            <span className="text-brand-charcoal transition-colors duration-300 text-xs group-hover:text-white">D</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase">
                        <Link className="nav-link" href="/#about">About</Link>
                        <Link className="nav-link" href="/#experience">Experience</Link>
                        <Link className="nav-link" href="/#research">Research</Link>
                        <Link className="nav-link" href="/#expertise">Expertise</Link>
                        <Link className={`nav-link ${pathname.startsWith('/blog') ? 'active' : ''}`} href="/blog/">Blog</Link>
                        <Link className="nav-link" href="/#contact">Contact</Link>
                    </div>

                    <button onClick={toggleMenu} aria-label="Toggle menu" className="md:hidden flex flex-col gap-1.5 p-2 relative z-[100]">
                        <span id="bar1" className="block w-6 h-0.5 bg-brand-charcoal transition-all duration-300"></span>
                        <span id="bar2" className="block w-6 h-0.5 bg-brand-charcoal transition-all duration-300"></span>
                        <span id="bar3" className="block w-6 h-0.5 bg-brand-charcoal transition-all duration-300"></span>
                    </button>
                </div>
            </nav>

            <MobileMenu isOpen={menuOpen} onClose={closeMenu} currentPath={pathname} />
        </>
    );
}
