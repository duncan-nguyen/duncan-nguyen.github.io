'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    currentPath: string;
    activeSection: string;
}

export default function MobileMenu({ isOpen, onClose, currentPath, activeSection }: MobileMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const menu = menuRef.current;
        if (!menu) return;

        const focusable = menu.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        // Focus first item on open
        first?.focus();

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleTab);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleTab);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    const isActive = (id: string) => activeSection === id ? 'text-brand-blue' : 'hover:text-brand-blue';

    return (
        <>
            <div
                ref={menuRef}
                className={`mobile-menu fixed inset-y-0 right-0 w-72 bg-white dark:bg-dm-bg z-[60] shadow-2xl flex flex-col pt-24 px-8 gap-6 md:hidden ${isOpen ? 'open' : ''}`}
            >
                <Link className={`text-2xl font-bold transition-colors ${isActive('about')}`} href="/#about" onClick={onClose}>About</Link>
                <Link className={`text-2xl font-bold transition-colors ${isActive('experience')}`} href="/#experience" onClick={onClose}>Experience</Link>
                <Link className={`text-2xl font-bold transition-colors ${isActive('expertise')}`} href="/#expertise" onClick={onClose}>Expertise</Link>
                <Link className={`text-2xl font-bold transition-colors ${currentPath.startsWith('/blog') ? 'text-brand-blue' : 'hover:text-brand-blue'}`} href="/blog/" onClick={onClose}>Blog</Link>
                <Link className={`text-2xl font-bold transition-colors ${isActive('contact')}`} href="/#contact" onClick={onClose}>Contact</Link>
            </div>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 z-[55] md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                onClick={onClose}
            />
        </>
    );
}
