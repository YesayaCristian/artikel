export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
};

export type ApiArticle = {
  id: number;
  judul: string;
  konten: string;
  author: string;
  created_at: string;
  images: string[];
  category?: Category | null;
  tags?: Tag[];
};

export type Article = {
  id: number;
  title: string;
  slug: string;
  category: string;
  updatedAt: string;
  excerpt: string;
  content: string;
  thumbnailUrl: string;
  tags: string[];
};