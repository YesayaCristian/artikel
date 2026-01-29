import type { ApiArticle } from "../data/publicArticles";

const BASE = import.meta.env.VITE_API_BASE_URL as string;

function slugifyLite(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function makeExcerpt(text: string, max = 140) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : clean.slice(0, max).trim() + "...";
}

export function mapApiToUi(a: ApiArticle) {
  const thumbnailUrl = a.images?.[0] ? `${BASE}${a.images[0]}` : null;

  return {
    id: a.id,
    title: a.judul,
    slug: slugifyLite(a.judul),
    excerpt: makeExcerpt(a.konten),
    content: a.konten,
    category: a.category?.name ?? "Uncategorized",
    tags: (a.tags ?? []).map((t) => t.name),
    thumbnailUrl,
    updatedAt: a.created_at,
  };
}
