import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchCourses,
  deleteAdminCourse,
  type ApiCourse,
} from "../../../services/adminCourse";
import { SquarePen, Trash2, Search } from "lucide-react";

export default function AdminCoursesPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiCourse[]>([]);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetchCourses();
      setItems(res.mata_kuliah ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal load mata kuliah");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: string) {
    const ok = window.confirm("Hapus data mata kuliah ini?");
    if (!ok) return;
    try {
      await deleteAdminCourse(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus");
    }
  }

  const filteredItems = items.filter(
    (m) =>
      m.kode_mk.toLowerCase().includes(search.toLowerCase()) ||
      m.nama_mk.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black">Mata Kuliah</h1>
          <p className="text-black/60 text-sm">Manage your courses</p>
        </div>
        <Link
          to="/admin/course/create"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 text-center"
        >
          + Create
        </Link>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Cari kode atau nama mata kuliah..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 pl-9 text-sm"
        />
      </div>

      {err ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {err}
        </div>
      ) : null}

      {loading ? (
        <div className="text-black/70">Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-black/70">
          Belum ada data mata kuliah.
        </div>
      ) : (
        <>
          <div className="hidden md:block rounded-xl border bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead className="bg-blue-50 text-black">
                  <tr>
                    <th className="text-left p-3">Kode Mata Kuliah</th>
                    <th className="text-left p-3">Nama Mata Kuliah</th>
                    <th className="text-left p-3">SKS</th>
                    <th className="text-left p-3">Program</th>
                    <th className="text-right p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((m) => (
                    <tr key={m.id} className="border-t">
                      <td className="p-3 font-semibold text-black">{m.kode_mk}</td>
                      <td className="p-3 text-black/70">{m.nama_mk}</td>
                      <td className="p-3 text-black/70">{m.sks}</td>
                      <td className="p-3 text-black/70">{m.Program ?? "—"}</td>
                      <td className="p-3 text-right space-x-2">
                        <Link
                          to={`/admin/course/edit/${m.id}`}
                          className="px-3 py-1 text-blue-700 hover:bg-blue-50 rounded"
                        >
                          <SquarePen className="inline-block w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => onDelete(m.id)}
                          className="px-3 py-1 text-red-700 hover:bg-red-50 rounded"
                          type="button"
                        >
                          <Trash2 className="inline-block w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden space-y-3">
            {filteredItems.map((m) => (
              <div key={m.id} className="rounded-xl border bg-white p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{m.nama_mk}</div>
                    <div className="text-sm text-slate-500">{m.kode_mk}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/course/edit/${m.id}`}
                      className="p-2 text-blue-700 hover:bg-blue-50 rounded"
                    >
                      <SquarePen className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onDelete(m.id)}
                      className="p-2 text-red-700 hover:bg-red-50 rounded"
                      type="button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 text-sm text-slate-600 flex justify-between">
                  <span>SKS: {m.sks}</span>
                  <span>{m.Program ?? "—"}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}