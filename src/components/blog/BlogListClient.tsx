'use client';

import { format } from 'date-fns';
import { Hash, Search } from 'lucide-react';
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
            <div className="rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#1a1a1a] shadow-sm p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                    <label htmlFor="blog-search" className="text-sm font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400">
                        Search articles
                    </label>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-3 py-1 rounded-full">{filteredPosts.length} results</span>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        id="blog-search"
                        type="text"
                        placeholder="Search by title, tag, or summary..."
                        value={query}
                        onChange={(event) => handleQueryChange(event.target.value)}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-transparent dark:text-white pl-12 pr-4 py-3.5 rounded-full text-[15px] focus:outline-none focus:ring-2 focus:ring-brand-blue/20 dark:focus:ring-blue-500/20 focus:border-brand-blue dark:focus:border-blue-400 focus:bg-white dark:focus:bg-[#1a1a1a] transition-all placeholder-gray-400"
                    />
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-white/5">
                    {tags.map(({ tag, count }) => {
                        const active = selectedTag === tag;
                        return (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => handleTagChange(tag)}
                                className={`pill-tag flex items-center gap-1 ${active ? 'bg-brand-blue text-white hover:bg-brand-blue/90 hover:text-white dark:bg-blue-500 dark:text-white border-transparent' : ''}`}
                            >
                                <Hash className="w-3 h-3 opacity-60" />
                                {tag} <span className="opacity-60 ml-0.5">({count})</span>
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
                            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 px-3 py-1.5 transition-colors underline underline-offset-2"
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
                                className="blog-card flex flex-col group relative"
                            >
                                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
                                    <time className="font-medium text-brand-charcoal dark:text-gray-300">
                                        {meta.date ? format(new Date(meta.date), 'MMM d, yyyy') : ''}
                                    </time>
                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                    <span>{meta.readingTimeMinutes} min read</span>
                                    <span className="hidden sm:inline-flex w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                    <div className="hidden sm:flex flex-wrap gap-2">
                                        {meta.tags?.map((tag) => (
                                            <Link
                                                key={`${meta.slug}-${tag}`}
                                                href={`/blog/tags/${encodeURIComponent(tag)}/`}
                                                onClick={(event) => event.stopPropagation()}
                                                className="text-gray-500 hover:text-brand-blue dark:hover:text-blue-400 transition-colors flex items-center"
                                            >
                                                <Hash className="w-3 h-3 mr-0.5 opacity-60" /> {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold mb-3 text-brand-charcoal dark:text-white transition-colors">
                                    <Link href={`/blog/${meta.slug}/`} className="blog-title-hover">
                                        {meta.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">{meta.description}</p>
                                <Link
                                    href={`/blog/${meta.slug}/`}
                                    className="inline-flex items-center text-brand-blue dark:text-blue-400 font-semibold text-sm uppercase tracking-wider group-hover:gap-2 transition-all mt-auto"
                                >
                                    Read more <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                                </Link>
                                <Link href={`/blog/${meta.slug}/`} className="absolute inset-0 z-10" aria-label={`Read ${meta.title}`}></Link>
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
