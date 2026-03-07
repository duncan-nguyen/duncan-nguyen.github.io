import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

const siteUrl = 'https://duncan-nguyen.github.io';
const postsDir = path.join(process.cwd(), 'content', 'posts');
const outputFile = path.join(process.cwd(), 'public', 'rss.xml');

function escapeXml(value = '') {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function toDate(value) {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
}

function isPublished(meta) {
    if (meta.draft) return false;
    const publishDate = toDate(meta.publishedAt || meta.date);
    if (!publishDate) return true;
    return publishDate.getTime() <= Date.now();
}

function buildFeed() {
    if (!fs.existsSync(postsDir)) {
        return [];
    }

    const entries = fs
        .readdirSync(postsDir)
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
            const slug = file.replace(/\.md$/, '');
            const fullPath = path.join(postsDir, file);
            const source = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(source);

            return {
                slug,
                title: data.title || slug,
                description: data.description || '',
                date: data.publishedAt || data.date,
                draft: Boolean(data.draft),
                content,
                tags: Array.isArray(data.tags) ? data.tags : [],
            };
        })
        .filter((entry) => isPublished(entry))
        .sort((a, b) => {
            const dateA = toDate(a.date)?.getTime() || 0;
            const dateB = toDate(b.date)?.getTime() || 0;
            return dateB - dateA;
        });

    return entries;
}

const items = buildFeed()
    .map((post) => {
        const link = `${siteUrl}/blog/${post.slug}/`;
        const pubDate = toDate(post.date)?.toUTCString() || new Date().toUTCString();
        const categories = post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('');

        return `\n    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${link}</link>\n      <guid>${link}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <description>${escapeXml(post.description)}</description>${categories}\n    </item>`;
    })
    .join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>NGUYEN QUANG DUNG Blog</title>
    <link>${siteUrl}/blog/</link>
    <description>Technical blog on AI, ML, and software engineering.</description>
    <language>en-us</language>${items}
  </channel>
</rss>
`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, xml, 'utf8');
console.log(`Generated RSS feed at ${outputFile}`);
