export type ApiCategory = { id: number; name: string; slug: string };
export type ApiTag = { id: number; name: string; slug: string };

export type ApiArticle = {
  id: number;
  judul: string;
  konten: string;
  author: string;
  created_at: string;
  images: string[];
  category?: ApiCategory | null;
  tags?: ApiTag[];
};
