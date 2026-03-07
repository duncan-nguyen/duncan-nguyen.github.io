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
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Optional: stop observing once revealed
                        // observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const delayClass = delay ? `reveal-delay-${delay}` : '';

    return (
        <div ref={ref} className={`reveal ${delayClass} ${className}`}>
            {children}
        </div>
    );
}
