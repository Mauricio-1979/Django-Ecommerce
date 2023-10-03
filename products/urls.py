from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('', views.get_products),
    path('category/<str:category>', views.get_prod_by_cate),
    path('name/<slug:slug>/', views.get_Product),
    path('id/<int:pk>/', views.get_Product_id),
    path('post/', views.create_product),
    path('edit/<int:pk>/', views.edit_product),
    path('search/', views.search),
    path('delete/<int:pk>/', views.delet_product),
]
