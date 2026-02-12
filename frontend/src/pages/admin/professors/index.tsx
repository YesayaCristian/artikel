import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProfessors, deleteAdminProfessor, type ApiProfessor } from "../../../services/adminProfessor";

export default function AdminProfessorsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ApiProfessor[]>([]);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetchProfessors();
      setItems(res.dosens ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Gagal load dosen");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: number) {
    const ok = window.confirm("Hapus data dosen ini?");
    if (!ok) return;

    try {
      await deleteAdminProfessor(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "Gagal hapus");
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Professors</h1>
          <p className="text-black/60">Manage your professors</p>
        </div>

        <Link
          to="/admin/professors/create"
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
        <div className="rounded-xl border bg-white p-6 text-black/70">Belum ada data dosen.</div>
      ) : (
        <div className="rounded-xl border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-black">
              <tr>
                <th className="p-3 text-left">Foto</th>
                <th className="p-3 text-left">Nama Dosen</th>
                <th className="p-3 text-left">NIDN</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Fakultas</th>
                <th className="p-3 text-left">Program Studi</th>
                <th className="p-3 text-left">Penelitian</th>
                <th className="p-3 text-left">Webpage</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
           <tbody>
              {items.map((d) => (
                <tr key={d.id} className="border-t">
                  
                  {/* 🔥 FOTO DOSEN */}
                  <td className="p-3">
                    {d.foto_dosen ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${d.foto_dosen}`}
                        alt={d.nama_dosen}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />
                    ) : (
                      <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-lg text-xs text-gray-400 border">
                        No Photo
                      </div>
                    )}
                  </td>

                  <td className="p-3">{d.nama_dosen}</td>
                  <td className="p-3">{d.nidn}</td>
                  <td className="p-3">{d.email}</td>
                  <td className="p-3">{d.fakultas}</td>
                  <td className="p-3">{d.program_studi}</td>
                  <td className="p-3">{d.penelitian}</td>
                  <td className="p-3">{d.webpage}</td>

                  <td className="p-3 text-right space-x-2">
                    <Link
                      to={`/admin/professors/detail/${d.id}`}
                      className="px-3 py-1 rounded-lg border text-green-700 hover:bg-green-50"
                    >
                      Detail
                    </Link>

                    <Link
                      to={`/admin/professors/edit/${d.id}`}
                      className="px-3 py-1 rounded-lg border text-blue-700 hover:bg-blue-50"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => onDelete(d.id)}
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