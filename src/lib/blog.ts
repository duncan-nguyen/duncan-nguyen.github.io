import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

interface PostFrontmatter {
    title?: string;
    date?: string;
    description?: string;
    tags?: string[];
    draft?: boolean;
    publishedAt?: string;
    updatedAt?: string;
}

export interface PostMetadata {
    slug: string;
    title: string;
    date: string;
    description?: string;
    tags?: string[];
    draft?: boolean;
    publishedAt?: string;
    updatedAt?: string;
}

export interface TocItem {
    id: string;
    text: string;
    level: number;
}

export interface BlogPost {
    meta: PostMetadata;
    content: string;
    readingTimeMinutes: number;
    toc: TocItem[];
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function slugifyHeading(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[\[\]()*_`~]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

function stripMarkdownInline(text: string): string {
    return text
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[`*_~]/g, '')
        .trim();
}

function extractToc(content: string): TocItem[] {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const toc: TocItem[] = [];
    let match: RegExpExecArray | null = headingRegex.exec(content);

    while (match) {
        const level = match[1].length;
        const rawText = stripMarkdownInline(match[2]);
        if (rawText) {
            toc.push({
                id: slugifyHeading(rawText),
                text: rawText,
                level,
            });
        }
        match = headingRegex.exec(content);
    }

    return toc;
}

function estimateReadingTimeMinutes(content: string): number {
    const words = content
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`[^`]*`/g, ' ')
        .replace(/[#>*_\-\[\]()]/g, ' ')
        .split(/\s+/)
        .filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 220));
}

function resolvePublishDate(meta: PostMetadata): Date | null {
    const dateValue = meta.publishedAt || meta.date;
    if (!dateValue) return null;
    const parsed = new Date(dateValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isPublished(meta: PostMetadata): boolean {
    if (meta.draft) return false;
    const publishDate = resolvePublishDate(meta);
    if (!publishDate) return true;
    return publishDate.getTime() <= Date.now();
}

function normalizeMetadata(slug: string, data: PostFrontmatter): PostMetadata {
    return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        draft: Boolean(data.draft),
        publishedAt: data.publishedAt || data.date || '',
        updatedAt: data.updatedAt || '',
    };
}

export function getPostSlugs() {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(slug: string, options?: { includeUnpublished?: boolean }): BlogPost {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const meta = normalizeMetadata(realSlug, data as PostFrontmatter);

    if (!options?.includeUnpublished && !isPublished(meta)) {
        throw new Error(`Post ${realSlug} is not published`);
    }

    return {
        meta,
        content,
        readingTimeMinutes: estimateReadingTimeMinutes(content),
        toc: extractToc(content),
    };
}

export function getAllPosts(options?: { includeUnpublished?: boolean; tag?: string }): BlogPost[] {
    const slugs = getPostSlugs();
    const posts = slugs.flatMap((slug) => {
        try {
            const post = getPostBySlug(slug, { includeUnpublished: options?.includeUnpublished });
            if (options?.tag && !post.meta.tags?.includes(options.tag)) {
                return [];
            }
            return [post];
        } catch {
            return [];
        }
    });

    return posts.sort((post1, post2) => {
        const date1 = resolvePublishDate(post1.meta)?.getTime() || 0;
        const date2 = resolvePublishDate(post2.meta)?.getTime() || 0;
        return date2 - date1;
    });
}

export function getAllTags(): { tag: string; count: number }[] {
    const tagCount = new Map<string, number>();
    const posts = getAllPosts();

    posts.forEach((post) => {
        post.meta.tags?.forEach((tag) => {
            tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
        });
    });

    return [...tagCount.entries()]
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
    const posts = getAllPosts();
    const currentPost = posts.find((post) => post.meta.slug === currentSlug);
    if (!currentPost) return [];

    const currentTags = new Set(currentPost.meta.tags || []);

    return posts
        .filter((post) => post.meta.slug !== currentSlug)
        .map((post) => {
            const overlap = (post.meta.tags || []).filter((tag) => currentTags.has(tag)).length;
            const dateScore = resolvePublishDate(post.meta)?.getTime() || 0;
            return { post, overlap, dateScore };
        })
        .sort((a, b) => {
            if (b.overlap !== a.overlap) return b.overlap - a.overlap;
            return b.dateScore - a.dateScore;
        })
        .slice(0, limit)
        .map((item) => item.post);
}
