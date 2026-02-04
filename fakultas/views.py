from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Fakultas

# ================= FAKULTAS READ (GUEST & AUTH) =================

@api_view(['GET'])
@permission_classes([AllowAny])
def list_fakultas(request):
    fakultas = Fakultas.objects.all().order_by("nama_fakultas")
    data = [{
        "id": f.id,
        "kode_fakultas": f.kode_fakultas,
        "nama_fakultas": f.nama_fakultas,
        "nama_dekan": f.nama_dekan,
        "gedung": f.gedung,
        "website": f.website
    } for f in fakultas]

    return Response({"fakultas": data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def detail_fakultas(request, id):
    try:
        f = Fakultas.objects.get(id=id)
        data = {
            "id": f.id,
            "kode_fakultas": f.kode_fakultas,
            "nama_fakultas": f.nama_fakultas,
            "nama_dekan": f.nama_dekan,
            "gedung": f.gedung,
            "website": f.website
        }
        return Response(data, status=status.HTTP_200_OK)
    except Fakultas.DoesNotExist:
        return Response({"error": "Fakultas tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

# ================= FAKULTAS CRUD (AUTH ONLY) =================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_fakultas(request):
    try:
        fakultas = Fakultas.objects.create(
            kode_fakultas=request.data.get("kode_fakultas"),
            nama_fakultas=request.data.get("nama_fakultas"),
            nama_dekan=request.data.get("nama_dekan"),
            gedung=request.data.get("gedung"),
            website=request.data.get("website")
        )
        return Response({
            "message": "Fakultas berhasil ditambahkan",
            "id": fakultas.id
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_fakultas(request, id):
    try:
        f = Fakultas.objects.get(id=id)
        f.kode_fakultas = request.data.get("kode_fakultas", f.kode_fakultas)
        f.nama_fakultas = request.data.get("nama_fakultas", f.nama_fakultas)
        f.nama_dekan = request.data.get("nama_dekan", f.nama_dekan)
        f.gedung = request.data.get("gedung", f.gedung)
        f.website = request.data.get("website", f.website)
        f.save()

        return Response({"message": "Fakultas berhasil diupdate"}, status=status.HTTP_200_OK)
    except Fakultas.DoesNotExist:
        return Response({"error": "Fakultas tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_fakultas(request, id):
    try:
        f = Fakultas.objects.get(id=id)
        f.delete()
        return Response({"message": "Fakultas berhasil dihapus"}, status=status.HTTP_200_OK)
    except Fakultas.DoesNotExist:
        return Response({"error": "Fakultas tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)
