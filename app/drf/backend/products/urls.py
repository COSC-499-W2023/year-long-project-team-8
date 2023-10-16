from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.ProductDetailView.as_view(), name='product-detail')
]
