import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArticleForm, { type ArticleFormValues, type ArticleFormInitial } from "../../../components/articles/ArticleForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { fetchTags, getAdminArticle, updateAdminArticle, type ApiTag } from "../../../services/adminArticle";

function slugifyLite(text: string) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
function makeExcerpt(text: string, max = 140) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trim() + "...";
}

export default function EditArticlePage() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const articleId = Number(id);
  const validId = useMemo(() => Number.isFinite(articleId), [articleId]);

  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<ArticleFormInitial | null>(null);
  const [tags, setTags] = useState<ApiTag[]>([]);

  useEffect(() => {
    if (!validId) return;

    (async () => {
      try {
        const [a, t] = await Promise.all([getAdminArticle(articleId), fetchTags()]);
        setTags(t.tags ?? []);

        setInitial({
          id: a.id,
          title: a.judul,
          slug: slugifyLite(a.judul),
          excerpt: makeExcerpt(a.konten),
          content: a.konten,
          categoryId: a.category?.id ?? null,
          tags: (a.tags ?? []).map((x) => x.name),
          thumbnailUrl: "",
          updatedAt: a.created_at,
        });
      } catch {
        setInitial(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [articleId, validId]);

  if (!validId) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Invalid ID</h1>
        <button className="px-4 py-2 rounded-lg border" onClick={() => nav("/admin/articles")}>
          Back
        </button>
      </div>
    );
  }

  if (loading) return <div className="bg-white border rounded-xl p-6">Loading...</div>;

  if (!initial) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-2">Artikel tidak ditemukan</h1>
        <p className="text-gray-600 mb-4">Mungkin sudah dihapus atau ID salah.</p>
        <button className="px-4 py-2 rounded-lg border" onClick={() => nav("/admin/articles")}>
          Back to Articles
        </button>
      </div>
    );
  }

  function mapTagNamesToIds(tagNames: string[]) {
    const lower = new Map(tags.map((t) => [t.name.toLowerCase(), t.id]));
    return tagNames
      .map((n) => lower.get(n.toLowerCase()))
      .filter((x): x is number => typeof x === "number");
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Edit Article</h1>
        <p className="text-gray-600 text-sm">Update artikel #{initial.id}</p>
      </div>

      <ArticleForm
        initial={initial}
        onCancel={() => nav("/admin/articles")}
        onSubmit={async (values: ArticleFormValues) => {
          try {
            await updateAdminArticle(articleId, {
              judul: values.title,
              konten: values.content,
              category_id: values.categoryId ?? null,
              tag_ids: mapTagNamesToIds(values.tags),
              images: values.thumbnailFile ? [values.thumbnailFile] : undefined,
            });

            toast({ type: "success", title: "Updated", message: "Artikel berhasil diupdate." });
            nav("/admin/articles");
          } catch (e: any) {
            toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal update." });
          }
        }}
      />
    </div>
  );
}
