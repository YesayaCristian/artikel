from django.urls import path
from .views import (
    list_program_studi,
    detail_program_studi,
    create_program_studi,
    update_program_studi,
    delete_program_studi,
)

urlpatterns = [
    path('api/program_study/', list_program_studi),
    path('api/program_study/<int:id>/', detail_program_studi),
    path('api/program_study/create/', create_program_studi),
    path('api/program_study/update/<int:id>/', update_program_studi),
    path('api/program_study/delete/<int:id>/', delete_program_studi),
]
