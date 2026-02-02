import PublicLayout from "../../../components/layouts/public/PublicLayout";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Professor } from "../../../data/publicProfessors";
import { getPublishedProfessorById } from "../../../data/publicProfessors";

const BASE = import.meta.env.VITE_API_BASE_URL as string;

export default function DosenDetailPage() {
  const { id } = useParams();
  const professorId = Number(id);

  const [loading, setLoading] = useState(true);
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!Number.isFinite(professorId)) {
      setLoading(false);
      setProfessor(null);
      return;
    }

    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPublishedProfessorById(professorId);
        if (!alive) return;
        setProfessor(data);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Gagal memuat dosen");
        if (alive) setProfessor(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [professorId]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-600">
          Loading...
        </div>
      </PublicLayout>
    );
  }

  if (!professor || error) {
    return (
      <PublicLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            {error ? "Gagal memuat dosen" : "Dosen not found"}
          </h2>
          {error ? <p className="text-sm text-red-700 mb-4">{error}</p> : null}
          <Link to="/dosen" className="text-blue-600 hover:text-blue-800">
            ← Back to dosen
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const photo = professor.foto_dosen ? `${BASE}${professor.foto_dosen}` : null;

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/dosen" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← All Dosen
        </Link>

        {photo ? (
          <div className="mb-6 overflow-hidden rounded-xl border border-blue-100 bg-gray-100">
            <div className="aspect-[16/9] w-full">
              <img src={photo} alt={professor.nama_dosen} className="w-full h-full object-cover" />
            </div>
          </div>
        ) : null}

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {professor.fakultas || "Uncategorized"}
            </span>
            <span className="text-gray-500 text-sm">NIDN: {professor.nidn || "-"}</span>
          </div>

          <h1 className="text-3xl font-bold text-black-900 mb-2">{professor.nama_dosen}</h1>
          <p className="text-black-700">
            {professor.program_studi} • {professor.penelitian ? "Aktif Penelitian" : "Tidak Penelitian"}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-blue-100">
          <p className="text-black-800 leading-relaxed whitespace-pre-wrap">
            Fakultas: {professor.fakultas}
            {"\n"}Program Studi: {professor.program_studi}
            {"\n"}NIDN: {professor.nidn}
            {"\n"}Penelitian: {professor.penelitian ? "Aktif" : "Tidak"}
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
