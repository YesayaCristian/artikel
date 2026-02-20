import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAdminArticles,
  type ApiArticle,
} from "../../../services/adminArticle";
import {
  fetchCategories,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../../../services/adminTaxonomy";
import ArticleCard from "../../../components/articles/ArticleCard";
import type { Article, Category } from "../../../types/apiArticles";
import CategoryModal from "../../../components/articles/CategoryModal";

function mapApiArticleToArticle(a: ApiArticle): Article {
  return {
    id: a.id,
    title: a.judul,
    slug: a.judul.toLowerCase().replace(/\s+/g, "-"),
    category: a.category?.name ?? "Uncategorized",
    updatedAt: a.created_at,
    excerpt: a.konten.slice(0, 100) + "...",
    content: a.konten,
    thumbnailUrl: a.images?.[0] ?? "",
    tags: (a.tags ?? []).map((t) => t.name),
  };
}

export default function AdminArticlesPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiArticle[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetchAdminArticles();
      setItems(res.articles ?? []);
      const catRes = await fetchCategories();
      setCategories(catRes.categories ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal load articles");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);


  async function onDeleteCategory(id: number) {
    if (!window.confirm("Hapus kategori ini?")) return;
    try {
      await deleteCategoryApi(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus kategori");
    }
  }

  async function onAddCategory() {
    if (!newCategory.trim()) return;
    const res = await createCategoryApi(newCategory.trim());
    setCategories((prev) => [...prev, (res as { category: Category }).category]);
    setNewCategory("");
  }

  async function onUpdateCategory() {
    if (!editCategoryId || !editCategoryName.trim()) return;
    const res = await updateCategoryApi(editCategoryId, editCategoryName.trim());
    setCategories((prev) =>
      prev.map((c) => (c.id === editCategoryId ? (res as { category: Category }).category : c))
    );
    setEditCategoryId(null);
    setEditCategoryName("");
  }

  const filteredItems = items.filter((a) => {
    const matchSearch = a.judul.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === null || a.category?.id === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Articles</h1>
          <p className="text-black/60">Manage your articles</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="px-4 py-2 rounded-xl border bg-white text-blue-700 hover:bg-blue-50"
          >
            
            Manage Categories
          </button>
          <Link
            to="/admin/articles/create"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            + Create
          </Link>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1"
        />
        <select
          value={categoryFilter ?? ""}
          onChange={(e) =>
            setCategoryFilter(e.target.value ? Number(e.target.value) : null)
          }
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-black/70">Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-black/70">
          Belum ada artikel.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((a) => {
            const mapped = mapApiArticleToArticle(a);
            return (
              <div key={a.id} className="relative h-full">
                <ArticleCard key={a.id} article={mapped} onDelete={(id) => {setItems((prev) => prev.filter((x) => x.id !== Number(id)));}}/>
              </div>
            );
          })}
        </div>
      )}

      {showCategoryModal && (
        <CategoryModal
          categories={categories}
          onAdd={onAddCategory}
          onUpdate={onUpdateCategory}
          onDelete={onDeleteCategory}
          onClose={() => setShowCategoryModal(false)}
        />
      )}
    </div>
  );
}
