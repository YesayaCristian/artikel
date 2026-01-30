import { http, httpForm } from "../lib/http";

export type Category = { id: number; name: string; slug: string };
export type Tag = { id: number; name: string; slug: string };

export type ApiArticle = {
  id: number;
  judul: string;
  konten: string;
  author: string;
  created_at: string;
  images: string[];
  category?: Category | null;
  tags?: Tag[];
};

export async function fetchArticles() {
  return http<{ articles: ApiArticle[] }>("/api/articles/");
}

export async function fetchArticle(id: number) {
  return http<ApiArticle>(`/api/articles/${id}/`);
}

export async function fetchCategories() {
  return http<{ categories: Category[] }>("/api/categories/");
}

export async function fetchTags() {
  return http<{ tags: Tag[] }>("/api/tags/");
}

export type ArticleFormInput = {
  judul: string;
  konten: string;
  category_id?: number | null;
  tag_ids?: number[];
  images?: File[];
};

export async function createArticle(input: ArticleFormInput) {
  const fd = new FormData();
  fd.append("judul", input.judul);
  fd.append("konten", input.konten);

  if (input.category_id !== undefined) fd.append("category_id", input.category_id ? String(input.category_id) : "");
  if (input.tag_ids !== undefined) fd.append("tag_ids", input.tag_ids.join(","));

  (input.images || []).forEach((f) => fd.append("images", f));
  return httpForm<{ message: string; article: ApiArticle }>("/api/articles/create/", fd);
}

export async function updateArticle(id: number, input: Partial<ArticleFormInput>) {
  const fd = new FormData();
  if (input.judul !== undefined) fd.append("judul", input.judul);
  if (input.konten !== undefined) fd.append("konten", input.konten);

  if (input.category_id !== undefined) fd.append("category_id", input.category_id ? String(input.category_id) : "");
  if (input.tag_ids !== undefined) fd.append("tag_ids", input.tag_ids.join(","));

  (input.images || []).forEach((f) => fd.append("images", f));
  return httpForm<{ message: string; article: ApiArticle }>(`/api/articles/${id}/update/`, fd);
}

export async function deleteArticle(id: number) {
  return http<{ message: string }>(`/api/articles/${id}/delete/`, { method: "DELETE" });
}
