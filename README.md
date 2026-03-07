# Portfolio (Next.js)

Personal portfolio and technical blog built with Next.js, Tailwind CSS, and Markdown content.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

`prebuild` automatically generates `public/rss.xml` from `content/posts/*.md`.

## Blog Features

- Markdown-based posts in `content/posts/`
- Draft and scheduled publishing via frontmatter (`draft`, `publishedAt`)
- Search + tag filtering + pagination on listing page
- Dedicated tag pages (`/blog/tags/[tag]/`)
- Reading time and scroll progress bar on post pages
- Auto-generated table of contents from headings
- Related posts by shared tags
- SEO metadata, JSON-LD structured data, `sitemap.xml`, and `robots.txt`
- RSS feed at `/rss.xml`
- Optional comments via Giscus

## Blog Frontmatter

```yaml
---
title: My Post
description: Short summary
date: 2026-03-07
publishedAt: 2026-03-08
updatedAt: 2026-03-10
draft: false
tags: [AI, Engineering]
---
```

## Giscus Setup

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_GISCUS_REPO`
- `NEXT_PUBLIC_GISCUS_REPO_ID`
- `NEXT_PUBLIC_GISCUS_CATEGORY`
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`