import type { ReactNode } from "react";

export type ArticleType = {
  date: ReactNode;
  id: number;
  title: string;
  category: string;
  tags: string[];
  content: string;
  author: string;
  image?: string;
  imageUrl?: string;
};

export type CategoryType = { id: number; name: string };
export type TagType = { id: number; name: string };

export const inittialArticles: ArticleType[] = [
  { id: 1, title: "React + Tailwind", category: "Tech", tags: ["React","Tailwind"], content: "Demo content 1", author: "Admin", image: "react-tailwind.jpg", imageUrl: "https://example.com/react-tailwind.jpg", date: "2024-01-01" },
  { id: 2, title: "Admin Panel", category: "Tech", tags: ["Admin","Dashboard"], content: "Demo content 2", author: "Admin", image: "admin-panel.jpg", imageUrl: "https://example.com/admin-panel.jpg", date: "2024-01-02" }
];


export const initialCategories: CategoryType[] = [
  { id: 1, name: "Tech" }, { id: 2, name: "Life" }, { id: 3, name: "News" }
];

export const initialTags: TagType[] = [
  { id: 1, name: "React" }, { id: 2, name: "Tailwind" }, { id: 3, name: "Vite" }, { id: 4, name: "Admin" }
];
