import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArticleForm, { type ArticleFormValues } from "../../../components/articles/ArticleForm";
import { useToast } from "../../../components/ui/toast/ToastProvider";
import { createAdminArticle, fetchTags, type ApiTag } from "../../../services/adminArticle";

export default function CreateArticlePage() {
  const nav = useNavigate();
  const { toast } = useToast();

  const [tags, setTags] = useState<ApiTag[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const t = await fetchTags();
        setTags(t.tags ?? []);
      } catch {
        setTags([]);
      }
    })();
  }, []);

  function mapTagNamesToIds(tagNames: string[]) {
    const lower = new Map(tags.map((t) => [t.name.toLowerCase(), t.id]));
    return tagNames
      .map((n) => lower.get(n.toLowerCase()))
      .filter((x): x is number => typeof x === "number");
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Create Article</h1>
        <p className="text-sm text-slate-500">Buat artikel baru.</p>
      </div>

      <ArticleForm
        onCancel={() => nav("/admin/articles")}
        onSubmit={async (values: ArticleFormValues) => {
          try {
            await createAdminArticle({
              judul: values.title,
              konten: values.content,
              category_id: values.categoryId ?? null,
              tag_ids: mapTagNamesToIds(values.tags),
              images: values.thumbnailFile ? [values.thumbnailFile] : undefined,
            });

            toast({ type: "success", title: "Created", message: "Artikel berhasil dibuat." });
            nav("/admin/articles");
          } catch (e: any) {
            toast({ type: "error", title: "Failed", message: e?.message ?? "Gagal membuat artikel." });
          }
        }}
      />
    </div>
  );
}
