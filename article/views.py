from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Article, ArticleImage


@csrf_exempt
def create_article(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    judul = request.POST.get("judul")
    konten = request.POST.get("konten")
    images = request.FILES.getlist("images")

    if not judul or not konten:
        return JsonResponse(
            {"error": "judul dan konten wajib diisi"},
            status=400
        )

    article = Article.objects.create(
        judul=judul,
        konten=konten
    )

    for img in images:
        ArticleImage.objects.create(
            article=article,
            image=img
        )

    return JsonResponse(
        {
            "message": "Artikel berhasil dibuat",
            "id": article.id,
            "jumlah_gambar": len(images)
        },
        status=201
    )


def list_article(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    articles = Article.objects.all().order_by("-created_at")

    data = []
    for article in articles:
        data.append({
            "id": article.id,
            "judul": article.judul,
            "konten": article.konten,
            "created_at": article.created_at,
            "images": [
                img.image.url for img in article.images.all()
            ]
        })

    return JsonResponse({"articles": data}, status=200)


def detail_article(request, id):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return JsonResponse({"error": "Artikel tidak ditemukan"}, status=404)

    data = {
        "id": article.id,
        "judul": article.judul,
        "konten": article.konten,
        "created_at": article.created_at,
        "images": [
            img.image.url for img in article.images.all()
        ]
    }

    return JsonResponse(data, status=200)


@csrf_exempt
def update_article(request, id):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return JsonResponse({"error": "Artikel tidak ditemukan"}, status=404)

    print("POST Data:", request.POST)
    print("FILES Data:", request.FILES)
    
    judul = request.POST.get("judul")
    konten = request.POST.get("konten")
    images = request.FILES.getlist("images")

    if judul:
        article.judul = judul
    if konten:
        article.konten = konten

    article.save()

    if images:
        article.images.all().delete()
        for img in images:
            ArticleImage.objects.create(
                article=article,
                image=img
            )

    return JsonResponse(
        {"message": "Artikel berhasil diupdate"},
        status=200
    )


@csrf_exempt
def delete_article(request, id):
    if request.method != "DELETE":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    try:
        article = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return JsonResponse({"error": "Artikel tidak ditemukan"}, status=404)

    article.delete()

    return JsonResponse(
        {"message": "Artikel berhasil dihapus"},
        status=200
    )
