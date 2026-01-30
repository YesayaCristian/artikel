from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    judul = models.CharField(max_length=200)
    konten = models.TextField()
    author = models.ForeignKey(
        User, 
        related_name="articles", 
        on_delete=models.CASCADE
    )
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

class Dosen(models.Model):
    nama_dosen = models.CharField(max_length=150)
    nidn = models.CharField(max_length=20)
    fakultas = models.CharField(max_length=100)
    program_studi = models.CharField(max_length=100)
    penelitian = models.BooleanField(default=False)
    foto_dosen = models.ImageField(upload_to='dosen/')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nama_dosen

