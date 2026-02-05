from django.db import models
import uuid
from program_studi.models import ProgramStudi


class MataKuliah(models.Model):
    JENIS_CHOICES = [
        ("wajib", "Wajib"),
        ("pilihan", "Pilihan"),
        ("praktikum", "Praktikum"),
    ]

    id_mk = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    kode_mk = models.CharField(max_length=10, unique=True)
    nama_mk = models.CharField(max_length=100)
    sks = models.PositiveSmallIntegerField()
    semester = models.PositiveSmallIntegerField()
    jenis_mk = models.CharField(max_length=20, choices=JENIS_CHOICES)

    prodi = models.ForeignKey(
        ProgramStudi,
        on_delete=models.CASCADE,
        related_name="mata_kuliah"
    )

    deskripsi = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.kode_mk} - {self.nama_mk}"
