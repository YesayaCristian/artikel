import { http } from "../lib/http";

export type ApiCategory = { id: number; name: string; slug: string };
export type ApiTag = { id: number; name: string; slug: string };

export type ApiArticle = {
  id: number;
  judul: string;
  konten: string;
  author: string;
  created_at: string;
  images: string[];
  category: ApiCategory | null;
  tags: ApiTag[];
};

export async function fetchAdminArticles() {
  return http<{ articles: ApiArticle[] }>("/api/articles/");
}

export async function getAdminArticle(id: number): Promise<ApiArticle> {
  const res = await http<{ article: ApiArticle }>(`/api/articles/${id}/`);
  return res.article;
}

export async function deleteArticle(id: number) {
  return http<{ message: string }>(`/api/articles/${id}/delete/`, { method: "DELETE" });
}

export async function fetchCategories() {
  return http<{ categories: ApiCategory[] }>("/api/categories/");
}

export async function fetchTags() {
  return http<{ tags: ApiTag[] }>("/api/tags/");
}

export type ArticlePayload = {
  judul: string;
  konten: string;
  category_id?: number | null;
  tag_ids?: number[];
  images?: File[];
};

function buildFormData(p: ArticlePayload) {
  const fd = new FormData();
  fd.append("judul", p.judul);
  fd.append("konten", p.konten);

  if (p.category_id === null) fd.append("category_id", "");
  if (typeof p.category_id === "number") fd.append("category_id", String(p.category_id));

  if (p.tag_ids) {
    for (const id of p.tag_ids) fd.append("tag_ids", String(id));
  }

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
