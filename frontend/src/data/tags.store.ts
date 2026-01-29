import { slugify } from "./articles.mock";

export type Tag = {
  id: number;
  name: string; // disimpan lowercase
  slug: string;
  updatedAt: string;
};

const KEY = "TAGS_V1";

const initialTags: Tag[] = [
  { id: 1, name: "react", slug: "react", updatedAt: new Date().toISOString() },
  { id: 2, name: "admin", slug: "admin", updatedAt: new Date().toISOString() },
  { id: 3, name: "tips", slug: "tips", updatedAt: new Date().toISOString() },
];

function load(): Tag[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialTags;
    const parsed = JSON.parse(raw) as Tag[];
    return Array.isArray(parsed) ? parsed : initialTags;
  } catch {
    return initialTags;
  }
}

function save(items: Tag[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function listTags(): Tag[] {
  return load().sort((a, b) => a.name.localeCompare(b.name));
}

export function createTag(name: string) {
  const items = load();
  const clean = name.trim().toLowerCase();
  if (!clean) return { ok: false as const, message: "Nama tag kosong." };

  const exists = items.some((t) => t.name === clean);
  if (exists) return { ok: false as const, message: "Tag sudah ada." };

  const now = new Date().toISOString();
  const nextId = items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;

  const newTag: Tag = {
    id: nextId,
    name: clean,
    slug: slugify(clean),
    updatedAt: now,
  };

  save([newTag, ...items]);
  return { ok: true as const, data: newTag };
}

// ✅ otomatis bikin tag baru kalau artikel pakai tag yang belum ada
export function ensureTagsExist(names: string[]) {
  const items = load();
  const set = new Set(items.map((t) => t.name));

  const now = new Date().toISOString();
  let nextId = items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;

  const add: Tag[] = [];
  for (const n of names) {
    const clean = n.trim().toLowerCase();
    if (!clean) continue;
    if (set.has(clean)) continue;

    set.add(clean);
    add.push({
      id: nextId++,
      name: clean,
      slug: slugify(clean),
      updatedAt: now,
    });
  }

  if (add.length) save([...add, ...items]);
}

export function updateTag(id: number, name: string) {
  const items = load();
  const idx = items.findIndex((t) => t.id === id);
  if (idx === -1) return { ok: false as const, message: "Tag tidak ditemukan." };

  const clean = name.trim().toLowerCase();
  if (!clean) return { ok: false as const, message: "Nama tag kosong." };

  const dup = items.some((t) => t.id !== id && t.name === clean);
  if (dup) return { ok: false as const, message: "Tag sudah ada." };

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

export function deleteTag(id: number) {
  const items = load();
  const next = items.filter((t) => t.id !== id);
  if (next.length === items.length) return { ok: false as const, message: "Tag tidak ditemukan." };
  save(next);
  return { ok: true as const };
}
