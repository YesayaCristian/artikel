import PublicLayout from "../../components/layout/PublicLayout";
import { inittialArticles } from "../../mocks/db";
import ArticleCard from "../../components/article/ArticleCard";

export default function ArticlesPage() {
  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-black-900 mb-3">All Articles</h1>
          <p className="text-black-600">Browse our complete collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inittialArticles.map(a => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>

        <div className="mt-10 text-center text-blue-500">
          Showing {inittialArticles.length} articles
        </div>
      </div>
    </PublicLayout>
  );
}