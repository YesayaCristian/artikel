import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAdminProfessor } from "../../../services/adminProfessor";
import type { ApiProfessor } from "../../../services/adminProfessor";
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-slate-900">Detail Dosen</h1>
        <Link
          to="/admin/professors"
          className="px-3 py-1.5 text-sm rounded-lg border bg-white text-slate-700 hover:bg-slate-50"
        >
          Back
        </Link>
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-4">
        <div className="flex gap-6">
          
          {/* FOTO KTP STYLE */}
          <div className="w-40 h-52 bg-slate-100 rounded-lg overflow-hidden border flex-shrink-0">
            {prof.foto_dosen ? (
              <img
                src={resolveMediaUrl(prof.foto_dosen)}
                alt={prof.nama_dosen}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-slate-400">
                No Photo
              </div>
            )}
          </div>

          {/* DATA */}
          <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <p><strong>Nama</strong></p>
            <p>{prof.nama_dosen}</p>

            <p><strong>NIDN</strong></p>
            <p>{prof.nidn}</p>

            <p><strong>Email</strong></p>
            <p>{prof.email || "—"}</p>

            <p><strong>Fakultas</strong></p>
            <p>{prof.fakultas}</p>

            <p><strong>Program Studi</strong></p>
            <p>{prof.program_studi}</p>

            <p><strong>Pekerjaan</strong></p>
            <p>{prof.pekerjaan || "—"}</p>

            <p><strong>Sinta ID</strong></p>
            <p>{prof.sinta_id || "—"}</p>

            <p><strong>Researcher ID</strong></p>
            <p>{prof.researcher_id || "—"}</p>

            <p><strong>Scopus ID</strong></p>
            <p>{prof.scopus_author_id || "—"}</p>

            <p><strong>Orcid ID</strong></p>
            <p>{prof.orchid_id || "—"}</p>

            <p><strong>Webpage</strong></p>
            <p className="truncate">{prof.webpage || "—"}</p>
          </div>
        </div>

        {/* SECTION BAWAH - FULL WIDTH */}
        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
          <p><strong>Research Interest:</strong> {prof.research_interest || "—"}</p>
          <p><strong>Penelitian:</strong> {prof.penelitian || "—"}</p>
          <p><strong>Mata Kuliah:</strong> {prof.mata_kuliah_diampu || "—"}</p>
          <p><strong>Publikasi:</strong> {prof.publikasi || "—"}</p>
          <p><strong>Project:</strong> {prof.project || "—"}</p>
          <p><strong>Pengabdian:</strong> {prof.pengabdian_masyarakat || "—"}</p>
          <p><strong>Award:</strong> {prof.award || "—"}</p>
        </div>
      </div>
    </div>
  );
}
