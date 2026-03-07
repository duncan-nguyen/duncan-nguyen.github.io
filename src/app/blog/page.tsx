import BlogListClient from '@/components/blog/BlogListClient';
import { getAllPosts, getAllTags } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | NGUYEN QUANG DUNG',
    description: 'Technical blog on AI, ML, and software engineering.',
    alternates: {
        canonical: 'https://duncan-nguyen.github.io/blog/',
        types: {
            'application/rss+xml': 'https://duncan-nguyen.github.io/rss.xml',
        },
    },
    openGraph: {
        title: 'Blog | NGUYEN QUANG DUNG',
        description: 'Technical blog on AI, ML, and software engineering.',
        url: 'https://duncan-nguyen.github.io/blog/',
        images: [{ url: 'https://duncan-nguyen.github.io/images/og-blog.jpg' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | NGUYEN QUANG DUNG',
        description: 'Technical blog on AI, ML, and software engineering.',
        images: ['https://duncan-nguyen.github.io/images/og-blog.jpg'],
    },
};

export default function BlogListing() {
    const posts = getAllPosts();
    const tags = getAllTags();
    const listItems = posts.map((post) => ({
        slug: post.meta.slug,
        title: post.meta.title,
        date: post.meta.publishedAt || post.meta.date,
        description: post.meta.description,
        tags: post.meta.tags,
        readingTimeMinutes: post.readingTimeMinutes,
    }));

    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'NGUYEN QUANG DUNG Blog',
        url: 'https://duncan-nguyen.github.io/blog/',
        description: 'Technical blog on AI, ML, and software engineering.',
        inLanguage: 'en',
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
            />
            <section className="relative py-24 md:py-32 px-6 border-b border-brand-border dark:border-white/10 overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-40 dark:opacity-20 pointer-events-none -z-10">
                    <div className="absolute top-[-10%] left-[20%] w-72 h-72 bg-brand-blue rounded-full mix-blend-multiply filter blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] right-[20%] w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px]"></div>
                </div>

                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <span className="text-brand-blue dark:text-blue-400 font-semibold tracking-widest uppercase text-sm mb-4 block">
                        Blog
                    </span>
                    <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-6 leading-tight text-[#1a1a1a] dark:text-white">
                        Writings
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-2xl">
                        Thoughts on AI, machine learning, research, and software
                        engineering.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    {posts.length > 0 ? (
                        <BlogListClient posts={listItems} tags={tags} />
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No posts yet. Stay tuned!</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
