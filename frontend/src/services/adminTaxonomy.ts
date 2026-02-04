import { http } from "../lib/http";

export type Category = { id: number; name: string; slug: string };

export async function fetchCategories() {
  return http<{ categories: Category[] }>("/api/categories/");
}


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


