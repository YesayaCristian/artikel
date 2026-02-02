import { useEffect, useMemo, useState } from "react";
import PublicLayout from "../../../components/layouts/public/PublicLayout";
import ProfessorCard from "../../../components/professors/ProfessorCard";
import type { Professor } from "../../../data/publicProfessors";
import { listPublishedProfessors } from "../../../data/publicProfessors";

export default function DosenPage() {
  const [loading, setLoading] = useState(true);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [error, setError] = useState("");

  // search
  const [q, setQ] = useState("");

  // filter fakultas
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await listPublishedProfessors();
        if (!alive) return;
        setProfessors(data);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Gagal fetch dosen");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const categoryOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of professors) set.add(p.fakultas || "Uncategorized");
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [professors]);

  function clearFilters() {
    setCategory("all");
    setQ("");
  }

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();

    return professors.filter((p) => {
      const matchSearch =
        !query ||
        (p.nama_dosen || "").toLowerCase().includes(query) ||
        (p.nidn || "").toLowerCase().includes(query) ||
        (p.fakultas || "").toLowerCase().includes(query) ||
        (p.program_studi || "").toLowerCase().includes(query);

      if (!matchSearch) return false;

      const matchCategory =
        category === "all" || (p.fakultas || "Uncategorized") === category;

      if (!matchCategory) return false;

      return true;
    });
  }, [professors, q, category]);

  const hasActiveFilters = category !== "all" || q.trim().length > 0;

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black-900 mb-2">All Dosen</h1>
          <p className="text-black-600">Browse our complete collection</p>
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {/* Search */}
        <div className="mb-4 flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
          <span className="text-gray-400">⌕</span>
          <input
            className="w-full bg-transparent outline-none text-sm"
            placeholder="Search nama / nidn / fakultas / prodi..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q.trim() ? (
            <button
              onClick={() => setQ("")}
              className="text-sm font-semibold text-gray-500 hover:text-gray-800"
              type="button"
            >
              ✕
            </button>
          ) : null}
        </div>

        {/* Filters row */}
        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-[260px_auto] md:items-start">
          {/* Fakultas */}
          <div className="rounded-xl border bg-white p-3">
            <div className="text-sm font-semibold text-gray-800 mb-2">Fakultas</div>
            <select
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Faculties" : c}
                </option>
              ))}
            </select>
          </div>

          {/* Reset */}
          <div className="md:pt-1">
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className={
                "w-full md:w-auto rounded-xl border px-4 py-2 text-sm font-semibold shadow-sm transition " +
                (hasActiveFilters
                  ? "bg-white text-gray-700 hover:bg-gray-50"
                  : "bg-gray-50 text-gray-400 cursor-not-allowed")
              }
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-blue-100 p-5">
                <div className="h-40 bg-gray-100 rounded-lg mb-4" />
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-3" />
                <div className="h-5 bg-gray-100 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-blue-100 p-8 text-center text-gray-600">
            Tidak ada dosen yang cocok.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProfessorCard key={p.id} professor={p} />
            ))}
          </div>
        )}

        {!loading ? (
          <div className="mt-10 text-center text-blue-500">
            Showing {filtered.length} dosen
          </div>
        ) : null}
      </div>
    </PublicLayout>
  );
}
