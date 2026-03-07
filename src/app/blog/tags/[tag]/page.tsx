import BlogListClient from '@/components/blog/BlogListClient';
import { getAllPosts, getAllTags } from '@/lib/blog';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);

    return {
        title: `${decodedTag} | Blog Tags | NGUYEN QUANG DUNG`,
        description: `Posts tagged with ${decodedTag}.`,
        alternates: {
            canonical: `https://duncan-nguyen.github.io/blog/tags/${encodeURIComponent(decodedTag)}/`,
        },
    };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);

    const posts = getAllPosts({ tag: decodedTag });
    const tags = getAllTags();
    const allTagNames = new Set(tags.map((item) => item.tag));

    if (!allTagNames.has(decodedTag)) {
        notFound();
    }

    const listItems = posts.map((post) => ({
        slug: post.meta.slug,
        title: post.meta.title,
        date: post.meta.publishedAt || post.meta.date,
        description: post.meta.description,
        tags: post.meta.tags,
        readingTimeMinutes: post.readingTimeMinutes,
    }));

    return (
        <main>
            <section className="py-16 md:py-20 px-6 border-b border-brand-border">
                <div className="max-w-4xl mx-auto">
                    <span className="text-brand-blue font-semibold tracking-widest uppercase text-sm mb-4 block">Tag</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">#{decodedTag}</h1>
                    <p className="text-gray-500">
                        {posts.length} post{posts.length === 1 ? '' : 's'} in this topic.
                    </p>
                    <Link href="/blog/" className="inline-flex mt-4 text-brand-blue hover:underline">
                        Back to all posts
                    </Link>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <BlogListClient posts={listItems} tags={tags} initialTag={decodedTag} />
                </div>
            </section>
        </main>
    );
}
