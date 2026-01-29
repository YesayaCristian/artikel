from django.contrib import admin
from .models import Article, ArticleImage, Category, Tag

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name",)

class ArticleImageInline(admin.TabularInline):
    model = ArticleImage
    extra = 0

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("judul", "author", "category", "created_at")
    search_fields = ("judul", "konten")
    list_filter = ("category", "tags", "created_at")
    inlines = [ArticleImageInline]

@admin.register(ArticleImage)
class ArticleImageAdmin(admin.ModelAdmin):
    list_display = ("article", "image")
