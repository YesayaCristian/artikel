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
    path("api/articles/", list_article),
    path("api/articles/create/", create_article),
    path("api/articles/<int:id>/", detail_article),
    path("api/articles/<int:id>/update/", update_article),
    path("api/articles/<int:id>/delete/", delete_article),

    # categories
    path("api/categories/", list_categories),
    path("api/categories/create/", create_category),
    path("api/categories/<int:id>/update/", update_category),
    path("api/categories/<int:id>/delete/", delete_category),

    # tags
    path("api/tags/", list_tags),
    path("api/tags/create/", create_tag),
    path("api/tags/<int:id>/update/", update_tag),
    path("api/tags/<int:id>/delete/", delete_tag),

    # dosen (PUBLIC)
    path("api/dosen/list/", list_dosen),
    path("api/dosen/<int:id>/", detail_dosen),

    # dosen (ADMIN)
    path("api/dosen/create/", create_dosen),
    path("api/dosen/<int:id>/update/", update_dosen),
    path("api/dosen/<int:id>/delete/", delete_dosen),
]
