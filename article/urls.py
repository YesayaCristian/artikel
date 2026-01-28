from django.urls import path
from .views import create_article

urlpatterns = [
    path("api/article/create/", create_article),
]
