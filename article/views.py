from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from .models import Article, ArticleImage


# =====================================================
# ================= ARTICLE CRUD ======================
# =====================================================

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
        author=request.user
    )

    for img in images:
        ArticleImage.objects.create(article=article, image=img)

    return Response({
        "message": "Artikel berhasil dibuat",
        "id": article.id,
        "author": request.user.username
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_article(request):
    articles = Article.objects.all().order_by("-created_at")

    data = [{
        "id": art.id,
        "judul": art.judul,
        "konten": art.konten,
        "author": art.author.username,
        "created_at": art.created_at,
        "images": [img.image.url for img in art.images.all()]
    } for art in articles]

    return Response({"articles": data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def detail_article(request, id):
    try:
        article = Article.objects.get(id=id)

        data = {
            "id": article.id,
            "judul": article.judul,
            "konten": article.konten,
            "author": article.author.username,
            "created_at": article.created_at,
            "images": [img.image.url for img in article.images.all()]
        }

        return Response(data, status=status.HTTP_200_OK)

    except Article.DoesNotExist:
        return Response(
            {"error": "Artikel tidak ditemukan"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_article(request, id):
    try:
        article = Article.objects.get(id=id)

        if article.author != request.user:
            return Response(
                {"error": "Izin ditolak"},
                status=status.HTTP_403_FORBIDDEN
            )

        article.judul = request.data.get("judul", article.judul)
        article.konten = request.data.get("konten", article.konten)
        article.save()

        images = request.FILES.getlist("images")
        if images:
            article.images.all().delete()
            for img in images:
                ArticleImage.objects.create(article=article, image=img)

        return Response(
            {"message": "Artikel berhasil diupdate"},
            status=status.HTTP_200_OK
        )

    except Article.DoesNotExist:
        return Response(
            {"error": "Artikel tidak ditemukan"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_article(request, id):
    try:
        article = Article.objects.get(id=id)

        if article.author != request.user:
            return Response(
                {"error": "Izin ditolak"},
                status=status.HTTP_403_FORBIDDEN
            )

        article.delete()
        return Response(
            {"message": "Artikel berhasil dihapus"},
            status=status.HTTP_200_OK
        )

    except Article.DoesNotExist:
        return Response(
            {"error": "Artikel tidak ditemukan"},
            status=status.HTTP_404_NOT_FOUND
        )