from django.db import models

class Article(models.Model):
    judul = models.CharField(max_length=200)
    konten = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.judul


class ArticleImage(models.Model):
    article = models.ForeignKey(
        Article,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="artikel/")
