from django.urls import path
from .views import (
    create_article, list_article, detail_article, update_article, delete_article,
    create_dosen, list_dosen, update_dosen, delete_dosen
)

urlpatterns = [
    # Article URLs
    path("api/article/create/", create_article),
    path("api/article/", list_article),
    path("api/article/<int:id>/", detail_article),
    path("api/article/<int:id>/update/", update_article),
    path("api/article/<int:id>/delete/", delete_article),
    
    # Dosen URLs
    path("api/dosen/list/", list_dosen),
    path("api/dosen/create/", create_dosen),
    path("api/dosen/update/<int:id>/", update_dosen),
    path("api/dosen/delete/<int:id>/", delete_dosen),
]