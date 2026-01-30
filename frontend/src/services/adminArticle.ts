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

export async function fetchAdminArticle(id: number) {
  return http<ApiArticle>(`/api/articles/${id}/`);
}

export async function fetchCategories() {
  return http<{ categories: ApiCategory[] }>("/api/categories/");
}

export async function fetchTags() {
  return http<{ tags: ApiTag[] }>("/api/tags/");
}

export async function deleteArticle(id: number) {
  return http<{ message: string }>(`/api/articles/${id}/delete/`, {
    method: "DELETE",
  });
}

// Create/update pakai FormData (multipart)
export type ArticlePayload = {
  judul: string;
  konten: string;
  category_id?: number | null;
  tag_ids?: number[];
  images?: File[];
};

function buildFormData(payload: ArticlePayload) {
  const fd = new FormData();
  fd.append("judul", payload.judul);
  fd.append("konten", payload.konten);

  if (payload.category_id === null) fd.append("category_id", "");
  if (typeof payload.category_id === "number") fd.append("category_id", String(payload.category_id));

  if (payload.tag_ids) {
    // pakai repeated key: tag_ids=1&tag_ids=2
    for (const id of payload.tag_ids) fd.append("tag_ids", String(id));
  }

  if (payload.images?.length) {
    for (const f of payload.images) fd.append("images", f);
  }

  return fd;
}

export async function createArticle(payload: ArticlePayload) {
  const fd = buildFormData(payload);
  return http<{ message: string; article: ApiArticle }>("/api/articles/create/", {
    method: "POST",
    body: fd,
  });
}

export async function updateArticle(id: number, payload: ArticlePayload) {
  const fd = buildFormData(payload);
  return http<{ message: string; article: ApiArticle }>(`/api/articles/${id}/update/`, {
    method: "POST",
    body: fd,
  });
}
