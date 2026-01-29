import PublicLayout from "../../components/layout/PublicLayout";
import ArticleCard from "../../components/article/ArticleCard";
import type { ArticleType } from "../../mocks/db";
import { inittialArticles } from "../../mocks/db";

export default function LandingPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inittialArticles.map((a: ArticleType) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>

        <div className="text-center text-blue-600">
          <p>Found {inittialArticles.length} articles to explore</p>
        </div>
      </div>
    </PublicLayout>
  );
}