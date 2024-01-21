from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from .models import Product, ProductImages
from .serializers import ProductSerializer, ProductImageSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from django.db.models import Q
import django_filters
from users.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.filters import SearchFilter

# Product filter to filter for CSV filter list
class ProductFilter(django_filters.FilterSet):
    categories = django_filters.CharFilter(method='filter_categories')

    class Meta:
        model = Product
        fields = []

    def filter_categories(self, queryset, name, value):
        categories = value.split(',')  # Split the comma-separated categories
        q_objects = Q()

        for category in categories:
            q_objects |= Q(categories__icontains=category)

        return queryset.filter(q_objects)
    
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    authentication_classes = [JWTAuthentication]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['categories']
    filterset_class = ProductFilter
    parser_classes = (MultiPartParser, FormParser)
    search_fields = ['title', 'content']
    
    def perform_create(self, serializer):
        product = serializer.save(owner=self.request.user)
        
        # Handle associated images
        images_data = self.request.FILES.getlist('images')

        for image_data in images_data:
            ProductImages.objects.create(product=product, image=image_data)

    def get_images(self, request, pk=None):
        # Get images associated with a specific product
        product = self.get_object()
        images = ProductImages.objects.filter(product=product)
        serializer = ProductImageSerializer(images, many=True)
        return Response(serializer.data)
    
    def list_my_products(self, request, *args, **kwargs):
        # Get products created by the current user
        queryset = Product.objects.filter(owner=self.request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    # override query set to update valid flag before each API call to products
    def get_queryset(self):
        # Call the update_valid_flag method before returning the queryset
        Product.objects.update_valid_flag()
        return super().get_queryset()

    
class ImageViewSet(ModelViewSet):
    queryset = ProductImages.objects.all()
    serializer_class = ProductImageSerializer
