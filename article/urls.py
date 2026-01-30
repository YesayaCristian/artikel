from django.urls import path
from .views import (
    create_article, list_article,
    detail_article, update_article, delete_article,
    list_categories, list_tags,
    create_category, create_tag,
    update_category, update_tag,
    delete_category, delete_tag,
)

urlpatterns = [
    # articles
    path("articles/", list_article),
    path("articles/create/", create_article),
    path("articles/<int:id>/", detail_article),
    path("articles/<int:id>/update/", update_article),
    path("articles/<int:id>/delete/", delete_article),

    # categories
    path("categories/", list_categories),
    path("categories/create/", create_category),
    path("categories/<int:id>/update/", update_category),
    path("categories/<int:id>/delete/", delete_category),

    # tags
    path("tags/", list_tags),
    path("tags/create/", create_tag),
    path("tags/<int:id>/update/", update_tag),
    path("tags/<int:id>/delete/", delete_tag),

    # Dosen URLs
    path("api/dosen/list/", list_dosen),
    path("api/dosen/create/", create_dosen),
    path("api/dosen/update/<int:id>/", update_dosen),
    path("api/dosen/delete/<int:id>/", delete_dosen),
]
