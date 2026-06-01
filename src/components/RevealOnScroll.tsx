'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: 1 | 2 | 3 | 4;
}

export default function RevealOnScroll({ children, className = '', delay }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            el.classList.add('visible');
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const delayClass = delay ? `reveal-delay-${delay}` : '';

    return (
        <div ref={ref} className={`reveal ${delayClass} ${className}`}>
            {children}
        </div>
    );
}
