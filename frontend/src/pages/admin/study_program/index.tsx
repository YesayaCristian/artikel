import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchStudyPrograms,
  deleteAdminStudyProgram,
  type ApiStudyProgram,
} from "../../../services/adminStudyProgram";

export default function AdminStudyProgramsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiStudyProgram[]>([]);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetchStudyPrograms();
      setItems(res.program_studi ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal load program studi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: number) {
    const ok = window.confirm("Hapus data program studi ini?");
    if (!ok) return;

    try {
      await deleteAdminStudyProgram(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus");
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Program Studi</h1>
          <p className="text-black/60">Manage your study programs</p>
        </div>

        <Link
          to="/admin/study_program/create"
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
          Belum ada data program studi.
        </div>
      ) : (
        <div className="rounded-xl border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-black">
              <tr>
                <th className="text-left p-3">Kode</th>
                <th className="text-left p-3">Nama Prodi</th>
                <th className="text-left p-3">Jenjang</th>
                <th className="text-left p-3">Akreditasi</th>
                <th className="text-left p-3">Fakultas</th>
                <th className="text-left p-3">Kaprodi</th>
                <th className="text-right p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3 font-semibold text-black">{p.kode_prodi}</td>
                  <td className="p-3 text-black/70">{p.nama_prodi}</td>
                  <td className="p-3 text-black/70">{p.jenjang}</td>
                  <td className="p-3 text-black/70">{p.akreditasi}</td>
                  <td className="p-3 text-black/70">
                    {p.fakultas?.nama_fakultas ?? "—"}
                  </td>
                  <td className="p-3 text-black/70">{p.kaprodi}</td>
                  <td className="p-3 text-right space-x-2">
                    <Link
                      to={`/admin/study_program/edit/${p.id}`}
                      className="px-3 py-1 rounded-lg border text-blue-700 hover:bg-blue-50"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(p.id)}
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
