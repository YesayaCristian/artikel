import { Link } from "react-router-dom";
import type { Article } from "../../data/articles.mock";

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  return (
    <Link to={`/articles/${article.id}`}>
      <div className="bg-white rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden h-full">
        {article.thumbnailUrl ? (
          <div className="h-48 overflow-hidden bg-gray-100">
            <img
              src={article.thumbnailUrl}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : null}

        <div className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(article.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <h3 className="text-lg font-bold text-black-900 mb-3 line-clamp-2">
            {article.title}
          </h3>

          <div className="text-sm text-gray-600 line-clamp-2 mb-4">
            {article.excerpt || article.content}
          </div>

          <div className="flex flex-wrap gap-2">
            {(article.tags || []).slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
