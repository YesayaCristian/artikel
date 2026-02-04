export type ArticleStatus = "draft" | "published";

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnailUrl?: string | null;
  category: string;
  updatedAt: string;
};

export const initialArticles: Article[] = [
  {
    id: 1,
    title: "Contoh Artikel Pertama",
    slug: "contoh-artikel-pertama",
    excerpt: "Ini ringkasan artikel pertama.",
    content: "Isi artikel pertama...",
    thumbnailUrl: "https://picsum.photos/seed/artikel1/800/450",
    category: "Teknologi",
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Draft Artikel",
    slug: "draft-artikel",
    excerpt: "Ini artikel masih draft.",
    content: "Isi draft...",
    thumbnailUrl: "https://picsum.photos/seed/artikel2/800/450",
    category: "Tutorial",
    updatedAt: new Date().toISOString(),
  },
];

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
