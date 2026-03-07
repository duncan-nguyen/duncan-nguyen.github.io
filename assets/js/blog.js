/**
 * Blog engine — loads posts.json for listing, fetches .md files for rendering.
 */

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function parseFrontmatter(md) {
    // Match basic YAML frontmatter wrapped in ---
    const match = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { meta: {}, content: md };

    const frontmatter = match[1];
    const content = match[2];
    const meta = {};

    frontmatter.split('\n').forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx > -1) {
            const key = line.slice(0, colonIdx).trim();
            let value = line.slice(colonIdx + 1).trim();
            // simple array parsing for tags: [General, AI/ML]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
            } else {
                value = value.replace(/^['"]|['"]$/g, '');
            }
            meta[key] = value;
        }
    });

    return { meta, content };
}

/* ---------- Blog listing page ---------- */
async function loadPosts() {
    const container = document.getElementById('posts-container');
    const noPosts = document.getElementById('no-posts');
    if (!container) return;

    try {
        const res = await fetch('./posts/posts.json');
        if (!res.ok) throw new Error('Failed to fetch posts.json');
        const slugs = await res.json();

        if (!slugs.length) {
            noPosts?.classList.remove('hidden');
            return;
        }

        const posts = [];
        for (const item of slugs) {
            // Support both plain string ("slug") and old object format
            const slug = typeof item === 'string' ? item : item.slug;
            try {
                const mdRes = await fetch(`./posts/${encodeURIComponent(slug)}.md`);
                if (!mdRes.ok) continue;
                const md = await mdRes.text();
                const { meta } = parseFrontmatter(md);
                if (!meta.slug) meta.slug = slug;
                posts.push(meta);
            } catch (e) {
                console.error('Error fetching post:', slug, e);
            }
        }

        posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

        container.innerHTML = posts.map(post => `
            <a href="./post.html?slug=${encodeURIComponent(post.slug)}" class="block blog-card border border-brand-border hover:border-brand-blue p-8 bg-white">
                <div class="flex flex-wrap items-center gap-3 mb-4">
                    <time class="text-sm text-gray-400 font-medium">${post.date ? escapeHtml(formatDate(post.date)) : ''}</time>
                    ${(post.tags || []).map(t => `<span class="pill-tag">${escapeHtml(t)}</span>`).join('')}
                </div>
                <h2 class="text-2xl font-bold mb-3 group-hover:text-brand-blue transition-colors">${escapeHtml(post.title || post.slug)}</h2>
                <p class="text-gray-600 mb-4">${escapeHtml(post.description || '')}</p>
                <span class="text-brand-blue font-semibold text-sm uppercase tracking-wider">Read more →</span>
            </a>
        `).join('');
    } catch (err) {
        console.error('loadPosts:', err);
        noPosts?.classList.remove('hidden');
    }
}

/* ---------- Single post page ---------- */
async function loadPost() {
    const content = document.getElementById('post-content');
    const titleEl = document.getElementById('post-title');
    const dateEl = document.getElementById('post-date');
    const tagsEl = document.getElementById('post-tags');
    if (!content) return;

    const slug = new URLSearchParams(window.location.search).get('slug');

    // Validate slug — alphanumeric, hyphens, underscores only
    if (!slug || !/^[a-zA-Z0-9_-]+$/.test(slug)) {
        content.innerHTML = '<p class="text-gray-500">Post not found.</p>';
        return;
    }

    try {
        // Load and render markdown
        const mdRes = await fetch(`./posts/${encodeURIComponent(slug)}.md`);
        if (!mdRes.ok) throw new Error('Markdown file not found');
        const mdText = await mdRes.text();
        const { meta, content: mdContent } = parseFrontmatter(mdText);

        const postTitle = meta.title || slug;

        document.title = `${postTitle} | NGUYEN QUANG DUNG`;
        if (titleEl) titleEl.textContent = postTitle;
        if (dateEl && meta.date) dateEl.textContent = formatDate(meta.date);
        if (tagsEl && meta.tags) {
            tagsEl.innerHTML = meta.tags.map(t => `<span class="pill-tag">${escapeHtml(t)}</span>`).join('');
        }

        // Tối ưu SEO động cho các meta tags đã thêm trước đó
        const metaTitle = document.getElementById('meta-title');
        const metaDesc = document.getElementById('meta-desc');
        const ogTitle = document.getElementById('og-title');
        const ogDesc = document.getElementById('og-desc');
        const ogUrl = document.getElementById('og-url');
        const twitterTitle = document.getElementById('twitter-title');
        const twitterDesc = document.getElementById('twitter-desc');

        if (metaTitle) metaTitle.innerText = `${postTitle} | NGUYEN QUANG DUNG`;
        if (metaDesc && meta.description) metaDesc.setAttribute('content', meta.description);
        if (ogTitle) ogTitle.setAttribute('content', postTitle);
        if (ogDesc && meta.description) ogDesc.setAttribute('content', meta.description);
        if (ogUrl) ogUrl.setAttribute('content', window.location.href);
        if (twitterTitle) twitterTitle.setAttribute('content', postTitle);
        if (twitterDesc && meta.description) twitterDesc.setAttribute('content', meta.description);

        content.innerHTML = marked.parse(mdContent)
            + '<hr><p><em>Thanks for reading!</em></p>';

        // Syntax highlight code blocks
        if (typeof hljs !== 'undefined') {
            content.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
            });
        }
    } catch (err) {
        console.error('loadPost:', err);
        content.innerHTML = '<p class="text-gray-500">Failed to load post.</p>';
    }
}

/* ---------- Auto-init ---------- */
if (document.getElementById('posts-container')) loadPosts();
if (document.getElementById('post-content')) loadPost();
