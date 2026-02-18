from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=60, unique=True)
    slug = models.SlugField(max_length=80, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Article(models.Model):
    judul = models.CharField(max_length=200)
    konten = models.TextField()

    author = models.ForeignKey(
        User,
        related_name="articles",
        on_delete=models.CASCADE
    )

    category = models.ForeignKey(
        Category,
        related_name="articles",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    tags = models.ManyToManyField(
        Tag,
        related_name="articles",
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.judul
    
    def get_related(self, limit=5):
        """
        Ambil artikel terkait berdasarkan category atau tags.
        """
        # Mulai dengan query kosong
        related_qs = Article.objects.none()

        # Filter berdasarkan kategori
        if self.category:
            related_qs = Article.objects.filter(category=self.category)

        # Tambahkan filter berdasarkan tags
        if self.tags.exists():
            related_qs = related_qs | Article.objects.filter(tags__in=self.tags.all())

        # Exclude artikel ini sendiri
        related_qs = related_qs.exclude(id=self.id)

        # Hilangkan duplikat, urutkan terbaru, batasi jumlah
        related_qs = related_qs.distinct().order_by('-created_at')[:limit]

        return related_qs


class ArticleImage(models.Model):
    article = models.ForeignKey(
        Article,
        related_name="images",
        on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="artikel/")
