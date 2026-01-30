from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Article, ArticleImage, Dosen

# ================= ARTICLE CRUD =================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_article(request):
    judul = request.data.get("judul")
    konten = request.data.get("konten")
    images = request.FILES.getlist("images")

    if not judul or not konten:
        return Response({"error": "judul dan konten wajib diisi"}, status=status.HTTP_400_BAD_REQUEST)

    article = Article.objects.create(judul=judul, konten=konten, author=request.user)

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
        return Response({"error": "Artikel tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
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

@api_view(['DELETE'])
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


# ================= DOSEN CRUD =================

@api_view(['GET'])
@permission_classes([AllowAny])
def list_dosen(request):
    dosens = Dosen.objects.all().order_by("-created_at")
    data = [{
        "id": d.id,
        "nama_dosen": d.nama_dosen,
        "nidn": d.nidn,
        "fakultas": d.fakultas,
        "program_studi": d.program_studi,
        "penelitian": d.penelitian,
        "foto_dosen": d.foto_dosen.url if d.foto_dosen else None
    } for d in dosens]
    return Response({"dosens": data}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_dosen(request):
    try:
        dosen = Dosen.objects.create(
            nama_dosen=request.data.get("nama_dosen"),
            nidn=request.data.get("nidn"),
            fakultas=request.data.get("fakultas"),
            program_studi=request.data.get("program_studi"),
            penelitian=request.data.get("penelitian") == "true",
            foto_dosen=request.FILES.get("foto_dosen")
        )
        return Response({"message": "Dosen berhasil ditambahkan", "id": dosen.id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST']) # Gunakan POST untuk update yang melibatkan file
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_dosen(request, id):
    try:
        dosen = Dosen.objects.get(id=id)
        dosen.nama_dosen = request.data.get("nama_dosen", dosen.nama_dosen)
        dosen.nidn = request.data.get("nidn", dosen.nidn)
        dosen.fakultas = request.data.get("fakultas", dosen.fakultas)
        dosen.program_studi = request.data.get("program_studi", dosen.program_studi)
        
        if "penelitian" in request.data:
            dosen.penelitian = request.data.get("penelitian") == "true"
            
        foto = request.FILES.get("foto_dosen")
        if foto:
            dosen.foto_dosen = foto

        dosen.save()
        return Response({"message": "Data dosen berhasil diupdate"}, status=status.HTTP_200_OK)
    except Dosen.DoesNotExist:
        return Response({"error": "Dosen tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_dosen(request, id):
    try:
        dosen = Dosen.objects.get(id=id)
        dosen.delete()
        return Response({"message": "Dosen berhasil dihapus"}, status=status.HTTP_200_OK)
    except Dosen.DoesNotExist:
        return Response({"error": "Dosen tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)