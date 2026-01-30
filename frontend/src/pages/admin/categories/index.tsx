import { useEffect, useMemo, useState } from "react";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { Skeleton } from "../../../components/common/Skeleton";
import {
  fetchCategories,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  type Category,
} from "../../../services/adminTaxonomy";

export default function CategoriesPage() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const [q, setQ] = useState("");
  const [name, setName] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  async function refresh() {
    try {
      const res = await fetchCategories();
      setCategories(res.categories ?? []);
    } catch (e: any) {
      toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal load categories" });
      setCategories([]);
    }
  }

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(async () => {
      await refresh();
      setLoading(false);
    }, 450);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    if (!query) return categories;
    return categories.filter(
      (c) => c.name.toLowerCase().includes(query) || c.slug.toLowerCase().includes(query)
    );
  }, [q, categories]);

  async function add() {
    const n = name.trim();
    if (!n) {
      toast({ type: "error", title: "Failed", message: "Nama category wajib diisi." });
      return;
    }

    try {
      await createCategoryApi(n);
      toast({ type: "success", title: "Created", message: "Category berhasil ditambah." });
      setName("");

      setLoading(true);
      window.setTimeout(async () => {
        await refresh();
        setLoading(false);
      }, 250);
    } catch (e: any) {
      toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal tambah category" });
    }
  }

  function startEdit(id: number, current: string) {
    setEditId(id);
    setEditName(current);
  }

  async function saveEdit() {
    if (!editId) return;

    const n = editName.trim();
    if (!n) {
      toast({ type: "error", title: "Failed", message: "Nama category wajib diisi." });
      return;
    }

    try {
      await updateCategoryApi(editId, n);
      toast({ type: "success", title: "Updated", message: "Category berhasil diupdate." });
      setEditId(null);
      setEditName("");

      setLoading(true);
      window.setTimeout(async () => {
        await refresh();
        setLoading(false);
      }, 250);
    } catch (e: any) {
      toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal update category" });
    }
  }

  function askDelete(id: number) {
    setTargetId(id);
    setConfirmOpen(true);
  }

  async function doDelete() {
    if (!targetId) return;

    try {
      await deleteCategoryApi(targetId);
      toast({ type: "success", title: "Deleted", message: "Category dihapus." });
    } catch (e: any) {
      toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal hapus category" });
    } finally {
      setTargetId(null);

      setLoading(true);
      window.setTimeout(async () => {
        await refresh();
        setLoading(false);
      }, 250);
    }
  }

  return (
    <div className="space-y-4">
      <ConfirmModal
        open={confirmOpen}
        title="Hapus category?"
        message="Category akan dihapus dari daftar."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={doDelete}
        onClose={() => setConfirmOpen(false)}
      />

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
          <p className="text-sm text-slate-500">Kelola kategori artikel.</p>
        </div>

        <button
          className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          onClick={() => {
            setLoading(true);
            window.setTimeout(async () => {
              await refresh();
              setLoading(false);
              toast({ type: "info", title: "Refreshed", message: "Data diperbarui." });
            }, 350);
          }}
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none"
          placeholder="Nama category baru..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="rounded-2xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-700"
          onClick={add}
        >
          Add Category
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-sm">
        <span className="text-slate-400">⌕</span>
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          placeholder="Search name / slug..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Slug</th>
              <th className="text-left px-4 py-3 font-semibold w-[180px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-[60%]" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-[40%]" />
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
                <td className="px-4 py-6 text-slate-500" colSpan={3}>
                  Tidak ada category.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="border-t hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3">
                    {editId === c.id ? (
                      <input
                        className="w-full rounded-xl border px-3 py-2 text-sm"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      <div className="font-semibold text-slate-900">{c.name}</div>
                    )}
                  </td>

                  <td className="px-4 py-3 text-slate-600">{c.slug}</td>

                  <td className="px-4 py-3">
                    {editId === c.id ? (
                      <div className="flex gap-3">
                        <button
                          className="text-primary-700 font-semibold hover:underline"
                          onClick={saveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="text-slate-600 font-semibold hover:underline"
                          onClick={() => {
                            setEditId(null);
                            setEditName("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          className="text-primary-700 font-semibold hover:underline"
                          onClick={() => startEdit(c.id, c.name)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 font-semibold hover:underline"
                          onClick={() => askDelete(c.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
