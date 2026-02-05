from django.db import models

# Create your models here.
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