'use client';

import { useEffect, useRef } from 'react';

const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO || '';
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '';
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'General';
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '';

export default function GiscusComments() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isConfigured = Boolean(GISCUS_REPO && GISCUS_REPO_ID && GISCUS_CATEGORY_ID);

    useEffect(() => {
        if (!isConfigured) return;
        if (!containerRef.current) return;
        if (containerRef.current.querySelector('iframe')) return;

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.async = true;
        script.crossOrigin = 'anonymous';

        script.setAttribute('data-repo', GISCUS_REPO);
        script.setAttribute('data-repo-id', GISCUS_REPO_ID);
        script.setAttribute('data-category', GISCUS_CATEGORY);
        script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', 'light');
        script.setAttribute('data-lang', 'en');
        script.setAttribute('data-loading', 'lazy');

        containerRef.current.appendChild(script);
    }, [isConfigured]);

    return (
        <section className="border-t border-brand-border pt-10 mt-10">
            <h2 className="text-2xl font-bold mb-3">Comments</h2>
            <p className="text-sm text-gray-500 mb-6">Join the discussion via GitHub Discussions.</p>
            {isConfigured ? (
                <div ref={containerRef} />
            ) : (
                <p className="text-sm text-gray-500">
                    Configure Giscus with `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`, and
                    `NEXT_PUBLIC_GISCUS_CATEGORY_ID` to enable comments.
                </p>
            )}
        </section>
    );
}
