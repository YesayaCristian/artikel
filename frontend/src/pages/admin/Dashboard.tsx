import { listArticles } from "../../data/articles.store";

export default function DashboardPage() {
  const articles = listArticles();
  const total = articles.length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-gradient-to-br from-primary-600 to-primary-500 p-5 text-white shadow-soft">
          <div className="text-sm opacity-90">Total Articles</div>
          <div className="mt-2 text-3xl font-bold">{total}</div>
          <div className="mt-2 text-xs opacity-90">Semua artikel</div>
        </div>
      </div>
    </div>
  );
}
