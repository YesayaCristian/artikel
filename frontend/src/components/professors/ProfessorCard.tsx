import { Link } from "react-router-dom";
import type { Professor } from "../../data/publicProfessors";

const BASE = import.meta.env.VITE_API_BASE_URL as string;

export default function ProfessorCard({ professor }: { professor: Professor }) {
  const photo = professor.foto_dosen ? `${BASE}${professor.foto_dosen}` : null;

  return (
    <Link
      to={`/professors/${professor.id}`}
      className="block bg-white rounded-xl border border-blue-100 p-5 hover:shadow-sm transition"
    >
      {photo ? (
        <div className="mb-4 overflow-hidden rounded-lg border border-blue-100 bg-gray-100">
          <div className="aspect-[16/9] w-full">
            <img
              src={photo}
              alt={professor.nama_dosen}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="mb-4 h-40 bg-gray-100 rounded-lg" />
      )}

      <div className="flex items-center gap-3 mb-3">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
          {professor.fakultas || "Uncategorized"}
        </span>
        <span className="text-gray-500 text-xs">NIDN: {professor.nidn || "-"}</span>
      </div>

      <h3 className="text-lg font-bold text-black-900 mb-2 line-clamp-1">
        {professor.nama_dosen}
      </h3>

      <p className="text-sm text-gray-600 line-clamp-2">
        {professor.program_studi || "—"}
      </p>

      <div className="mt-3 text-xs text-gray-600">
        Penelitian: <b>{professor.penelitian ? "Aktif" : "Tidak"}</b>
      </div>
    </Link>
  );
}
