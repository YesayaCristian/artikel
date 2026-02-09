from rest_framework import serializers
from .models import MataKuliah
from program_studi.models import ProgramStudi


class ProdiSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramStudi
        fields = "__all__"


class MataKuliahSerializer(serializers.ModelSerializer):
    nama_prodi = serializers.CharField(source="prodi.nama_prodi", read_only=True)
    id_prodi = serializers.PrimaryKeyRelatedField(
        queryset=ProgramStudi.objects.all(),
        source="prodi"   # mapping ke ForeignKey
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
            "deskripsi",
            "id_prodi",     # bisa diinput saat create/update
            "nama_prodi",   # hanya tampil di output
            "bahan_kajian",
            "cpps",
            "cpm",
            "daftar_rujukan",
            "instrumen_penilaian",
        ]
