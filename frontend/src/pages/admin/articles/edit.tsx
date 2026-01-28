import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm from "../../../components/articles/ArticleForm";
import type { Article } from "../../../data/articles.mock";
import { getArticleById, updateArticle } from "../../../data/articles.store";

export default function EditArticlePage() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();

  const articleId = Number(id);

  const article = useMemo<Article | null>(() => {
    if (!Number.isFinite(articleId)) return null;
    return getArticleById(articleId);
  }, [articleId]);

  if (!Number.isFinite(articleId)) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Invalid ID</h1>
        <button className="px-4 py-2 rounded-lg border" onClick={() => nav("/admin/articles")}>
          Back
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Artikel tidak ditemukan</h1>
        <p className="text-gray-600 mb-4">Mungkin sudah dihapus atau ID salah.</p>
        <button className="px-4 py-2 rounded-lg border" onClick={() => nav("/admin/articles")}>
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Edit Article</h1>
        <p className="text-gray-600 text-sm">Update artikel #{article.id}</p>
      </div>

      <ArticleForm
        initial={article}
        onCancel={() => nav("/admin/articles")}
        onSubmit={(values) => {
          updateArticle(article.id, {
            ...article,
            ...values,
            updatedAt: new Date().toISOString(),
          });
          nav("/admin/articles");
        }}
      />
    </div>
  );
}
