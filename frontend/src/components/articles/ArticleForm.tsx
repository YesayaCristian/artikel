import { useEffect, useMemo, useState } from "react";
import type { Article, ArticleStatus } from "../../data/articles.mock";
import { slugify } from "../../data/articles.mock";
import { listCategories } from "../../data/categories.store";

export type ArticleFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: ArticleStatus;

  thumbnailUrl?: string; // DataURL base64
  category: string;
  tags: string[];
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

  const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnailUrl ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Teknologi");
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const categories = useMemo(() => listCategories(), []);

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-100";
  const label = "block text-sm font-semibold text-slate-700 mb-1";

  useEffect(() => {
    if (!initial) setSlug(slugify(title));
  }, [title, initial]);

  useEffect(() => {
    if (categories.length && !categories.some((c) => c.name === category)) {
      setCategory(categories[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  function addTagsFromInput(raw: string) {
    const parts = raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!parts.length) return;

    setTags((prev) => {
      const merged = [...prev, ...parts].map((x) => x.toLowerCase());
      return Array.from(new Set(merged));
    });
  }

  function handleFile(file?: File | null) {
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      setThumbnailUrl(result); // DataURL
    };
    reader.readAsDataURL(file);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      title,
      slug,
      excerpt,
      content,
      status,
      category,
      tags,
      thumbnailUrl: thumbnailUrl.trim() || undefined,
    });
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
          <input
            className={field}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul artikel..."
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Slug</label>
          <input
            className={field}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="judul-artikel"
            required
          />
        </div>

        {/* ✅ Upload Image */}
        <div className="sm:col-span-2">
          <label className={label}>Thumbnail</label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            {thumbnailUrl ? (
              <button
                type="button"
                onClick={() => setThumbnailUrl("")}
                className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            ) : null}
          </div>

          {thumbnailUrl ? (
            <div className="mt-3 overflow-hidden rounded-3xl border bg-slate-50">
              <div className="aspect-[16/9] w-full">
                <img
                  src={thumbnailUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Excerpt</label>
          <textarea
            className={field + " h-24"}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Ringkasan singkat..."
          />
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Content</label>
          <textarea
            className={field + " h-60"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Isi artikel..."
          />
        </div>

        <div className="sm:col-span-1">
          <label className={label}>Status</label>
          <select
            className={field}
            value={status}
            onChange={(e) => setStatus(e.target.value as ArticleStatus)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="sm:col-span-1">
          <label className={label}>Category</label>
          <select
            className={field}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={label}>Tags</label>
          <div className={field + " flex flex-wrap gap-2 items-center"}>
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                #{t}
                <button
                  type="button"
                  onClick={() => setTags((prev) => prev.filter((x) => x !== t))}
                  className="text-slate-500 hover:text-slate-900"
                >
                  ✕
                </button>
              </span>
            ))}

            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addTagsFromInput(tagInput);
                  setTagInput("");
                }
              }}
              placeholder="tag, Enter/koma"
              className="min-w-[160px] flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

            <button
              type="button"
              onClick={() => {
                addTagsFromInput(tagInput);
                setTagInput("");
              }}
              className="rounded-xl border bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Add
            </button>
          </div>
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
