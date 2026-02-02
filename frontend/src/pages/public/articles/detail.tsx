import PublicLayout from "../../../components/layouts/public/PublicLayout";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Article } from "../../../data/articles.mock";
import { getPublishedArticleById } from "../../../data/publicArticles";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const articleId = Number(id);

  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!Number.isFinite(articleId)) {
      setLoading(false);
      setArticle(null);
      return;
    }

    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getPublishedArticleById(articleId);
        if (!alive) return;
        setArticle(data);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Gagal memuat artikel");
        if (alive) setArticle(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [articleId]);

  if (loading) {
    return (
      <PublicLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-600">
          Loading...
        </div>
      </PublicLayout>
    );
  }

  if (!article || error) {
    return (
      <PublicLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            {error ? "Gagal memuat artikel" : "Article not found"}
          </h2>
          {error ? <p className="text-sm text-red-700 mb-4">{error}</p> : null}
          <Link to="/articles" className="text-blue-600 hover:text-blue-800">
            ← Back to articles
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/articles" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
          ← All Articles
        </Link>

        {article.thumbnailUrl ? (
          <div className="mb-6 overflow-hidden rounded-xl border border-blue-100 bg-gray-100">
            <div className="aspect-[16/9] w-full">
              <img
                src={article.thumbnailUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : null}

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {article.category || "Uncategorized"}
            </span>
            <span className="text-gray-500 text-sm">
              {new Date(article.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-black-900 mb-4">{article.title}</h1>
        </div>

        <div className="bg-white rounded-lg p-6 border border-blue-100">
          <p className="text-black-800 leading-relaxed whitespace-pre-wrap">{article.content}</p>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-100">
          <p className="text-black-700 font-medium mb-3">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {(article.tags || []).map((tag) => (
              <span key={tag} className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
