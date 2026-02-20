import { useState } from "react";
import type { Category } from "../../types/apiArticles";

interface Props {
  categories: Category[];
  onAdd: (name: string) => void;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
}

export default function CategoryModal({ categories, onAdd, onUpdate, onDelete, onClose }: Props) {
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col">
        <h2 className="text-lg font-bold mb-4">Manage Categories</h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 mb-4"
        />

        {/* Add */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border rounded-lg px-3 py-2 flex-1"
          />
          <button
            onClick={() => {
              if (newCategory.trim()) {
                onAdd(newCategory.trim());
                setNewCategory("");
              }
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-2 border rounded-lg p-3">
          {categories
            .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
            .map((c) => (
              <div key={c.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                {editId === c.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border rounded px-2 py-1 flex-1 mr-2"
                  />
                ) : (
                  <span className="font-medium">{c.name}</span>
                )}
                <div className="flex gap-2">
                  {editId === c.id ? (
                    <>
                      <button onClick={() => { onUpdate(c.id, editName); setEditId(null); }} className="text-green-600">Save</button>
                      <button onClick={() => setEditId(null)} className="text-gray-600">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditId(c.id); setEditName(c.name); }} className="text-blue-600">Edit</button>
                      <button onClick={() => onDelete(c.id)} className="text-red-600">Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}