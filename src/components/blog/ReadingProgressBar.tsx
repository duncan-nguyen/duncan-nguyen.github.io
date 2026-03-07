'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement;
            const scrollTop = doc.scrollTop;
            const scrollHeight = doc.scrollHeight - doc.clientHeight;
            const nextProgress = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0;
            setProgress(nextProgress);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="fixed top-20 left-0 z-40 h-1 w-full bg-transparent" aria-hidden="true">
            <div className="h-full bg-brand-blue transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
    );
}
