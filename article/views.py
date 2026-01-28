from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Article, ArticleImage

@csrf_exempt
def create_article(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Method not allowed"},
            status=405
        )

    try:
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

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
