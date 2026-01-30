import { useEffect, useMemo, useState } from "react";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import ConfirmModal from "../../../components/common/ConfirmModal";
import { Skeleton } from "../../../components/common/Skeleton";
import {
  fetchTags,
  createTagApi,
  updateTagApi,
  deleteTagApi,
  type Tag,
} from "../../../services/adminTaxonomy";
  
export default function TagsPage() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);

  const [q, setQ] = useState("");
  const [name, setName] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  async function refresh() {
    try {
      const res = await fetchTags();
      setTags(res.tags ?? []);
    } catch (e: any) {
      toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal load tags" });
      setTags([]);
    }
  }

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(async () => {
      await refresh();
      setLoading(false);
    }, 450);
    return () => window.clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    if (!query) return tags;
    return tags.filter(
      (t) => t.name.toLowerCase().includes(query) || t.slug.toLowerCase().includes(query)
    );
  }, [q, tags]);

  async function add() {
    const n = name.trim();
    if (!n) {
      toast({ type: "error", title: "Failed", message: "Nama tag wajib diisi." });
      return;
    }

    try {
      await createTagApi(n);
      toast({ type: "success", title: "Created", message: "Tag berhasil ditambah." });
      setName("");

      setLoading(true);
      window.setTimeout(async () => {
        await refresh();
        setLoading(false);
      }, 250);
    } catch (e: any) {
      toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal tambah tag" });
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
      toast({ type: "error", title: "Failed", message: "Nama tag wajib diisi." });
      return;
    }

    try {
      await updateTagApi(editId, n);
      toast({ type: "success", title: "Updated", message: "Tag berhasil diupdate." });
      setEditId(null);
      setEditName("");

      setLoading(true);
      window.setTimeout(async () => {
        await refresh();
        setLoading(false);
      }, 250);
    } catch (e: any) {
      toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal update tag" });
    }
  }

  function askDelete(id: number) {
    setTargetId(id);
    setConfirmOpen(true);
  }

  async function doDelete() {
    if (!targetId) return;

    try {
      await deleteTagApi(targetId);
      toast({ type: "success", title: "Deleted", message: "Tag dihapus." });
    } catch (e: any) {
      toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal hapus tag" });
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
        title="Hapus tag?"
        message="Tag akan dihapus dari daftar."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={doDelete}
        onClose={() => setConfirmOpen(false)}
      />

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Tags</h1>
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
          placeholder="Nama tag baru..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="rounded-2xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-700"
          onClick={add}
        >
          Add Tag
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
                    <Skeleton className="h-4 w-[40%]" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-[45%]" />
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
                  Tidak ada tag.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="border-t hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3">
                    {editId === t.id ? (
                      <input
                        className="w-full rounded-xl border px-3 py-2 text-sm"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      <div className="font-semibold text-slate-900">#{t.name}</div>
                    )}
                  </td>

                  <td className="px-4 py-3 text-slate-600">{t.slug}</td>

                  <td className="px-4 py-3">
                    {editId === t.id ? (
                      <div className="flex gap-3">
                        <button className="text-primary-700 font-semibold hover:underline" onClick={saveEdit}>
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
                        <button className="text-primary-700 font-semibold hover:underline" onClick={() => startEdit(t.id, t.name)}>
                          Edit
                        </button>
                        <button className="text-red-600 font-semibold hover:underline" onClick={() => askDelete(t.id)}>
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
