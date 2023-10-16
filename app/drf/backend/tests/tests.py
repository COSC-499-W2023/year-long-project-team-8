from django.urls import reverse, path, include
from rest_framework import status
from rest_framework.test import APITestCase,URLPatternsTestCase
from products.models import Product
from django.contrib.auth.models import User
from django.test import TestCase
from products.serializers import ProductSerializer
        
class UserExistenceTest(TestCase):
    def test_user_exists(self):
        # Create a test user
        User.objects.create_user(username="testuser", password="testpassword")
        # Check if the user exists
        user_exists = User.objects.filter(username="testuser").exists()
        self.assertTrue(user_exists)
        
        
class ProductDetailViewTest(APITestCase):
   def setUp(self):
       # Create a test product
       self.product = Product.objects.create(title='Test Product')

   def test_product_detail_view(self):
       url = reverse('product-detail', kwargs={'pk': self.product.pk})
       response = self.client.get(url)

       self.assertEqual(response.status_code, status.HTTP_200_OK)
       self.assertEqual(response.data, ProductSerializer(self.product).data)
       
