from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('register/', views.register),
    path('login/', views.LoginView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('get/', views.get_users),
    path('search/', views.search_user),
    path('edit/<int:pk>', views.edit_user),
    path('delete/<int:pk>', views.delete_user),
    path('user/<int:pk>', views.get_solo_user),
]

