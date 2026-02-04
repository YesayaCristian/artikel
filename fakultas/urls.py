from django.urls import path
from .views import (
    list_fakultas, detail_fakultas,
    create_fakultas, update_fakultas, delete_fakultas
)

urlpatterns = [
    path("api/fakultas/", list_fakultas),
    path("api/fakultas/<int:id>/", detail_fakultas),

    path("api/fakultas/create/", create_fakultas),
    path("api/fakultas/update/<int:id>/", update_fakultas),
    path("api/fakultas/delete/<int:id>/", delete_fakultas),
]
