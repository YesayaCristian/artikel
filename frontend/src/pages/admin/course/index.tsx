import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchCourses,
  deleteAdminCourse,
  type ApiCourse,
} from "../../../services/adminCourse";

export default function AdminCoursesPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiCourse[]>([]);
  const [err, setErr] = useState("");

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

  async function onDelete(id: number) {
    const ok = window.confirm("Hapus data mata kuliah ini?");
    if (!ok) return;

    try {
      await deleteAdminCourse(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus");
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Mata Kuliah</h1>
          <p className="text-black/60">Manage your courses</p>
        </div>

        <Link
          to="/admin/course/create"
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
        <div className="rounded-xl border bg-white p-6 text-black/70">
          Belum ada data mata kuliah.
        </div>
      ) : (
        <div className="rounded-xl border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-black">
              <tr>
                <th className="text-left p-3">Kode MK</th>
                <th className="text-left p-3">Nama MK</th>
                <th className="text-left p-3">SKS</th>
                <th className="text-left p-3">Semester</th>
                <th className="text-left p-3">Jenis</th>
                <th className="text-left p-3">Program Studi</th>
                <th className="text-left p-3">Created</th>
                <th className="text-right p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="p-3 font-semibold text-black">
                    {m.kode_mk}
                  </td>
                  <td className="p-3 text-black/70">{m.nama_mk}</td>
                  <td className="p-3 text-black/70">{m.sks}</td>
                  <td className="p-3 text-black/70">{m.semester}</td>
                  <td className="p-3 text-black/70 capitalize">
                    {m.jenis_mk}
                  </td>
                  <td className="p-3 text-black/70">
                    {m.nama_prodi ?? "—"}
                  </td>
                  <td className="p-3 text-black/70">
                    {m.created_at
                      ? new Date(m.created_at).toLocaleString()
                      : "—"}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      to={`/admin/course/edit/${m.id}`}
                      className="px-3 py-1 rounded-lg border text-blue-700 hover:bg-blue-50"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(m.id)}
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
