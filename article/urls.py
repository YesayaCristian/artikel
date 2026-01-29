from django.urls import path
from .views import (
    create_article,
    list_article,
    detail_article,
    update_article,
    delete_article,
)

urlpatterns = [
    path("api/article/create/", create_article),
    path("api/article/", list_article),
    path("api/article/<int:id>/", detail_article),
    path("api/article/<int:id>/update/", update_article),
    path("api/article/<int:id>/delete/", delete_article),
]
