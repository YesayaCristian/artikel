import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAdminArticles, deleteArticle, type ApiArticle } from "../../../services/adminArticle";

export default function AdminArticlesPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiArticle[]>([]);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetchAdminArticles();
      setItems(res.articles ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal load articles");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: number) {
    const ok = window.confirm("Hapus artikel ini?");
    if (!ok) return;

    try {
      await deleteArticle(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus");
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Articles</h1>
          <p className="text-black/60">Manage your articles</p>
        </div>

        <Link
          to="/admin/articles/create"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          + Create
        </Link>
      </div>

      {err ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {err}
        </div>
      ) : null}

      {loading ? (
        <div className="text-black/70">Loading...</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-black/70">Belum ada artikel.</div>
      ) : (
        <div className="rounded-xl border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-black">
              <tr>
                <th className="text-left p-3">Judul</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Author</th>
                <th className="text-left p-3">Created</th>
                <th className="text-right p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-3 text-black font-semibold">{a.judul}</td>
                  <td className="p-3 text-black/70">{a.category?.name ?? "Uncategorized"}</td>
                  <td className="p-3 text-black/70">{a.author}</td>
                  <td className="p-3 text-black/70">
                    {new Date(a.created_at).toLocaleString()}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      to={`/admin/articles/edit/${a.id}`}
                      className="px-3 py-1 rounded-lg border text-blue-700 hover:bg-blue-50"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(a.id)}
                      className="px-3 py-1 rounded-lg border text-red-700 hover:bg-red-50"
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
