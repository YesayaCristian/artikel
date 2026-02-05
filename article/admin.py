from django.contrib import admin
from .models import Article, ArticleImage, Dosen


# =========================
# ARTICLE ADMIN
# =========================

class ArticleImageInline(admin.TabularInline):
    model = ArticleImage
    extra = 1


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("judul", "author", "created_at")
    list_filter = ("author", "created_at")
    search_fields = ("judul", "konten", "author__username")
    date_hierarchy = "created_at"
    inlines = [ArticleImageInline]


# =========================
# DOSEN ADMIN
# =========================

@admin.register(Dosen)
class DosenAdmin(admin.ModelAdmin):
    list_display = (
        "nama_dosen",
        "nidn",
        "email",
        "fakultas",
        "program_studi",
        "penelitian",
        "created_at",
    )

    list_filter = (
        "fakultas",
        "program_studi",
        "penelitian",
        "created_at",
    )

    search_fields = (
        "nama_dosen",
        "nidn",
        "email",
        "sinta_id",
        "scopus_author_id",
        "researcher_id",
    )

    readonly_fields = ("created_at",)

    fieldsets = (
        ("Identitas Dosen", {
            "fields": (
                "nama_dosen",
                "nidn",
                "email",
                "foto_dosen",
            )
        }),
        ("ID Akademik", {
            "fields": (
                "sinta_id",
                "researcher_id",
                "scopus_author_id",
                "orchid_id",
                "webpage",
            )
        }),
        ("Pendidikan", {
            "fields": (
                "pendidikan_s1",
                "pendidikan_s2",
                "pendidikan_s3",
            )
        }),
        ("Akademik", {
            "fields": (
                "pekerjaan",
                "fakultas",
                "program_studi",
                "penelitian",
            )
        }),
        ("Aktivitas & Publikasi", {
            "fields": (
                "research_interest",
                "mata_kuliah_diampu",
                "publikasi",
                "project",
                "pengabdian_masyarakat",
                "award",
            )
        }),
        ("Metadata", {
            "fields": ("created_at",)
        }),
    )


# =========================
# ARTICLE IMAGE ADMIN
# =========================

@admin.register(ArticleImage)
class ArticleImageAdmin(admin.ModelAdmin):
    list_display = ("article", "image")
