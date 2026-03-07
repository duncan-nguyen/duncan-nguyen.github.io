'use client';

import type { TocItem } from '@/lib/blog';
import { useEffect, useMemo, useState } from 'react';

interface TableOfContentsProps {
    items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState('');

    const ids = useMemo(() => items.map((item) => item.id), [items]);

    useEffect(() => {
        if (ids.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]?.target.id) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: '-30% 0px -60% 0px',
                threshold: [0, 1],
            }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids]);

    if (items.length === 0) return null;

    return (
        <aside className="border border-brand-border dark:border-white/10 p-4 bg-white dark:bg-[#1a1a1a] lg:sticky lg:top-28">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">On this page</p>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={`${item.id}-${item.level}`} className={item.level === 3 ? 'pl-4' : ''}>
                        <a
                            href={`#${item.id}`}
                            className={`text-sm transition-colors ${activeId === item.id ? 'text-brand-blue dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-blue-400'}`}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
