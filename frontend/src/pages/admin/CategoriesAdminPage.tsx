import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import type { CategoryType } from "../../mocks/db";
import { initialCategories } from "../../mocks/db";

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<CategoryType[]>(initialCategories);
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = () => {
    if (newCategory.trim()) {
      setCategories(prev => [...prev, {
        id: Date.now(),
        name: newCategory.trim()
      }]);
      setNewCategory("");
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this category?")) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Manage Categories</h1>
          <div className="flex gap-2">
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              className="px-4 py-2 border border-blue-300 rounded-lg"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-blue-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left p-4 font-medium text-blue-900">ID</th>
                  <th className="text-left p-4 font-medium text-blue-900">Name</th>
                  <th className="text-left p-4 font-medium text-blue-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id} className="border-t border-blue-100 hover:bg-blue-50">
                    <td className="p-4 text-blue-800">{cat.id}</td>
                    <td className="p-4 font-medium text-blue-900">{cat.name}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-blue-600">
          Total: {categories.length} categories
        </div>
      </div>
    </AdminLayout>
  );
}