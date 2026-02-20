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

export async function fetchPublicArticles(): Promise<ApiArticle[]> {
  const res = await fetch(`${BASE}/api/admin/articles/`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Fetch list gagal: ${res.status} ${res.statusText}`);
  const json = (await res.json()) as { articles: ApiArticle[] };
  return json.articles ?? [];
}

export async function fetchPublicArticleDetail(id: number): Promise<ApiArticle> {
  const res = await fetch(`${BASE}/api/article/${id}/`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Fetch detail gagal: ${res.status} ${res.statusText}`);
  return res.json();
}
