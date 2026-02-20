import { Link } from "react-router-dom";
import type { Article } from "../../data/articles.mock";
import { Trash2, CalendarDays } from "lucide-react";
import { deleteArticle } from "../../services/adminArticle";

interface Props {
  article: Article;
  onDelete?: (id: string) => void;
}

export default function ArticleCard({ article, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden h-full">
        <Link key={article.id} to={`/admin/articles/${article.id}`} className="relative h-full">
        {article.thumbnailUrl ? (
          <div className="h-48 overflow-hidden bg-gray-100">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}${article.thumbnailUrl}`}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
          </div>
        ) : null}
        </Link>

        <div className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
              {article.category}
            </span>
          {article.status === "draft" ? (
            <span className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full">
              Draft
            </span>
          ) : (
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
              Published
            </span>
          )}

          </div>

          <h3 className="text-lg font-bold text-black-900 mb-3 line-clamp-2">
            {article.title}
          </h3>

          <div className="text-sm text-gray-600 line-clamp-2 mb-4">
            {article.excerpt || article.content}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              {new Date(article.updatedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </span>
          </div>

          <div className="mt-auto flex justify-between items-center border-t pt-3">
            <Link
              to={`/admin/articles/edit/${article.id}`}
              className="flex-1 text-center px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-semibold text-base hover:bg-blue-200 transition"
            >
              Edit
            </Link>
            <button
              className="ml-3 px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition flex items-center justify-center"
              onClick={async () => {
              if (window.confirm("Hapus artikel ini?")) {
                try {
                  await deleteArticle(article.id);
                  onDelete?.(article.id.toString()); // update state di parent
                  alert("Artikel berhasil dihapus");
                } catch (e: any) {
                  alert(e?.message ?? "Gagal hapus artikel");
                }
              }
            }}

            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
  );
}
