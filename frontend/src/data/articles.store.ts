import type { Article } from "./articles.mock";
import { initialArticles } from "./articles.mock";

const KEY = "ARTICLES_V1";

function load(): Article[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialArticles;
    const parsed = JSON.parse(raw) as Article[];
    return Array.isArray(parsed) ? parsed : initialArticles;
  } catch {
    return initialArticles;
  }
}

function save(items: Article[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function listArticles(): Article[] {
  return load().sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function getArticleById(id: number): Article | null {
  return load().find((a) => a.id === id) ?? null;
}

export function createArticle(values: Omit<Article, "id" | "updatedAt">) {
  const items = load();
  const now = new Date().toISOString();
  const nextId = items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;

  const newArticle: Article = {
    id: nextId,
    ...values,
    category: values.category ?? "Teknologi",
    thumbnailUrl: values.thumbnailUrl?.trim() || undefined,
    updatedAt: now,
  };


  save([newArticle, ...items]);
  return newArticle;
}

export function updateArticle(id: number, values: Article) {
  const items = load();
  const idx = items.findIndex((a) => a.id === id);
  if (idx === -1) return false;

  const updated: Article = {
    ...values,
    id,
    category: values.category ?? "Teknologi",
    thumbnailUrl: values.thumbnailUrl?.trim() || undefined,
    updatedAt: new Date().toISOString(),
  };


  const next = [...items];
  next[idx] = updated;
  save(next);
  return true;
}

export function deleteArticle(id: number) {
  const items = load();
  const next = items.filter((a) => a.id !== id);
  if (next.length === items.length) return false;
  save(next);
  return true;
}
