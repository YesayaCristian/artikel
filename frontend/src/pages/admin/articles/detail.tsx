import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Article } from "../../../types/apiArticles";
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
        if (!data) {
          setError("Artikel tidak ditemukan");
          return;
        }
        setArticle({
          ...data,
          id: data.id || articleId,
          thumbnailUrl: data.thumbnailUrl || "",
        });
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
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!article || error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-red-700 mb-4">
          {error ? "Gagal memuat artikel" : "Article not found"}
        </h2>
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        <Link to="/admin/articles" className="text-blue-600 hover:underline">
          ← Back to articles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        to="/admin/articles"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← All Articles
      </Link>

      {/* Hero image */}
      {article.thumbnailUrl && (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
      )}

      {/* Meta info */}
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {typeof article.category === "string"
            ? article.category
            : (article.category as { name: string })?.name || "Uncategorized"}
        </span>
        <span className="text-gray-500 text-sm">
          {new Date(article.updatedAt).toLocaleDateString()}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        {article.title}
      </h1>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
          {article.content}
        </p>
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-gray-700 font-semibold mb-3">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={typeof tag === "string" ? tag : (tag as { id: number }).id}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 cursor-pointer"
              >
                #{typeof tag === "string" ? tag : (tag as { name: string }).name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}