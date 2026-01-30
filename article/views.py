from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import Dosen

from django.http import JsonResponse

from .models import Article, ArticleImage
from django.contrib.auth.models import User

# CREATE ARTICLE (Hanya untuk user login)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_article(request):
    judul = request.data.get("judul")
    konten = request.data.get("konten")
    images = request.FILES.getlist("images")

    if not judul or not konten:
        return Response(
            {"error": "judul dan konten wajib diisi"},
            status=status.HTTP_400_BAD_REQUEST
        )

    article = Article.objects.create(
        judul=judul,
        konten=konten,
        author=request.user  # otomatis tercatat user login
    )

    for img in images:
        ArticleImage.objects.create(article=article, image=img)

    return Response(
        {
            "message": "Artikel berhasil dibuat",
            "id": article.id,
            "author": request.user.username,
            "jumlah_gambar": len(images)
        },
        status=status.HTTP_201_CREATED
    )


# LIST ARTICLE (Guest dan Authenticated user bisa lihat)
@api_view(['GET'])
@permission_classes([AllowAny])
def list_article(request):
    articles = Article.objects.all().order_by("-created_at")
    data = []

    for article in articles:
        data.append({
            "id": article.id,
            "judul": article.judul,
            "konten": article.konten,
            "author": article.author.username,
            "created_at": article.created_at,
            "images": [img.image.url for img in article.images.all()]
        })

    return Response({"articles": data}, status=status.HTTP_200_OK)


# DETAIL ARTICLE (Guest dan Authenticated user bisa lihat)
@api_view(['GET'])
@permission_classes([AllowAny])
def detail_article(request, id):
    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return Response({"error": "Artikel tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

    data = {
        "id": article.id,
        "judul": article.judul,
        "konten": article.konten,
        "author": article.author.username,
        "created_at": article.created_at,
        "images": [img.image.url for img in article.images.all()]
    }

    return Response(data, status=status.HTTP_200_OK)


# UPDATE ARTICLE (Hanya user login dan author)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_article(request, id):
    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return Response({"error": "Artikel tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

    # Cek apakah user adalah author
    if article.author != request.user:
        return Response({"error": "Tidak punya izin mengupdate artikel ini"}, status=status.HTTP_403_FORBIDDEN)

    judul = request.data.get("judul")
    konten = request.data.get("konten")
    images = request.FILES.getlist("images")

    if judul:
        article.judul = judul
    if konten:
        article.konten = konten

    article.save()

    if images:
        article.images.all().delete()
        for img in images:
            ArticleImage.objects.create(article=article, image=img)

    return Response({"message": "Artikel berhasil diupdate"}, status=status.HTTP_200_OK)


# DELETE ARTICLE (Hanya user login dan author)
@api_view(['DELETE'])
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_dosen(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        dosen = Dosen.objects.create(
            nama_dosen=request.POST.get("nama_dosen"),
            nidn=request.POST.get("nidn"),
            fakultas=request.POST.get("fakultas"),
            program_studi=request.POST.get("program_studi"),
            penelitian=request.POST.get("penelitian") == "true",
            foto_dosen=request.FILES.get("foto_dosen")
        )

        return JsonResponse({
            "message": "Dosen berhasil ditambahkan",
            "id": dosen.id
        }, status=201)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
