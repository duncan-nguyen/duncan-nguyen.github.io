'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type BlogListItem = {
    slug: string;
    title: string;
    date: string;
    description?: string;
    tags?: string[];
    readingTimeMinutes: number;
};

type TagCount = {
    tag: string;
    count: number;
};

interface BlogListClientProps {
    posts: BlogListItem[];
    tags: TagCount[];
    initialTag?: string;
    pageSize?: number;
}

export default function BlogListClient({
    posts,
    tags,
    initialTag = '',
    pageSize = 6,
}: BlogListClientProps) {
    const [query, setQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState(initialTag);
    const [page, setPage] = useState(1);

    const filteredPosts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return posts.filter((post) => {
            const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
            if (!normalizedQuery) {
                return matchesTag;
            }

            const haystack = [
                post.title,
                post.description || '',
                ...(post.tags || []),
            ]
                .join(' ')
                .toLowerCase();

            return matchesTag && haystack.includes(normalizedQuery);
        });
    }, [posts, query, selectedTag]);

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;
    const pagedPosts = filteredPosts.slice(start, start + pageSize);

    const handleTagChange = (tag: string) => {
        setSelectedTag((prev) => (prev === tag ? '' : tag));
        setPage(1);
    };

    const handleQueryChange = (value: string) => {
        setQuery(value);
        setPage(1);
    };

    return (
        <div className="space-y-8">
            <div className="border border-brand-border bg-white p-5 md:p-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                    <label htmlFor="blog-search" className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                        Search articles
                    </label>
                    <span className="text-sm text-gray-500">{filteredPosts.length} results</span>
                </div>
                <input
                    id="blog-search"
                    type="text"
                    placeholder="Search by title, tag, or summary"
                    value={query}
                    onChange={(event) => handleQueryChange(event.target.value)}
                    className="w-full border border-brand-border px-4 py-3 text-sm focus:outline-none focus:border-brand-blue"
                />
                <div className="flex flex-wrap gap-2">
                    {tags.map(({ tag, count }) => {
                        const active = selectedTag === tag;
                        return (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => handleTagChange(tag)}
                                className={`pill-tag ${active ? 'border-brand-blue text-brand-blue' : ''}`}
                            >
                                {tag} ({count})
                            </button>
                        );
                    })}
                    {(selectedTag || query) && (
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedTag('');
                                setQuery('');
                                setPage(1);
                            }}
                            className="pill-tag"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            {pagedPosts.length > 0 ? (
                <>
                    <div className="space-y-6">
                        {pagedPosts.map((meta) => (
                            <article
                                key={meta.slug}
                                className="blog-card border border-brand-border hover:border-brand-blue p-8 bg-white"
                            >
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <time className="text-sm text-gray-400 font-medium">
                                        {meta.date ? format(new Date(meta.date), 'MMMM d, yyyy') : ''}
                                    </time>
                                    <span className="text-sm text-gray-400">{meta.readingTimeMinutes} min read</span>
                                    {meta.tags?.map((tag) => (
                                        <Link
                                            key={`${meta.slug}-${tag}`}
                                            href={`/blog/tags/${encodeURIComponent(tag)}/`}
                                            onClick={(event) => event.stopPropagation()}
                                            className="pill-tag"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                                <h2 className="text-2xl font-bold mb-3 transition-colors hover:text-brand-blue">
                                    <Link href={`/blog/${meta.slug}/`}>{meta.title}</Link>
                                </h2>
                                <p className="text-gray-600 mb-4">{meta.description}</p>
                                <Link href={`/blog/${meta.slug}/`} className="text-brand-blue font-semibold text-sm uppercase tracking-wider">
                                    Read more →
                                </Link>
                            </article>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
                            <button
                                type="button"
                                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                                disabled={safePage === 1}
                                className="px-4 py-2 border border-brand-border text-sm disabled:opacity-40"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600 px-2">Page {safePage} of {totalPages}</span>
                            <button
                                type="button"
                                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={safePage === totalPages}
                                className="px-4 py-2 border border-brand-border text-sm disabled:opacity-40"
                            >
                                Next
                            </button>
                        </nav>
                    )}
                </>
            ) : (
                <div className="text-center py-16 border border-brand-border bg-white">
                    <p className="text-gray-500">No posts matched your filters.</p>
                </div>
            )}
        </div>
    );
}
