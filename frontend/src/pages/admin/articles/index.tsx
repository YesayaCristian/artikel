import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Article } from "../../../data/articles.mock";
import { deleteArticle, listArticles } from "../../../data/articles.store";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { Skeleton } from "../../../components/common/Skeleton";
import { useToast } from "../../../components/ui/toast/ToastProvider";

export default function ArticlesPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const [articles, setArticles] = useState<Article[]>([]);
  const [q, setQ] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  function refresh() {
    setArticles(listArticles());
  }

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => {
      refresh();
      setLoading(false);
    }, 450); // bikin "dynamic feel"
    return () => window.clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    if (!query) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.slug.toLowerCase().includes(query)
    );
  }, [q, articles]);

  function askDelete(id: number) {
    setTargetId(id);
    setConfirmOpen(true);
  }

  function doDelete() {
    if (!targetId) return;
    const ok = deleteArticle(targetId);
    refresh();
    toast({
      type: ok ? "success" : "error",
      title: ok ? "Deleted" : "Failed",
      message: ok ? "Artikel berhasil dihapus." : "Artikel tidak ditemukan.",
    });
    setTargetId(null);
  }

  return (
    <div className="space-y-4">
      <ConfirmModal
        open={confirmOpen}
        title="Hapus artikel?"
        message="Artikel yang dihapus akan hilang dari list (sementara ini hard delete)."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={doDelete}
        onClose={() => setConfirmOpen(false)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Articles</h1>
        </div>

        <Link
          to="/admin/articles/create"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-700"
        >
          <span>＋</span> New Article
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-sm">
          <span className="text-slate-400">⌕</span>
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Search title / slug..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <button
          className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          onClick={() => {
            setLoading(true);
            window.setTimeout(() => {
              refresh();
              setLoading(false);
              toast({ type: "info", title: "Refreshed", message: "Data diperbarui." });
            }, 350);
          }}
        >
          Refresh
        </button>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block overflow-hidden rounded-3xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Title</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
              <th className="text-left px-4 py-3 font-semibold">Updated</th>
              <th className="text-left px-4 py-3 font-semibold w-[180px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-[70%]" />
                    <Skeleton className="mt-2 h-3 w-[40%]" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Skeleton className="h-4 w-10" />
                      <Skeleton className="h-4 w-14" />
                    </div>
                  </td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={4}>
                  Tidak ada artikel.
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a.id} className="border-t hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{a.title}</div>
                    <div className="text-xs text-slate-500">{a.slug}</div>
                  </td>

                  <td className="px-4 py-3">
                    {a.status === "published" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-200">
                        ● Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                        ● Draft
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {new Date(a.updatedAt).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/articles/edit/${a.id}`}
                        className="text-primary-700 font-semibold hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        className="text-red-600 font-semibold hover:underline"
                        onClick={() => askDelete(a.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-3 sm:hidden">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-3xl border bg-white p-4 shadow-sm">
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="mt-2 h-3 w-[45%]" />
              <div className="mt-4 flex gap-2">
                <Skeleton className="h-10 w-full rounded-2xl" />
                <Skeleton className="h-10 w-full rounded-2xl" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border bg-white p-4 text-slate-500">
            Tidak ada artikel.
          </div>
        ) : (
          filtered.map((a) => (
            <div key={a.id} className="rounded-3xl border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-900">{a.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{a.slug}</div>
                </div>

                {a.status === "published" ? (
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-green-200">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                    Draft
                  </span>
                )}
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Updated: {new Date(a.updatedAt).toLocaleString()}
              </div>

              <div className="mt-4 flex gap-3">
                <Link
                  to={`/admin/articles/edit/${a.id}`}
                  className="flex-1 rounded-2xl border px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50 text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => askDelete(a.id)}
                  className="flex-1 rounded-2xl border px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
