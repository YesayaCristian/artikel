from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = (request.data.get("username") or "").strip()
    email = (request.data.get("email") or "").strip()
    password = request.data.get("password") or ""

    if not username or not password:
        return Response({"error": "username dan password wajib"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "username sudah dipakai"}, status=status.HTTP_400_BAD_REQUEST)

    if email and User.objects.filter(email=email).exists():
        return Response({"error": "email sudah dipakai"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response(
        {"message": "register berhasil", "id": user.id, "username": user.username, "email": user.email},
        status=status.HTTP_201_CREATED
    )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    u = request.user
    return Response({"id": u.id, "username": u.username, "email": u.email, "is_staff": u.is_staff})
