import { getAllPosts, getAllTags } from '@/lib/blog';
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://duncan-nguyen.github.io';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const tags = getAllTags();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${SITE_URL}/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${SITE_URL}/blog/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${SITE_URL}/blog/${post.meta.slug}/`,
        lastModified: post.meta.updatedAt || post.meta.publishedAt || post.meta.date || new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const tagRoutes: MetadataRoute.Sitemap = tags.map(({ tag }) => ({
        url: `${SITE_URL}/blog/tags/${encodeURIComponent(tag)}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
