import { useEffect, useState } from "react";
import { fetchAdminArticles, type ApiArticle } from "../../services/adminArticle";
import { fetchCourses, type ApiCourse } from "../../services/adminCourse";
import { fetchProfessors, type ApiProfessor } from "../../services/adminProfessor";
import { BookOpen, Users, FileText, Award } from "lucide-react";

export default function DashboardPage() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [professors, setProfessors] = useState<ApiProfessor[]>([]);

  useEffect(() => {
    async function load() {
      const art = await fetchAdminArticles();
      setArticles(art.articles ?? []);

      const mk = await fetchCourses();
      setCourses(mk.mata_kuliah ?? []);

      const dos = await fetchProfessors();
      setProfessors(dos.dosens ?? []);
    }
    load();
  }, []);

  const latestCourses = courses.slice(0, 4);
  const latestArticles = articles.slice(0, 4);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} title="Total Mata Kuliah" value={courses.length} color="bg-blue-500" />
        <StatCard icon={Users} title="Total Dosen" value={professors.length} color="bg-green-500" />
        <StatCard icon={FileText} title="Total Artikel" value={articles.length} color="bg-purple-500" />
        <StatCard icon={Award} title="Publikasi Dosen" value={professors.filter(p => p.publikasi).length} color="bg-orange-500" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-semibold text-lg mb-4">Mata Kuliah Terbaru</h2>

          <div className="space-y-3">
            {latestCourses.map((c) => (
              <div key={c.id} className="rounded-xl bg-slate-50 p-4 flex justify-between">
                <div>
                  <div className="font-medium">{c.nama_mk}</div>
                  <div className="text-sm text-slate-500">Kode: {c.kode_mk}</div>
                </div>

                <div className="text-right text-sm text-slate-500">
                  <div>{c.sks ?? 3} SKS</div>
                  <div>Sem. {c.semester ?? "-"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-semibold text-lg mb-4">Artikel Terbaru</h2>

          <div className="space-y-3">
            {latestArticles.map((a) => (
              <div key={a.id} className="rounded-xl bg-slate-50 p-4 flex gap-3">
                <FileText className="w-5 h-5 text-slate-400 mt-1" />

                <div className="flex-1">
                  <div className="font-medium line-clamp-1">{a.judul}</div>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-600">
                      {a.category?.name ?? "Umum"}
                    </span>

                    <span>
                      {new Date(a.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= */
/* COMPONENT STAT CARD */
/* ========================= */

function StatCard({
  icon: Icon,
  title,
  value,
  color,
}: {
  icon: any;
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${color}`}>
        <Icon className="w-6 h-6" />
      </div>

      <div>
        <div className="text-sm text-slate-500">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}