from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed

class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user: User = self.user
        # ✅ admin only
        if not user.is_staff:
            raise AuthenticationFailed("Hanya admin yang boleh login.")

        # optional: return user info
        data["user"] = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff,
        }
        return data

class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer
