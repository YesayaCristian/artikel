from django.urls import path
from .views import (
    create_article, list_article, detail_article, update_article, delete_article,
    list_categories, list_tags
)

urlpatterns = [
    # articles
    path("articles/", list_article),
    path("articles/create/", create_article),
    path("articles/<int:id>/", detail_article),
    path("articles/<int:id>/update/", update_article),
    path("articles/<int:id>/delete/", delete_article),

    # categories & tags
    path("categories/", list_categories),
    path("tags/", list_tags),
]
