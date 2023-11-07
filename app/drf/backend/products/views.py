from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters

# class ProductDetailAPIView(generics.RetrieveAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
    
# # uppdated the product list to be authenticated only - another layer to ensure only authenticated users can view the products
# # (mostly for testing the jwt authentication)
# class ProductListAPIView(generics.ListAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     # permission_classes = [IsAuthenticated]
#     # authentication_classes = [JWTAuthentication]
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['categories']

class ProductFilter(filters.FilterSet):
    categories = filters.CharFilter(field_name='categories', lookup_expr='icontains')

    class Meta:
        model = Product
        fields = []
    
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['categories']
    filterset_class = ProductFilter

    
    
    
