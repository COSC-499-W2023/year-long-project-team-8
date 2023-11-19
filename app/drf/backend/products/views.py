from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from django.db.models import Q
import django_filters
from users.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response


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
    #authentication_classes = [JWTAuthentication]
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['categories']
    filterset_class = ProductFilter
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    def list_my_products(self, request, *args, **kwargs):
        # Get products created by the current user
        queryset = Product.objects.filter(owner=self.request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    
    
    
