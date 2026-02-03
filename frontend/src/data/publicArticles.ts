import type { Article } from "./articles.mock";

const BASE = import.meta.env.VITE_API_BASE_URL as string;

export type ApiCategory = { id: number; name: string; slug: string };
export type ApiTag = { id: number; name: string; slug: string };

export type ApiArticle = {
  id: number;
  judul: string;
  konten: string;
  author: string;
  created_at: string;
  images: string[];
  category?: ApiCategory | null;
  tags?: ApiTag[];
};

function slugifyLite(text: string) {
  const safe = (text ?? "").toString();
  return safe
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function makeExcerpt(text: string, max = 140) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trim() + "...";
}

function mapApiToUi(a: ApiArticle): Article {
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

// ✅ dipakai ArticlesPage + LandingPage
export async function listPublishedArticles(): Promise<Article[]> {
  const res = await fetch(`${BASE}/api/articles/`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Fetch list gagal: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { articles: ApiArticle[] };
  return (json.articles ?? []).map(mapApiToUi);
}

export async function getPublishedArticleById(id: number): Promise<Article | null> {
  const res = await fetch(`${BASE}/api/articles/${id}/`, {
    headers: { Accept: "application/json" },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Fetch detail gagal: ${res.status} ${res.statusText}`);

  const json = await res.json();

  // handle kemungkinan dibungkus
  const data = (json?.article ?? json?.data ?? json) as ApiArticle;

  return mapApiToUi(data);
}
