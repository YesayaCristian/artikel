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
    # Identitas dasar
    nama_dosen = models.CharField(max_length=150)
    nidn = models.CharField(max_length=20)  # NIP/Noppeg
    email = models.EmailField(blank=True, null=True)

    # Profil akademik
    sinta_id = models.CharField(max_length=50, blank=True, null=True)
    researcher_id = models.CharField(max_length=50, blank=True, null=True)
    scopus_author_id = models.CharField(max_length=50, blank=True, null=True)
    orchid_id = models.CharField(max_length=50, blank=True, null=True)
    webpage = models.URLField(blank=True, null=True)

    # Pendidikan
    pendidikan_s1 = models.CharField(max_length=150, blank=True, null=True)
    pendidikan_s2 = models.CharField(max_length=150, blank=True, null=True)
    pendidikan_s3 = models.CharField(max_length=150, blank=True, null=True)

    # Pekerjaan & akademik
    pekerjaan = models.CharField(max_length=150, blank=True, null=True)
    fakultas = models.CharField(max_length=100)
    program_studi = models.CharField(max_length=100)

    # Text area
    research_interest = models.TextField(blank=True, null=True)
    mata_kuliah_diampu = models.TextField(blank=True, null=True)
    publikasi = models.TextField(blank=True, null=True)
    project = models.TextField(blank=True, null=True)
    pengabdian_masyarakat = models.TextField(blank=True, null=True)
    award = models.TextField(blank=True, null=True)

    # Lainnya
    penelitian = models.BooleanField(default=False)
    foto_dosen = models.ImageField(upload_to='dosen/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nama_dosen

