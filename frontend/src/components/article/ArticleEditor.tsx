import { useState } from "react";
import type { ArticleType } from "../../mocks/db";

interface Props {
  article: ArticleType;
  onSave: (article: ArticleType) => void;
  onCancel: () => void;
}

export default function ArticleEditor({ article, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(article.title);
  const [category, setCategory] = useState(article.category);
  const [tags, setTags] = useState(article.tags.join(", "));
  const [content, setContent] = useState(article.content);
  const [image, setImage] = useState(article.image || "");
  const [author, setAuthor] = useState(article.author || "Admin");
  const [date, setDate] = useState(article.date || new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    onSave({ 
      ...article, 
      title, 
      category, 
      tags: tags.split(",").map(t => t.trim()).filter(t => t), 
      content,
      image: image.trim() || undefined,
      author,
      date
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm">
      <h3 className="text-lg font-bold text-blue-900 mb-4">
        {article.id === 0 ? "Add New Article" : "Edit Article"}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-blue-700 text-sm font-medium mb-1">Title *</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Article title"
            className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-700 text-sm font-medium mb-1">Author</label>
            <input
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Author name"
              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-blue-700 text-sm font-medium mb-1">Category</label>
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="e.g., Technology, Lifestyle"
            className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-blue-700 text-sm font-medium mb-1">Tags</label>
          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="React, Tailwind, JavaScript (comma separated)"
            className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* NEW: Image URL Field */}
        <div>
          <label className="block text-blue-700 text-sm font-medium mb-1">
            Featured Image URL
          </label>
          <input
            type="url"
            value={image}
            onChange={e => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-blue-500 text-xs mt-1">
            Paste image URL for featured image
          </p>
          
          {/* Image Preview */}
          {image && (
            <div className="mt-3">
              <div className="text-blue-700 text-sm mb-2">Preview:</div>
              <div className="h-48 overflow-hidden rounded-lg border border-blue-200">
                <img 
                  src={image} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-blue-700 text-sm font-medium mb-1">Content *</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write your article content here..."
            rows={6}
            className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Save Article
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}