from django.urls import path
from .views import (
    list_program_studi,
    detail_program_studi,
    create_program_studi,
    update_program_studi,
    delete_program_studi,
)

urlpatterns = [
    path('', list_program_studi),
    path('<int:id>/', detail_program_studi),
    path('create/', create_program_studi),
    path('update/<int:id>/', update_program_studi),
    path('delete/<int:id>/', delete_program_studi),
]
