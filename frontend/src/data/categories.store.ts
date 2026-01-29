import { slugify } from "./articles.mock";

export type Category = {
  id: number;
  name: string;
  slug: string;
  updatedAt: string;
};

const KEY = "CATEGORIES_V1";

const initialCategories: Category[] = [
  { id: 1, name: "Teknologi", slug: "teknologi", updatedAt: new Date().toISOString() },
  { id: 2, name: "Edukasi", slug: "edukasi", updatedAt: new Date().toISOString() },
  { id: 3, name: "Berita", slug: "berita", updatedAt: new Date().toISOString() },
  { id: 4, name: "Tutorial", slug: "tutorial", updatedAt: new Date().toISOString() },
  { id: 5, name: "Opini", slug: "opini", updatedAt: new Date().toISOString() },
];

function load(): Category[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialCategories;
    const parsed = JSON.parse(raw) as Category[];
    return Array.isArray(parsed) ? parsed : initialCategories;
  } catch {
    return initialCategories;
  }
}

function save(items: Category[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function listCategories(): Category[] {
  return load().sort((a, b) => a.name.localeCompare(b.name));
}

export function createCategory(name: string) {
  const items = load();
  const clean = name.trim();
  if (!clean) return { ok: false as const, message: "Nama category kosong." };

  const exists = items.some((c) => c.name.toLowerCase() === clean.toLowerCase());
  if (exists) return { ok: false as const, message: "Category sudah ada." };

  const now = new Date().toISOString();
  const nextId = items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;

  const newCategory: Category = {
    id: nextId,
    name: clean,
    slug: slugify(clean),
    updatedAt: now,
  };

  save([newCategory, ...items]);
  return { ok: true as const, data: newCategory };
}

export function updateCategory(id: number, name: string) {
  const items = load();
  const idx = items.findIndex((c) => c.id === id);
  if (idx === -1) return { ok: false as const, message: "Category tidak ditemukan." };

  const clean = name.trim();
  if (!clean) return { ok: false as const, message: "Nama category kosong." };

  const dup = items.some((c) => c.id !== id && c.name.toLowerCase() === clean.toLowerCase());
  if (dup) return { ok: false as const, message: "Nama category sudah dipakai." };

  const next = [...items];
  next[idx] = {
    ...next[idx],
    name: clean,
    slug: slugify(clean),
    updatedAt: new Date().toISOString(),
  };
  save(next);

  return { ok: true as const };
}

export function deleteCategory(id: number) {
  const items = load();
  const next = items.filter((c) => c.id !== id);
  if (next.length === items.length) return { ok: false as const, message: "Category tidak ditemukan." };
  save(next);
  return { ok: true as const };
}
