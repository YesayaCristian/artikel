import type { Article } from "./articles.mock";
import { getArticleById, listArticles } from "./articles.store";

export function listPublishedArticles(): Article[] {
  return listArticles().filter((a) => a.status === "published");
}

export function getPublishedArticleById(id: number): Article | null {
  const a = getArticleById(id);
  if (!a) return null;
  if (a.status !== "published") return null;
  return a;
}
