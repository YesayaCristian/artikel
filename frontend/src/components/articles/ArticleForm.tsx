import { useEffect, useState } from "react";
import type { Article, ArticleStatus } from "../../data/articles.mock";
import { slugify } from "../../data/articles.mock";

export type ArticleFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: ArticleStatus;
  thumbnailUrl?: string; 
};  

type Props = {
  initial?: Article | null;
  onCancel: () => void;
  onSubmit: (values: ArticleFormValues) => void;
};

export default function ArticleForm({ initial, onCancel, onSubmit }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [status, setStatus] = useState<ArticleStatus>(initial?.status ?? "draft");

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-100";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  useEffect(() => {
    if (!initial) setSlug(slugify(title));
  }, [title, initial]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ title, slug, excerpt, content, status });
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs text-slate-500">Form</div>
          <h2 className="text-lg font-semibold text-slate-900">
            {initial ? "Edit Article" : "Create Article"}
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-2xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-700"
          >
            Save
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Title</label>
          <input className={field} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul artikel..." required />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Slug</label>
          <input className={field} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="judul-artikel" required />
          <p className="mt-1 text-xs text-slate-500">Slug dipakai untuk URL. Boleh diubah manual.</p>
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Excerpt</label>
          <textarea className={field + " h-24"} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Ringkasan singkat..." />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Content</label>
          <textarea className={field + " h-60"} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Isi artikel..." />
        </div>

        <div className="sm:col-span-1">
          <label className={label}>Status</label>
          <select className={field} value={status} onChange={(e) => setStatus(e.target.value as ArticleStatus)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="sm:col-span-1">
          <label className={label}>Updated</label>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
            {initial ? new Date(initial.updatedAt).toLocaleString() : "—"}
          </div>
        </div>
      </div>
    </form>
  );
}
