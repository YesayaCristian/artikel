from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import ProgramStudi
from fakultas.models import Fakultas


# ================= PROGRAM STUDI READ (GUEST & AUTH) =================

@api_view(['GET'])
@permission_classes([AllowAny])
def list_program_studi(request):
    prodi = ProgramStudi.objects.select_related('id_fakultas').all()
    data = []

    for p in prodi:
        data.append({
            "id": p.id,
            "kode_prodi": p.kode_prodi,
            "nama_prodi": p.nama_prodi,
            "jenjang": p.jenjang,
            "akreditasi": p.akreditasi,
            "kaprodi": p.kaprodi,
            "fakultas": {
                "id": p.id_fakultas.id,
                "kode_fakultas": p.id_fakultas.kode_fakultas,
                "nama_fakultas": p.id_fakultas.nama_fakultas
            }
        })

    return Response({"program_studi": data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def detail_program_studi(request, id):
    try:
        p = ProgramStudi.objects.select_related('id_fakultas').get(id=id)
        data = {
            "id": p.id,
            "kode_prodi": p.kode_prodi,
            "nama_prodi": p.nama_prodi,
            "jenjang": p.jenjang,
            "akreditasi": p.akreditasi,
            "kaprodi": p.kaprodi,
            "fakultas": {
                "id": p.id_fakultas.id,
                "kode_fakultas": p.id_fakultas.kode_fakultas,
                "nama_fakultas": p.id_fakultas.nama_fakultas
            }
        }
        return Response(data, status=status.HTTP_200_OK)
    except ProgramStudi.DoesNotExist:
        return Response({"error": "Program studi tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

# ================= PROGRAM STUDI CRUD (AUTH ONLY) =================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_program_studi(request):
    try:
        fakultas = Fakultas.objects.get(id=request.data.get("id_fakultas"))

        prodi = ProgramStudi.objects.create(
            kode_prodi=request.data.get("kode_prodi"),
            nama_prodi=request.data.get("nama_prodi"),
            jenjang=request.data.get("jenjang"),
            akreditasi=request.data.get("akreditasi"),
            kaprodi=request.data.get("kaprodi"),
            id_fakultas=fakultas
        )

        return Response({
            "message": "Program studi berhasil ditambahkan",
            "id": prodi.id
        }, status=status.HTTP_201_CREATED)

    except Fakultas.DoesNotExist:
        return Response({"error": "Fakultas tidak valid"}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_program_studi(request, id):
    try:
        p = ProgramStudi.objects.get(id=id)

        if request.data.get("id_fakultas"):
            p.id_fakultas = Fakultas.objects.get(id=request.data.get("id_fakultas"))

        p.kode_prodi = request.data.get("kode_prodi", p.kode_prodi)
        p.nama_prodi = request.data.get("nama_prodi", p.nama_prodi)
        p.jenjang = request.data.get("jenjang", p.jenjang)
        p.akreditasi = request.data.get("akreditasi", p.akreditasi)
        p.kaprodi = request.data.get("kaprodi", p.kaprodi)
        p.save()

        return Response({"message": "Program studi berhasil diupdate"}, status=status.HTTP_200_OK)

    except ProgramStudi.DoesNotExist:
        return Response({"error": "Program studi tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

    except Fakultas.DoesNotExist:
        return Response({"error": "Fakultas tidak valid"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_program_studi(request, id):
    try:
        p = ProgramStudi.objects.get(id=id)
        p.delete()
        return Response({"message": "Program studi berhasil dihapus"}, status=status.HTTP_200_OK)
    except ProgramStudi.DoesNotExist:
        return Response({"error": "Program studi tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)
