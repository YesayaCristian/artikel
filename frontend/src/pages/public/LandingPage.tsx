import { useEffect, useState } from "react";
import PublicLayout from "../../components/layouts/public/PublicLayout";
import ArticleCard from "../../components/articles/ArticleCard";
import type { Article } from "../../data/articles.mock";
import { listPublishedArticles } from "../../data/publicArticles";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const all = await listPublishedArticles();
        if (!alive) return;

        setArticles(all.slice(0, 6)); // latest 6 (backend sudah order -created_at)
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Gagal fetch articles");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black-900 mb-4">
            Welcome to My Article Web
          </h1>
          <p className="text-xl text-black-700">
            Discover and explore our latest articles
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-black-900 mb-6">
            Latest Articles
          </h2>

          {error ? (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-blue-100 p-5">
                  <div className="h-40 bg-gray-100 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2 mb-3" />
                  <div className="h-5 bg-gray-100 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white rounded-xl border border-blue-100 p-8 text-center text-gray-600">
              Belum ada artikel yang dipublish.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>

        {!loading ? (
          <div className="text-center text-blue-600">
            <p>Found {articles.length} articles to explore</p>
          </div>
        ) : null}
      </div>
    </PublicLayout>
  );
}
