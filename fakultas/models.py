from django.db import models

# Create your models here.

from django.db import models

class Fakultas(models.Model):
    kode_fakultas = models.CharField(max_length=10, unique=True)
    nama_fakultas = models.CharField(max_length=100)
    nama_dekan = models.CharField(max_length=100)
    gedung = models.CharField(max_length=50)
    website = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.kode_fakultas} - {self.nama_fakultas}"
