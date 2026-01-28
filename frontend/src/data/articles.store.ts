import type { Article } from "./articles.mock";
import { initialArticles } from "./articles.mock";

const KEY = "articles_db_v1";

export function loadArticles(): Article[] {
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as Article[];
    } catch {}
  }
  localStorage.setItem(KEY, JSON.stringify(initialArticles));
  return initialArticles;
}

export function saveArticles(articles: Article[]) {
  localStorage.setItem(KEY, JSON.stringify(articles));
}

export function listArticles(): Article[] {
  return loadArticles();
}

export function getArticleById(id: number): Article | null {
  const articles = loadArticles();
  return articles.find((a) => a.id === id) ?? null;
}

export function createArticle(payload: Omit<Article, "id" | "updatedAt">): Article {
  const articles = loadArticles();
  const nextId = articles.length ? Math.max(...articles.map((a) => a.id)) + 1 : 1;

  const created: Article = {
    id: nextId,
    updatedAt: new Date().toISOString(),
    ...payload,
  };

  saveArticles([created, ...articles]);
  return created;
}

export function updateArticle(id: number, payload: Omit<Article, "id">): Article | null {
  const articles = loadArticles();
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) return null;

  const updated: Article = { ...payload, id };
  const next = [...articles];
  next[idx] = updated;

  saveArticles(next);
  return updated;
}

export function deleteArticle(id: number): boolean {
  const articles = loadArticles();
  const next = articles.filter((a) => a.id !== id);
  if (next.length === articles.length) return false;
  saveArticles(next);
  return true;
}
