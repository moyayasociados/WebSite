import type { BlogBlock, BlogPost } from "@/shared/types/content";
import { mockPosts } from "./mock-posts";
import { createPublicClient } from "@/shared/lib/supabase/public";
function legacyToHtml(blocks: BlogBlock[] = []) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          return `<p>${escapeHtml(block.text)}</p>`;
        case "heading":
          return `<h${block.level}>${escapeHtml(block.text)}</h${block.level}>`;
        case "quote":
          return `<blockquote>${escapeHtml(block.text)}${block.caption ? `<footer>${escapeHtml(block.caption)}</footer>` : ""}</blockquote>`;
        case "bulleted":
          return `<ul>${block.items.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
        case "numbered":
          return `<ol>${block.items.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ol>`;
        case "image":
          return `<figure><img src="${escapeAttr(block.url)}" alt="${escapeAttr(block.caption ?? "")}"/>${block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : ""}</figure>`;
        case "divider":
          return "<hr/>";
      }
    })
    .join("");
}
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function escapeAttr(value: string) {
  return escapeHtml(value);
}
export function mapPost(row: any): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: row.category ?? "General",
    publishedAt: row.published_at ?? row.created_at,
    coverImage: row.cover_image ?? undefined,
    contentHtml: row.content_html ?? "",
    author: row.author_name
      ? {
          name: row.author_name,
          role: row.author_role ?? undefined,
          avatar: row.author_avatar ?? undefined,
        }
      : undefined,
    readingTime: row.reading_time ?? undefined,
    tags: row.tags ?? [],
    status: row.status,
  };
}
export async function getPosts(): Promise<BlogPost[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )
    return mockPosts.map((p) => ({
      ...p,
      contentHtml: p.contentHtml || legacyToHtml(p.content),
    }));
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) {
    console.error(error);
    return mockPosts.map((p) => ({
      ...p,
      contentHtml: p.contentHtml || legacyToHtml(p.content),
    }));
  }
  return (data ?? []).map(mapPost);
}
export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )
    return mockPosts.find((p) => p.slug === slug);
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) {
    console.error(error);
    return mockPosts.find((p) => p.slug === slug);
  }
  return data ? mapPost(data) : undefined;
}
