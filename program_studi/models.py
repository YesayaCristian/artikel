from django.db import models
from fakultas.models import Fakultas


class ProgramStudi(models.Model):

    JENJANG_CHOICES = [
        ('D3', 'D3'),
        ('D4', 'D4'),
        ('S1', 'S1'),
        ('S2', 'S2'),
        ('S3', 'S3'),
    ]

    kode_prodi = models.CharField(max_length=10, unique=True)
    nama_prodi = models.CharField(max_length=100)
    jenjang = models.CharField(max_length=2, choices=JENJANG_CHOICES)
    akreditasi = models.CharField(max_length=1)

    id_fakultas = models.ForeignKey(
        Fakultas,
        on_delete=models.CASCADE,
        related_name='program_studi'
    )

    kaprodi = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.kode_prodi} - {self.nama_prodi}"
