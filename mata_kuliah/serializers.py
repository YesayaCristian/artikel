from rest_framework import serializers
from .models import MataKuliah
from program_studi.models import ProgramStudi


class ProdiSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramStudi
        fields = "__all__"


class MataKuliahSerializer(serializers.ModelSerializer):
    prodi_nama = serializers.CharField(
        source="prodi.nama_prodi",
        read_only=True
    )

    class Meta:
        model = MataKuliah
        fields = [
            "id",
            "kode_mk",
            "nama_mk",
            "sks",
            "semester",
            "jenis_mk",
            "prodi",
            "prodi_nama",
            "deskripsi",
            "bahan_kajian",
            "cpps",
            "cpm",
            "daftar_rujukan",
            "instrumen_penilaian",
        ]
