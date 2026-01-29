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

export type Article = {
  id: number;
  judul: string;
  konten: string;
  author: string;
  created_at: string;
  images: string[];

  category?: Category | null;
  tags?: Tag[];
};
