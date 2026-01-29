import { useState } from "react";
import type { ArticleType } from "../../mocks/db";
import Button from "../../components/common/button";
import Input from "../../components/common/input"

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

  const handleSubmit = () => {
    onSave({ ...article, title, category, tags: tags.split(",").map(t=>t.trim()), content });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="mb-2"/>
      <Input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" className="mb-2"/>
      <Input value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags comma separated" className="mb-2"/>
      <textarea value={content} onChange={e=>setContent(e.target.value)} className="w-full h-32 border rounded p-2 mb-2" placeholder="Content"/>
      <div className="flex gap-2">
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={onCancel} className="bg-gray-500 hover:bg-gray-600">Cancel</Button>
      </div>
    </div>
  );
}
