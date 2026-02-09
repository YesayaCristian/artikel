import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAdminProfessor} from "../../../services/adminProfessor";
import type{ ApiProfessor} from "../../../services/adminProfessor";
import { resolveMediaUrl } from "../../../lib/media";

export default function ProfessorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [prof, setProf] = useState<ApiProfessor | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getAdminProfessor(Number(id));
      setProf(data);
    }
    load();
  }, [id]);

  if (!prof) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Detail Dosen</h1>
        <Link
          to="/admin/professors"
          className="px-4 py-2 rounded-xl border bg-white text-slate-700 hover:bg-slate-50"
        >
          Back
        </Link>
      </div>

      <div className="rounded-xl border bg-white shadow-md overflow-hidden">
        {/* Foto */}
        {prof.foto_dosen && (
          <div className="w-full h-64 bg-slate-100">
            <img
              src={resolveMediaUrl(prof.foto_dosen)}
              alt={prof.nama_dosen}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Info */}
        <div className="p-6 grid gap-4 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{prof.nama_dosen}</h2>
            <p className="text-sm text-slate-500">NIDN: {prof.nidn}</p>
            <p className="text-sm text-slate-500">Email: {prof.email ?? "—"}</p>
          </div>

          <div>
            <p className="text-sm text-slate-700">
              <strong>Fakultas:</strong> {prof.fakultas}
            </p>
            <p className="text-sm text-slate-700">
              <strong>Program Studi:</strong> {prof.program_studi}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-slate-700">
              <strong>Penelitian:</strong> {prof.penelitian || "—"}
            </p>
          </div>

          {/* Tambahkan field lain */}
          <div className="sm:col-span-2 grid grid-cols-2 gap-4 mt-4">
            <p><strong>Sinta ID:</strong> {prof.sinta_id || "—"}</p>
            <p><strong>Researcher ID:</strong> {prof.researcher_id || "—"}</p>
            <p><strong>Scopus Author ID:</strong> {prof.scopus_author_id || "—"}</p>
            <p><strong>Orchid ID:</strong> {prof.orchid_id || "—"}</p>
            <p><strong>Webpage:</strong> {prof.webpage || "—"}</p>
            <p><strong>Pekerjaan:</strong> {prof.pekerjaan || "—"}</p>
          </div>

          <div className="sm:col-span-2 mt-4">
            <p><strong>Research Interest:</strong> {prof.research_interest || "—"}</p>
            <p><strong>Mata Kuliah Diampu:</strong> {prof.mata_kuliah_diampu || "—"}</p>
            <p><strong>Publikasi:</strong> {prof.publikasi || "—"}</p>
            <p><strong>Project:</strong> {prof.project || "—"}</p>
            <p><strong>Pengabdian Masyarakat:</strong> {prof.pengabdian_masyarakat || "—"}</p>
            <p><strong>Award:</strong> {prof.award || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}