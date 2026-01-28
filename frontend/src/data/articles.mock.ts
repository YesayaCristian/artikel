export type ArticleStatus = "draft" | "published";

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: ArticleStatus;
  thumbnailUrl?: string; 
  updatedAt: string;
};

export const initialArticles: Article[] = [
  {
    id: 1,
    title: "Contoh Artikel Pertama",
    slug: "contoh-artikel-pertama",
    excerpt: "Ini ringkasan artikel pertama.",
    content: "Isi artikel pertama...",
    status: "published",
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Draft Artikel",
    slug: "draft-artikel",
    excerpt: "Ini artikel masih draft.",
    content: "Isi draft...",
    status: "draft",
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
