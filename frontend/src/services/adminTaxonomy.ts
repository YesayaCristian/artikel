import { http } from "../lib/http";

export type Category = { id: number; name: string; slug: string };
export type Tag = { id: number; name: string; slug: string };

// READ
export async function fetchCategories() {
  return http<{ categories: Category[] }>("/api/categories/");
}

export async function fetchTags() {
  return http<{ tags: Tag[] }>("/api/tags/");
}

// CATEGORY CRUD
export async function createCategoryApi(name: string) {
  return http("/api/categories/create/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

export async function updateCategoryApi(id: number, name: string) {
  return http(`/api/categories/${id}/update/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

export async function deleteCategoryApi(id: number) {
  return http(`/api/categories/${id}/delete/`, { method: "DELETE" });
}

// TAG CRUD
export async function createTagApi(name: string) {
  return http("/api/tags/create/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

export async function updateTagApi(id: number, name: string) {
  return http(`/api/tags/${id}/update/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
}

export async function deleteTagApi(id: number) {
  return http(`/api/tags/${id}/delete/`, { method: "DELETE" });
}
