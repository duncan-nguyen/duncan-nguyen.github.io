import json
import os
import re
from datetime import date

BASE_URL = "https://duncan-nguyen.github.io"
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
POSTS_DIR = os.path.join(ROOT_DIR, "blog", "posts")


def parse_frontmatter(filepath):
    """Extract key-value pairs from YAML frontmatter at the top of a .md file."""
    meta = {}
    with open(filepath, encoding="utf-8") as f:
        content = f.read()
    match = re.match(r"^---\n([\s\S]*?)\n---", content)
    if not match:
        return meta
    for line in match.group(1).splitlines():
        if ":" in line:
            key, _, value = line.partition(":")
            meta[key.strip()] = value.strip()
    return meta


def generate_index(posts):
    """Write blog/posts/posts.json with sorted list of slugs (newest first)."""
    output_path = os.path.join(POSTS_DIR, "posts.json")
    slugs = [p["slug"] for p in posts]
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(slugs, f, indent=4)
    print(f"[posts.json]  {len(slugs)} posts written.")


def generate_sitemap(posts):
    """Rewrite sitemap.xml, keeping static pages and adding one <url> per post."""
    today = date.today().isoformat()

    static_urls = f"""\
   <!-- Home Page -->
   <url>
      <loc>{BASE_URL}/</loc>
      <lastmod>{today}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
   </url>
   <!-- Blog Listing Page -->
   <url>
      <loc>{BASE_URL}/blog/</loc>
      <lastmod>{today}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
   </url>"""

    post_urls = "\n".join(
        f"""\
   <url>
      <loc>{BASE_URL}/blog/post.html?slug={p["slug"]}</loc>
      <lastmod>{p.get("date", today)}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
   </url>"""
        for p in posts
    )

    sitemap = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + static_urls
        + "\n"
        + (("   <!-- Blog Posts -->\n" + post_urls + "\n") if post_urls else "")
        + "</urlset>"
    )

    output_path = os.path.join(ROOT_DIR, "sitemap.xml")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(sitemap)
    print(f"[sitemap.xml] {len(posts)} blog post(s) added.")


def main():
    if not os.path.exists(POSTS_DIR):
        print("Posts directory not found.")
        return

    posts = []
    for filename in sorted(os.listdir(POSTS_DIR)):
        if not filename.endswith(".md"):
            continue
        slug = filename[:-3]
        meta = parse_frontmatter(os.path.join(POSTS_DIR, filename))
        meta.setdefault("slug", slug)
        posts.append(meta)

    # Sort newest first by date field in frontmatter
    posts.sort(key=lambda p: p.get("date", ""), reverse=True)

    generate_index(posts)
    generate_sitemap(posts)


if __name__ == "__main__":
    main()
