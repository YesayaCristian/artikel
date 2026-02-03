import json
from django.utils.text import slugify
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .models import Article, ArticleImage, Category, Tag, Dosen


# ---------- Helpers ----------
def require_admin(user):
    return bool(user and user.is_authenticated and user.is_staff)


def parse_bool(v):
    return str(v or "").strip().lower() in ["true", "1", "yes", "y"]


def parse_int_list_from_request(request, key: str):
    """
    Ambil list int dari request.data (FormData).
    Support:
    - key repeated: tag_ids=1, tag_ids=2
    - comma separated: "1,2,3"
    - JSON string: "[1,2,3]"
    - key kosong ("") -> dianggap clear
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
    if raw is None:
        return None  # key tidak ada sama sekali

    raw = str(raw).strip()
    if raw == "":
        return []  # key ada tapi kosong => clear

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
        "author": article.author.username if article.author else None,
        "created_at": article.created_at,
        "category": serialize_category(article.category),
        "tags": serialize_tags(article.tags),
        "images": [img.image.url for img in article.images.all()],
    }


def serialize_dosen(d: Dosen):
    return {
        "id": d.id,
        "nama_dosen": d.nama_dosen,
        "nidn": d.nidn,
        "fakultas": d.fakultas,
        "program_studi": d.program_studi,
        "penelitian": d.penelitian,
        "foto_dosen": d.foto_dosen.url if d.foto_dosen else None,
        "created_at": getattr(d, "created_at", None),
    }


# ===================== CATEGORIES =====================
@api_view(["GET"])
@permission_classes([AllowAny])
def list_categories(request):
    categories = Category.objects.all().order_by("name")
    data = [{"id": c.id, "name": c.name, "slug": c.slug} for c in categories]
    return Response({"categories": data}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_category(request):
    if not require_admin(request.user):
        return Response({"error": "Admin only"}, status=status.HTTP_403_FORBIDDEN)

    name = (request.data.get("name") or "").strip()
    if not name:
        return Response({"error": "name wajib diisi"}, status=status.HTTP_400_BAD_REQUEST)

    sl = slugify(name)
    obj, created = Category.objects.get_or_create(slug=sl, defaults={"name": name})

    if not created and obj.name != name:
        obj.name = name
        obj.slug = sl
        obj.save()

    return Response(
        {"message": "Category dibuat" if created else "Category sudah ada", "category": serialize_category(obj)},
        status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_category(request, id: int):
    if not require_admin(request.user):
        return Response({"error": "Admin only"}, status=status.HTTP_403_FORBIDDEN)

    obj = get_object_or_404(Category, id=id)

    name = (request.data.get("name") or "").strip()
    if not name:
        return Response({"error": "name wajib diisi"}, status=status.HTTP_400_BAD_REQUEST)

    obj.name = name
    obj.slug = slugify(name)
    obj.save()

    return Response({"message": "Category diupdate", "category": serialize_category(obj)}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_category(request, id: int):
    if not require_admin(request.user):
        return Response({"error": "Admin only"}, status=status.HTTP_403_FORBIDDEN)

    obj = get_object_or_404(Category, id=id)
    obj.delete()
    return Response({"message": "Category dihapus"}, status=status.HTTP_200_OK)


# ===================== TAGS =====================
@api_view(["GET"])
@permission_classes([AllowAny])
def list_tags(request):
    tags = Tag.objects.all().order_by("name")
    data = [{"id": t.id, "name": t.name, "slug": t.slug} for t in tags]
    return Response({"tags": data}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_tag(request):
    if not require_admin(request.user):
        return Response({"error": "Admin only"}, status=status.HTTP_403_FORBIDDEN)

    name = (request.data.get("name") or "").strip()
    if not name:
        return Response({"error": "name wajib diisi"}, status=status.HTTP_400_BAD_REQUEST)

    sl = slugify(name)
    obj, created = Tag.objects.get_or_create(slug=sl, defaults={"name": name})

    if not created and obj.name != name:
        obj.name = name
        obj.slug = sl
        obj.save()

    return Response(
        {"message": "Tag dibuat" if created else "Tag sudah ada", "tag": {"id": obj.id, "name": obj.name, "slug": obj.slug}},
        status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_tag(request, id: int):
    if not require_admin(request.user):
        return Response({"error": "Admin only"}, status=status.HTTP_403_FORBIDDEN)

    obj = get_object_or_404(Tag, id=id)

    name = (request.data.get("name") or "").strip()
    if not name:
        return Response({"error": "name wajib diisi"}, status=status.HTTP_400_BAD_REQUEST)

    obj.name = name
    obj.slug = slugify(name)
    obj.save()

    return Response({"message": "Tag diupdate", "tag": {"id": obj.id, "name": obj.name, "slug": obj.slug}}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_tag(request, id: int):
    if not require_admin(request.user):
        return Response({"error": "Admin only"}, status=status.HTTP_403_FORBIDDEN)

    obj = get_object_or_404(Tag, id=id)
    obj.delete()
    return Response({"message": "Tag dihapus"}, status=status.HTTP_200_OK)


# ===================== ARTICLES =====================
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

    if tag_ids is not None:
        tags = Tag.objects.filter(id__in=tag_ids)
        article.tags.set(tags)

    for img in images:
        ArticleImage.objects.create(article=article, image=img)

    return Response(
        {"message": "Artikel berhasil dibuat", "article": serialize_article(article), "jumlah_gambar": len(images)},
        status=status.HTTP_201_CREATED
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def list_article(request):
    articles = Article.objects.all().order_by("-created_at")
    data = [serialize_article(a) for a in articles]
    return Response({"articles": data}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([AllowAny])
def detail_article(request, id):
    article = get_object_or_404(Article, id=id)
    return Response({"article": serialize_article(article)}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_article(request, id):
    try:
        article = Article.objects.get(id=id)
        if article.author != request.user:
            return Response({"error": "Izin ditolak"}, status=status.HTTP_403_FORBIDDEN)

        article.judul = request.data.get("judul", article.judul)
        article.konten = request.data.get("konten", article.konten)
        article.save()

        images = request.FILES.getlist("images")
        if images:
            article.images.all().delete()
            for img in images:
                ArticleImage.objects.create(article=article, image=img)

        return Response({"message": "Artikel berhasil diupdate"}, status=status.HTTP_200_OK)
    except Article.DoesNotExist:
        return Response({"error": "Artikel tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

    # author boleh edit, admin (is_staff) juga boleh edit
    if article.author != request.user and not request.user.is_staff:
        return Response({"error": "Tidak punya izin mengupdate artikel ini"}, status=status.HTTP_403_FORBIDDEN)

    images = request.FILES.getlist("images")

    # fields
    judul = request.data.get("judul")
    konten = request.data.get("konten")

    # update category & tags hanya kalau key ada
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
        if tag_ids is None:
            tag_ids = []
        tags = Tag.objects.filter(id__in=tag_ids)
        article.tags.set(tags)

    if images:
        article.images.all().delete()
        for img in images:
            ArticleImage.objects.create(article=article, image=img)

    return Response({"message": "Artikel berhasil diupdate", "article": serialize_article(article)}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_article(request, id):
    try:
        article = Article.objects.get(id=id)
        if article.author != request.user:
            return Response({"error": "Izin ditolak"}, status=status.HTTP_403_FORBIDDEN)
        article.delete()
        return Response({"message": "Artikel berhasil dihapus"}, status=status.HTTP_200_OK)
    except Article.DoesNotExist:
        return Response({"error": "Artikel tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

    # author boleh hapus, admin juga boleh
    if article.author != request.user and not request.user.is_staff:
        return Response({"error": "Tidak punya izin menghapus artikel ini"}, status=status.HTTP_403_FORBIDDEN)

    article.delete()
    return Response({"message": "Artikel berhasil dihapus"}, status=status.HTTP_200_OK)


# ===================== DOSEN =====================
# Public READ
@api_view(["GET"])
@permission_classes([AllowAny])
def list_dosen(request):
    dosens = Dosen.objects.all().order_by("-created_at")
    return Response({"dosens": [serialize_dosen(d) for d in dosens]}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([AllowAny])
def detail_dosen(request, id: int):
    d = get_object_or_404(Dosen, id=id)
    return Response({"dosen": serialize_dosen(d)}, status=status.HTTP_200_OK)


# Admin WRITE (is_staff)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_dosen(request):
    if not require_admin(request.user):
        return Response({"error": "Admin only"}, status=status.HTTP_403_FORBIDDEN)

    try:
        dosen = Dosen.objects.create(
            nama_dosen=request.data.get("nama_dosen"),
            nidn=request.data.get("nidn"),
            fakultas=request.data.get("fakultas"),
            program_studi=request.data.get("program_studi"),
            penelitian=parse_bool(request.data.get("penelitian")),
            foto_dosen=request.FILES.get("foto_dosen"),
        )
        return Response({"message": "Dosen berhasil ditambahkan", "dosen": serialize_dosen(dosen)}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])  # POST karena ada upload file
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_dosen(request, id):
    if not require_admin(request.user):
        return Response({"error": "Admin only"}, status=status.HTTP_403_FORBIDDEN)

    dosen = get_object_or_404(Dosen, id=id)

    dosen.nama_dosen = request.data.get("nama_dosen", dosen.nama_dosen)
    dosen.nidn = request.data.get("nidn", dosen.nidn)
    dosen.fakultas = request.data.get("fakultas", dosen.fakultas)
    dosen.program_studi = request.data.get("program_studi", dosen.program_studi)

    if "penelitian" in request.data:
        dosen.penelitian = parse_bool(request.data.get("penelitian"))

    foto = request.FILES.get("foto_dosen")
    if foto:
        dosen.foto_dosen = foto

    dosen.save()
    return Response({"message": "Data dosen berhasil diupdate", "dosen": serialize_dosen(dosen)}, status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_dosen(request, id):
    if not require_admin(request.user):
        return Response({"error": "Admin only"}, status=status.HTTP_403_FORBIDDEN)

    dosen = get_object_or_404(Dosen, id=id)
    dosen.delete()
    return Response({"message": "Dosen berhasil dihapus"}, status=status.HTTP_200_OK)
