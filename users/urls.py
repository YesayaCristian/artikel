from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import register, me
from .jwt_views import AdminTokenObtainPairView

urlpatterns = [
    # path("register/", register),           
    path("login/", AdminTokenObtainPairView.as_view()),  
    path("refresh/", TokenRefreshView.as_view()),
    path("me/", me),
]
