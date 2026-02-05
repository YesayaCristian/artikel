from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import MataKuliah
from .serializers import MataKuliahSerializer


# =========================
# CREATE MATA KULIAH
# =========================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_mk(request):
    serializer = MataKuliahSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# LIST MATA KULIAH
# =========================
@api_view(["GET"])
@permission_classes([AllowAny])
def list_mk(request):
    queryset = MataKuliah.objects.select_related("prodi").all()
    serializer = MataKuliahSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# =========================
# DETAIL MATA KULIAH
# =========================
@api_view(["GET"])
@permission_classes([AllowAny])
def detail_mk(request, id):
    try:
        mk = MataKuliah.objects.select_related("prodi").get(id_mk=id)
    except MataKuliah.DoesNotExist:
        return Response(
            {"error": "Mata kuliah tidak ditemukan"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = MataKuliahSerializer(mk)
    return Response(serializer.data, status=status.HTTP_200_OK)


# =========================
# UPDATE MATA KULIAH
# =========================
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_mk(request, id):
    try:
        mk = MataKuliah.objects.get(id_mk=id)
    except MataKuliah.DoesNotExist:
        return Response(
            {"error": "Mata kuliah tidak ditemukan"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = MataKuliahSerializer(mk, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# DELETE MATA KULIAH
# =========================
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_mk(request, id):
    try:
        mk = MataKuliah.objects.get(id_mk=id)
    except MataKuliah.DoesNotExist:
        return Response(
            {"error": "Mata kuliah tidak ditemukan"},
            status=status.HTTP_404_NOT_FOUND
        )

    mk.delete()
    return Response(
        {"message": "Mata kuliah berhasil dihapus"},
        status=status.HTTP_200_OK
    )
