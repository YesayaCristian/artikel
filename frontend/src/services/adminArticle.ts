import { http } from "../lib/http";

export type ApiCategory = { id: number; name: string; slug: string };

export type ApiArticle = {
  id: number;
  judul: string;
  konten: string;
  author: string;
  created_at: string;
  images: string[];
  category: ApiCategory | null;
};

export async function fetchAdminArticles() {
  return http<{ articles: ApiArticle[] }>("/api/articles/");
}

export async function getAdminArticle(id: number): Promise<ApiArticle> {
  const json = await http<any>(`/api/articles/${id}/`);
  return (json?.article ?? json?.data ?? json) as ApiArticle;
}

export async function deleteArticle(id: number) {
  return http<{ message: string }>(`/api/articles/${id}/delete/`, { method: "DELETE" });
}

export async function fetchCategories() {
  return http<{ categories: ApiCategory[] }>("/api/categories/");
}

export type ArticlePayload = {
  judul: string;
  konten: string;
  category_id?: number | null;
  images?: File[];
};

function buildFormData(p: ArticlePayload) {
  const fd = new FormData();
  fd.append("judul", p.judul);
  fd.append("konten", p.konten);

  if (p.category_id === null) fd.append("category_id", "");
  if (typeof p.category_id === "number") fd.append("category_id", String(p.category_id));

  if (p.images?.length) {
    for (const f of p.images) fd.append("images", f);
  }

  return fd;
}

export async function createAdminArticle(payload: ArticlePayload) {
  return http<{ message: string; article: ApiArticle }>("/api/articles/create/", {
    method: "POST",
    body: buildFormData(payload),
  });
}

export async function updateAdminArticle(id: number, payload: ArticlePayload) {
  return http<{ message: string; article: ApiArticle }>(`/api/articles/${id}/update/`, {
    method: "POST",
    body: buildFormData(payload),
  });
}
