import GiscusComments from '@/components/blog/GiscusComments';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import TableOfContents from '@/components/blog/TableOfContents';
import { getAllPosts, getPostBySlug, getRelatedPosts, slugifyHeading } from '@/lib/blog';
import { format } from 'date-fns';
import 'highlight.js/styles/github.css';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import rehypeHighlight from 'rehype-highlight';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.meta.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    try {
        const post = getPostBySlug(slug);
        const canonicalUrl = `https://duncan-nguyen.github.io/blog/${slug}/`;

        return {
            title: `${post.meta.title} | NGUYEN QUANG DUNG`,
            description: post.meta.description || 'Blog post by Nguyen Quang Dung — AI/ML Engineer.',
            alternates: {
                canonical: canonicalUrl,
            },
            openGraph: {
                title: `${post.meta.title} | NGUYEN QUANG DUNG`,
                description: post.meta.description || 'Blog post by Nguyen Quang Dung — AI/ML Engineer.',
                type: 'article',
                publishedTime: post.meta.publishedAt || post.meta.date,
                url: canonicalUrl,
                images: [{ url: 'https://duncan-nguyen.github.io/images/og-blog.jpg' }],
            },
            twitter: {
                card: 'summary_large_image',
                title: `${post.meta.title} | NGUYEN QUANG DUNG`,
                description: post.meta.description || 'Blog post by Nguyen Quang Dung — AI/ML Engineer.',
                images: ['https://duncan-nguyen.github.io/images/og-blog.jpg'],
            },
        };
    } catch {
        return { title: 'Post Not Found' };
    }
}

function headingText(children: ReactNode): string {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(headingText).join('');
    if (children && typeof children === 'object' && 'props' in children) {
        return headingText((children as { props: { children?: ReactNode } }).props.children || '');
    }
    return '';
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let post;
    try {
        post = getPostBySlug(slug);
    } catch {
        notFound();
    }

    const relatedPosts = getRelatedPosts(slug, 3);
    const publishedDate = post.meta.publishedAt || post.meta.date;
    const canonicalUrl = `https://duncan-nguyen.github.io/blog/${slug}/`;

    const blogPostingJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.meta.title,
        description: post.meta.description,
        datePublished: publishedDate || undefined,
        dateModified: post.meta.updatedAt || publishedDate || undefined,
        url: canonicalUrl,
        image: 'https://duncan-nguyen.github.io/images/og-blog.jpg',
        author: {
            '@type': 'Person',
            name: 'Nguyen Quang Dung',
        },
        publisher: {
            '@type': 'Person',
            name: 'Nguyen Quang Dung',
        },
        keywords: post.meta.tags?.join(', '),
    };

    return (
        <main>
            <ReadingProgressBar />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
            />
            <section className="py-16 md:py-20 px-6 border-b border-brand-border">
                <div className="max-w-3xl mx-auto">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-brand-blue transition-colors mb-8">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{post.meta.title}</h1>
                    <div className="flex flex-wrap items-center gap-4">
                        <time className="text-gray-400 font-medium">
                            {publishedDate ? format(new Date(publishedDate), 'MMMM d, yyyy') : ''}
                        </time>
                        <span className="text-gray-400">{post.readingTimeMinutes} min read</span>
                        <div className="flex flex-wrap gap-2">
                            {post.meta.tags?.map((tag) => (
                                <Link key={tag} href={`/blog/tags/${encodeURIComponent(tag)}/`} className="pill-tag">
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_260px] gap-10">
                    <article className="prose max-w-none">
                        <div className="mb-8 lg:hidden not-prose">
                            <TableOfContents items={post.toc} />
                        </div>
                        <MDXRemote
                            source={post.content}
                            options={{
                                mdxOptions: {
                                    rehypePlugins: [rehypeHighlight as any]
                                }
                            }}
                            components={{
                                h1: ({ children, ...props }) => {
                                    const text = headingText(children);
                                    const id = slugifyHeading(text);
                                    return <h1 id={id} {...props as any}>{children}</h1>;
                                },
                                h2: ({ children, ...props }) => {
                                    const text = headingText(children);
                                    const id = slugifyHeading(text);
                                    return <h2 id={id} {...props as any}>{children}</h2>;
                                },
                                h3: ({ children, ...props }) => {
                                    const text = headingText(children);
                                    const id = slugifyHeading(text);
                                    return <h3 id={id} {...props as any}>{children}</h3>;
                                },
                            }}
                        />
                        <hr />
                        <p><em>Thanks for reading!</em></p>

                        {relatedPosts.length > 0 && (
                            <section className="border-t border-brand-border pt-10 mt-10">
                                <h2 className="text-2xl font-bold mb-4">Related posts</h2>
                                <div className="space-y-4">
                                    {relatedPosts.map((related) => (
                                        <Link
                                            key={related.meta.slug}
                                            href={`/blog/${related.meta.slug}/`}
                                            className="block border border-brand-border p-5 hover:border-brand-blue transition-colors no-underline"
                                        >
                                            <p className="font-semibold text-brand-charcoal mb-1">{related.meta.title}</p>
                                            <p className="text-sm text-gray-500 m-0">{related.meta.description}</p>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        <GiscusComments />
                    </article>
                    <div className="hidden lg:block">
                        <TableOfContents items={post.toc} />
                    </div>
                </div>
            </section>

            <section className="pb-16 px-6">
                <div className="max-w-3xl mx-auto border-t border-brand-border pt-8">
                    <Link href="/blog/" className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:underline transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        All Posts
                    </Link>
                </div>
            </section>
        </main>
    );
}
