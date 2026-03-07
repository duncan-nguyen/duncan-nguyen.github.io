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
            <section className="py-16 md:py-20 px-6 border-b border-brand-border">
                <div className="max-w-4xl mx-auto">
                    <span className="text-brand-blue font-semibold tracking-widest uppercase text-sm mb-4 block">Blog</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">Writings</h1>
                    <p className="text-xl text-gray-500 font-light max-w-xl">
                        Thoughts on AI, machine learning, research, and software engineering.
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
