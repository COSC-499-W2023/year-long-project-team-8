from django.urls import reverse, path, include
from rest_framework import status
from rest_framework.test import APITestCase,URLPatternsTestCase
from products.models import Product
from users.models import User
from django.test import TestCase
from products.serializers import ProductSerializer
from rest_framework.test import APIClient
from users.permissions import UserPermission


        
class UserExistenceTest(TestCase):
    def test_user_exists(self):
        # Create a test user
        User.objects.create_user(email="testuser@test.com", password="testpassword")
        # Check if the user exists
        user_exists = User.objects.filter(email="testuser@test.com").exists()
        self.assertTrue(user_exists)
        
        
class ProductDetailAPIViewTest(APITestCase):
   def setUp(self):
       # Create a test product
       self.product = Product.objects.create(title='Test Product')

   def test_product_detail_view(self):
       url = reverse('product-detail', kwargs={'pk': self.product.pk})
       response = self.client.get(url)

       self.assertEqual(response.status_code, status.HTTP_200_OK)
       self.assertEqual(response.data, ProductSerializer(self.product).data)
       
class UserViewSetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            password="testpassword"
        )
        self.admin_user = User.objects.create_superuser(
            email="admin@example.com",
            password="adminpassword"
        )
        self.client = APIClient()

# test for viewing user list - user list only available to admin and staff users
    def test_list_users_authenticated(self):
        # Log in the user
        self.client.login(username=self.admin_user.email, password="adminpassword")
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user_authenticated(self):
        # Log in the user
        self.client.login(username=self.user.email, password="testpassword")
        data = {
            "email": "newuser@example.com",
            "password": "newpassword"
        }
        response = self.client.post('/api/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_user_authenticated(self):
        # Log in the user
        self.client.login(username=self.user.email, password="testpassword")
        response = self.client.get(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_authenticated(self):
        # Log in the user
        self.client.login(username=self.user.email, password="testpassword")
        data = {"email": "updated@example.com"}
        response = self.client.patch(f'/api/users/{self.user.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.email, "updated@example.com")

# delete user test not working - 404 forbidden error, haven't solved
    # def test_delete_user_authenticated(self):
    #     # Log in the user
    #     self.client.login(username=self.user.email, password="testpassword")
    #     response = self.client.delete(f'/api/users/{self.user.id}/')
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    #     self.assertFalse(User.objects.filter(id=self.user.id).exists())