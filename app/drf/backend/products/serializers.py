from rest_framework import serializers
from .models import Product, ProductImages
 
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ['image']
        
class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, required=False)
    
    class Meta:
        model = Product
        fields = ['title',
                  'content',
                  'location',
                  'categories',
                  'owner',
                  'created_at',
                  'updated_at',
                  'images',
                  'valid',
                  'best_before',
                  'allergens',
                  'id',
                  'pickedUp',
                  'latitude',
                  'longitude',
                  'postalcode',
                  ]
        read_only_fields = ['valid']
        