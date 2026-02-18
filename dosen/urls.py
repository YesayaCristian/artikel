from django.urls import path
from .views import (
    create_dosen, list_dosen, update_dosen, delete_dosen, detail_dosen, fakultas_list, list_dosen_admin
)

urlpatterns = [
    # Dosen URLs
    path("api/dosen/list/", list_dosen),
    path("api/dosen/fakultas-list/", fakultas_list),
    path("api/dosen/<int:id>/", detail_dosen),
    path("api/dosen/create/", create_dosen),
    path("api/dosen/update/<int:id>/", update_dosen),
    path("api/dosen/delete/<int:id>/", delete_dosen),
    path("api/admin/dosen/", list_dosen_admin),
]