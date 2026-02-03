from django.urls import path
from .views import (
    # articles
    list_article, create_article, detail_article, update_article, delete_article,
    # categories
    list_categories, create_category, update_category, delete_category,
    # tags
    list_tags, create_tag, update_tag, delete_tag,
    # dosen
    list_dosen, detail_dosen, create_dosen, update_dosen, delete_dosen,
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

    # dosen (PUBLIC)
    path("dosen/list/", list_dosen),
    path("dosen/<int:id>/", detail_dosen),

    # dosen (ADMIN)
    path("dosen/create/", create_dosen),
    path("dosen/<int:id>/update/", update_dosen),
    path("dosen/<int:id>/delete/", delete_dosen),
]
