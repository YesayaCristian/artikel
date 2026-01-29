import json
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .models import Article, ArticleImage, Category, Tag


# ---------- Helpers ----------
def parse_int_list_from_request(request, key: str):
    """
    Ambil list int dari request.data (FormData).
    Support:
    - key repeated: tag_ids=1, tag_ids=2
    - comma separated: "1,2,3"
    - JSON string: "[1,2,3]"
    """
    vals = request.data.getlist(key)
    if len(vals) > 1:
        out = []
        for v in vals:
            try:
                out.append(int(v))
            except:
                pass
        return out

    raw = request.data.get(key)
    if not raw:
        return []

    raw = str(raw).strip()

    if raw.startswith("[") and raw.endswith("]"):
        try:
            arr = json.loads(raw)
            return [int(x) for x in arr]
        except:
            return []

    parts = [p.strip() for p in raw.split(",") if p.strip()]
    out = []
    for p in parts:
        try:
            out.append(int(p))
        except:
            pass
    return out


def serialize_category(cat):
    if not cat:
        return None
    return {"id": cat.id, "name": cat.name, "slug": cat.slug}


def serialize_tags(tags_manager):
    return [{"id": t.id, "name": t.name, "slug": t.slug} for t in tags_manager.all()]


def serialize_article(article: Article):
    return {
        "id": article.id,
        "judul": article.judul,
        "konten": article.konten,
        "author": article.author.username,
        "created_at": article.created_at,
        "category": serialize_category(article.category),
        "tags": serialize_tags(article.tags),
        "images": [img.image.url for img in article.images.all()],
    }


# ---------- CATEGORY & TAG (opsional tapi berguna buat React dropdown) ----------
@api_view(["GET"])
@permission_classes([AllowAny])
def list_categories(request):
    categories = Category.objects.all().order_by("name")
    data = [{"id": c.id, "name": c.name, "slug": c.slug} for c in categories]
    return Response({"categories": data}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([AllowAny])
def list_tags(request):
    tags = Tag.objects.all().order_by("name")
    data = [{"id": t.id, "name": t.name, "slug": t.slug} for t in tags]
    return Response({"tags": data}, status=status.HTTP_200_OK)


# Kalau mau create category/tag dari API (misal admin saja), bisa pakai ini:
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_category(request):
    name = request.data.get("name")
    if not name:
        return Response({"error": "name wajib diisi"}, status=status.HTTP_400_BAD_REQUEST)
    obj, created = Category.objects.get_or_create(name=name.strip())
    return Response(
        {"message": "Category dibuat" if created else "Category sudah ada", "category": serialize_category(obj)},
        status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_tag(request):
    name = request.data.get("name")
    if not name:
        return Response({"error": "name wajib diisi"}, status=status.HTTP_400_BAD_REQUEST)
    obj, created = Tag.objects.get_or_create(name=name.strip())
    return Response(
        {"message": "Tag dibuat" if created else "Tag sudah ada", "tag": {"id": obj.id, "name": obj.name, "slug": obj.slug}},
        status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
    )


# ---------- ARTICLES ----------
# CREATE ARTICLE (Hanya untuk user login)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_article(request):
    judul = request.data.get("judul")
    konten = request.data.get("konten")
    images = request.FILES.getlist("images")

    category_id = request.data.get("category_id")  # optional
    tag_ids = parse_int_list_from_request(request, "tag_ids")  # optional

    if not judul or not konten:
        return Response({"error": "judul dan konten wajib diisi"}, status=status.HTTP_400_BAD_REQUEST)

    # category (optional)
    category_obj = None
    if category_id:
        try:
            category_obj = Category.objects.get(id=int(category_id))
        except Category.DoesNotExist:
            return Response({"error": "category tidak ditemukan"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"error": "category_id tidak valid"}, status=status.HTTP_400_BAD_REQUEST)

    article = Article.objects.create(
        judul=judul,
        konten=konten,
        author=request.user,
        category=category_obj
    )

    # tags (optional)
    if tag_ids:
        tags = Tag.objects.filter(id__in=tag_ids)
        article.tags.set(tags)

    # images (optional)
    for img in images:
        ArticleImage.objects.create(article=article, image=img)

    return Response(
        {
            "message": "Artikel berhasil dibuat",
            "article": serialize_article(article),
            "jumlah_gambar": len(images)
        },
        status=status.HTTP_201_CREATED
    )


# LIST ARTICLE (Guest dan Authenticated user bisa lihat)
@api_view(["GET"])
@permission_classes([AllowAny])
def list_article(request):
    articles = Article.objects.all().order_by("-created_at")
    data = [serialize_article(a) for a in articles]
    return Response({"articles": data}, status=status.HTTP_200_OK)


# DETAIL ARTICLE (Guest dan Authenticated user bisa lihat)
@api_view(["GET"])
@permission_classes([AllowAny])
def detail_article(request, id):
    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return Response({"error": "Artikel tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

    return Response(serialize_article(article), status=status.HTTP_200_OK)


# UPDATE ARTICLE (Hanya user login dan author)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_article(request, id):
    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return Response({"error": "Artikel tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

    if article.author != request.user:
        return Response({"error": "Tidak punya izin mengupdate artikel ini"}, status=status.HTTP_403_FORBIDDEN)

    judul = request.data.get("judul")
    konten = request.data.get("konten")
    images = request.FILES.getlist("images")

    # kalau key ada, berarti user memang ingin update field itu
    has_category_key = "category_id" in request.data
    has_tags_key = ("tag_ids" in request.data) or (len(request.data.getlist("tag_ids")) > 0)

    if judul:
        article.judul = judul
    if konten:
        article.konten = konten

    if has_category_key:
        category_id = request.data.get("category_id")
        if not category_id:
            article.category = None
        else:
            try:
                article.category = Category.objects.get(id=int(category_id))
            except Category.DoesNotExist:
                return Response({"error": "category tidak ditemukan"}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({"error": "category_id tidak valid"}, status=status.HTTP_400_BAD_REQUEST)

    article.save()

    if has_tags_key:
        tag_ids = parse_int_list_from_request(request, "tag_ids")
        tags = Tag.objects.filter(id__in=tag_ids)
        article.tags.set(tags)  # kalau kosong => clear semua tags

    if images:
        # replace images
        article.images.all().delete()
        for img in images:
            ArticleImage.objects.create(article=article, image=img)

    return Response(
        {
            "message": "Artikel berhasil diupdate",
            "article": serialize_article(article)
        },
        status=status.HTTP_200_OK
    )

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_article(request, id):
    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return Response({"error": "Artikel tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

    if article.author != request.user:
        return Response({"error": "Tidak punya izin menghapus artikel ini"}, status=status.HTTP_403_FORBIDDEN)

    article.delete()
    return Response({"message": "Artikel berhasil dihapus"}, status=status.HTTP_200_OK)
