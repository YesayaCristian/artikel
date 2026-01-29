import AdminLayout from "../../components/layout/AdminLayout";
import { inittialArticles, initialCategories, initialTags } from "../../mocks/db";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-blue-100">
            <div className="text-blue-500 text-sm font-medium mb-2">Total Articles</div>
            <div className="text-3xl font-bold text-blue-900">{inittialArticles.length}</div>
            <div className="text-blue-600 text-sm mt-2">Manage all articles</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-blue-100">
            <div className="text-blue-500 text-sm font-medium mb-2">Categories</div>
            <div className="text-3xl font-bold text-blue-900">{initialCategories.length}</div>
            <div className="text-blue-600 text-sm mt-2">Content categories</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-blue-100">
            <div className="text-blue-500 text-sm font-medium mb-2">Tags</div>
            <div className="text-3xl font-bold text-blue-900">{initialTags.length}</div>
            <div className="text-blue-600 text-sm mt-2">Article tags</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-blue-100 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-blue-700 font-medium">Latest Article</div>
              <div className="text-blue-900">
                {inittialArticles[0]?.title || "No articles yet"}
              </div>
            </div>
            <div>
              <div className="text-blue-700 font-medium">Most Used Tag</div>
              <div className="text-blue-900">
                {initialTags[0]?.name || "No tags yet"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}