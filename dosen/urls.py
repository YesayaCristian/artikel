from django.urls import path
from .views import (
    create_dosen, list_dosen, update_dosen, delete_dosen,
)

urlpatterns = [
    # Dosen URLs
    path("api/dosen/list/", list_dosen),
    path("api/dosen/create/", create_dosen),
    path("api/dosen/update/<int:id>/", update_dosen),
    path("api/dosen/delete/<int:id>/", delete_dosen),
]