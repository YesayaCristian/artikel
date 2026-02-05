from django.urls import path
from .views import (
    create_mk, list_mk, detail_mk, update_mk, delete_mk
)

urlpatterns = [

    # MATA KULIAH
    path("api/mk/create/", create_mk),
    path("api/mk/", list_mk),
    path("api/mk/<uuid:id>/", detail_mk),
    path("api/mk/<uuid:id>/update/", update_mk),
    path("api/mk/<uuid:id>/delete/", delete_mk),
]
