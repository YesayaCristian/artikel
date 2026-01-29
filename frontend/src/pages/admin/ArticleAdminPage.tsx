import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import ArticleEditor from "../../components/article/ArticleEditor";
import type { ArticleType } from "../../mocks/db";
import { inittialArticles } from "../../mocks/db";

export default function ArticlesAdminPage() {
  const [articles, setArticles] = useState<ArticleType[]>(inittialArticles);
  const [editing, setEditing] = useState<ArticleType | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this article?")) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleSave = (article: ArticleType) => {
    if (article.id === 0) {
      setArticles(prev => [...prev, { ...article, id: Date.now() }]);
    } else {
      setArticles(prev => prev.map(a => a.id === article.id ? article : a));
    }
    setShowForm(false);
    setEditing(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Manage Articles</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            + Add Article
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <ArticleEditor
              article={editing || { 
                id: 0, 
                title: "", 
                category: "", 
                tags: [], 
                content: "",
                author: "Admin",
                date: new Date().toISOString().split('T')[0]
              }}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditing(null); }}
            />
          </div>
        )}

        <div className="bg-white rounded-xl border border-blue-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left p-4 font-medium text-blue-900">Title</th>
                  <th className="text-left p-4 font-medium text-blue-900">Category</th>
                  <th className="text-left p-4 font-medium text-blue-900">Tags</th>
                  <th className="text-left p-4 font-medium text-blue-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(a => (
                  <tr key={a.id} className="border-t border-blue-100 hover:bg-blue-50">
                    <td className="p-4 text-blue-800 font-medium">{a.title}</td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {a.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {a.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setEditing(a);
                            setShowForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-sm text-blue-600">
          Showing {articles.length} articles
        </div>
      </div>
    </AdminLayout>
  );
}