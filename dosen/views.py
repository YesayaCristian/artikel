from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Dosen

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def list_dosen(request):
    dosens = Dosen.objects.all().order_by("-created_at")

    data = [{
        "id": d.id,
        "nama_dosen": d.nama_dosen,
        "nidn": d.nidn,
        "email": d.email,
        "fakultas": d.fakultas,
        "program_studi": d.program_studi,
        "penelitian": d.penelitian,
        "foto_dosen": d.foto_dosen.url if d.foto_dosen else None,

        # ID akademik
        "sinta_id": d.sinta_id,
        "researcher_id": d.researcher_id,
        "scopus_author_id": d.scopus_author_id,
        "orchid_id": d.orchid_id,
        "webpage": d.webpage,

        # pendidikan
        "pendidikan_s1": d.pendidikan_s1,
        "pendidikan_s2": d.pendidikan_s2,
        "pendidikan_s3": d.pendidikan_s3,

        # akademik
        "pekerjaan": d.pekerjaan,

        # text area
        "research_interest": d.research_interest,
        "mata_kuliah_diampu": d.mata_kuliah_diampu,
        "publikasi": d.publikasi,
        "project": d.project,
        "pengabdian_masyarakat": d.pengabdian_masyarakat,
        "award": d.award,
    } for d in dosens]

    return Response({"dosens": data}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_dosen(request):
    try:
        dosen = Dosen.objects.create(
            # identitas
            nama_dosen=request.data.get("nama_dosen"),
            nidn=request.data.get("nidn"),
            email=request.data.get("email"),

            # ID akademik
            sinta_id=request.data.get("sinta_id"),
            researcher_id=request.data.get("researcher_id"),
            scopus_author_id=request.data.get("scopus_author_id"),
            orchid_id=request.data.get("orchid_id"),
            webpage=request.data.get("webpage"),

            # pendidikan
            pendidikan_s1=request.data.get("pendidikan_s1"),
            pendidikan_s2=request.data.get("pendidikan_s2"),
            pendidikan_s3=request.data.get("pendidikan_s3"),

            # akademik
            pekerjaan=request.data.get("pekerjaan"),
            fakultas=request.data.get("fakultas"),
            program_studi=request.data.get("program_studi"),

            # text area
            research_interest=request.data.get("research_interest"),
            mata_kuliah_diampu=request.data.get("mata_kuliah_diampu"),
            publikasi=request.data.get("publikasi"),
            project=request.data.get("project"),
            pengabdian_masyarakat=request.data.get("pengabdian_masyarakat"),
            award=request.data.get("award"),

            # lainnya
            penelitian=request.data.get("penelitian") == "true",
            foto_dosen=request.FILES.get("foto_dosen")
        )

        return Response(
            {"message": "Dosen berhasil ditambahkan", "id": dosen.id},
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_dosen(request, id):
    try:
        dosen = Dosen.objects.get(id=id)

        # identitas
        dosen.nama_dosen = request.data.get("nama_dosen", dosen.nama_dosen)
        dosen.nidn = request.data.get("nidn", dosen.nidn)
        dosen.email = request.data.get("email", dosen.email)

        # ID akademik
        dosen.sinta_id = request.data.get("sinta_id", dosen.sinta_id)
        dosen.researcher_id = request.data.get("researcher_id", dosen.researcher_id)
        dosen.scopus_author_id = request.data.get("scopus_author_id", dosen.scopus_author_id)
        dosen.orchid_id = request.data.get("orchid_id", dosen.orchid_id)
        dosen.webpage = request.data.get("webpage", dosen.webpage)

        # pendidikan
        dosen.pendidikan_s1 = request.data.get("pendidikan_s1", dosen.pendidikan_s1)
        dosen.pendidikan_s2 = request.data.get("pendidikan_s2", dosen.pendidikan_s2)
        dosen.pendidikan_s3 = request.data.get("pendidikan_s3", dosen.pendidikan_s3)

        # akademik
        dosen.pekerjaan = request.data.get("pekerjaan", dosen.pekerjaan)
        dosen.fakultas = request.data.get("fakultas", dosen.fakultas)
        dosen.program_studi = request.data.get("program_studi", dosen.program_studi)

        # text area
        dosen.research_interest = request.data.get(
            "research_interest", dosen.research_interest
        )
        dosen.mata_kuliah_diampu = request.data.get(
            "mata_kuliah_diampu", dosen.mata_kuliah_diampu
        )
        dosen.publikasi = request.data.get("publikasi", dosen.publikasi)
        dosen.project = request.data.get("project", dosen.project)
        dosen.pengabdian_masyarakat = request.data.get(
            "pengabdian_masyarakat", dosen.pengabdian_masyarakat
        )
        dosen.award = request.data.get("award", dosen.award)

        if "penelitian" in request.data:
            dosen.penelitian = request.data.get("penelitian") == "true"

        foto = request.FILES.get("foto_dosen")
        if foto:
            dosen.foto_dosen = foto

        dosen.save()

        return Response(
            {"message": "Data dosen berhasil diupdate"},
            status=status.HTTP_200_OK
        )

    except Dosen.DoesNotExist:
        return Response(
            {"error": "Dosen tidak ditemukan"},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_dosen(request, id):
    try:
        dosen = Dosen.objects.get(id=id)
        dosen.delete()

        return Response(
            {"message": "Dosen berhasil dihapus"},
            status=status.HTTP_200_OK
        )

    except Dosen.DoesNotExist:
        return Response(
            {"error": "Dosen tidak ditemukan"},
            status=status.HTTP_404_NOT_FOUND
        )