'use client';

import Link from 'next/link';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    currentPath: string;
}

export default function MobileMenu({ isOpen, onClose, currentPath }: MobileMenuProps) {
    return (
        <>
            <div
                className={`mobile-menu fixed inset-y-0 right-0 w-72 bg-white dark:bg-[#121212] z-[60] shadow-2xl flex flex-col pt-24 px-8 gap-6 md:hidden ${isOpen ? 'open' : ''}`}
            >
                <Link className="text-2xl font-bold hover:text-brand-blue transition-colors" href="/#about" onClick={onClose}>About</Link>
                <Link className="text-2xl font-bold hover:text-brand-blue transition-colors" href="/#experience" onClick={onClose}>Experience</Link>
                <Link className="text-2xl font-bold hover:text-brand-blue transition-colors" href="/#research" onClick={onClose}>Research</Link>
                <Link className="text-2xl font-bold hover:text-brand-blue transition-colors" href="/#expertise" onClick={onClose}>Expertise</Link>
                <Link className={`text-2xl font-bold transition-colors ${currentPath.startsWith('/blog') ? 'text-brand-blue' : 'hover:text-brand-blue'}`} href="/blog/" onClick={onClose}>Blog</Link>
                <Link className="text-2xl font-bold hover:text-brand-blue transition-colors" href="/#contact" onClick={onClose}>Contact</Link>
            </div>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 z-[55] md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                onClick={onClose}
            />
        </>
    );
}
