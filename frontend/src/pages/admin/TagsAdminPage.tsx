import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import type { TagType } from "../../mocks/db";
import { initialTags } from "../../mocks/db";

export default function TagsAdminPage() {
  const [tags, setTags] = useState<TagType[]>(initialTags);
  const [newTag, setNewTag] = useState("");

  const handleAdd = () => {
    if (newTag.trim()) {
      setTags(prev => [...prev, {
        id: Date.now(),
        name: newTag.trim()
      }]);
      setNewTag("");
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this tag?")) {
      setTags(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Manage Tags</h1>
          <div className="flex gap-2">
            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="New tag name"
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
                {tags.map(tag => (
                  <tr key={tag.id} className="border-t border-blue-100 hover:bg-blue-50">
                    <td className="p-4 text-blue-800">{tag.id}</td>
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {tag.name}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(tag.id)}
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
          Total: {tags.length} tags
        </div>
      </div>
    </AdminLayout>
  );
}