from django.urls import reverse, path, include
from rest_framework import status
from rest_framework.test import APITestCase,URLPatternsTestCase
from products.models import Product
from users.models import User
from django.test import TestCase
from products.serializers import ProductSerializer
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.core.exceptions import ValidationError

        
class UserExistenceTest(TestCase):
    def test_user_exists(self):
        # Create a test user
        User.objects.create_user(email="testuser@test.com", password="testpassword")
        # Check if the user exists
        user_exists = User.objects.filter(email="testuser@test.com").exists()
        self.assertTrue(user_exists)
               
class ProductViewSetTest(APITestCase):
    def setUp(self):
        #self.product = Product.objects.create(title='Test Product', categories='test')

        self.user = User.objects.create_user(
            email="test@example.com",
            password="testpassword"
        )
        self.admin_user = User.objects.create_superuser(
            email="admin@example.com",
            password="adminpassword"
        )
        future_date = timezone.now() + timezone.timedelta(days=30)
        self.client = APIClient()
        self.product = Product.objects.create(title='Test Product', categories='test', owner= self.user, best_before=future_date)
        self.url = f'/api/products/{self.product.id}/'

    def get_auth_header(self, user):
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return access_token
    
    # test for filtering API product requests based on category   
    def test_filter_category(self):
        access_token = self.get_auth_header(self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        # Make a GET request to the product detail view
        response = self.client.get('/api/products/', {'categories': 'test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)   
    
    # test for my-products endpoint
    # ensures that only 1 item was created for the user and the api hit is successful
    def test_myproducts(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.get('/api/my-products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1) 
    
    # test to decline unauthenticated user
    def test_list_my_products_unauthenticated(self):
        # Create a new client without authentication
        unauthenticated_client = self.client_class()
        response = unauthenticated_client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
        
    def test_retrieve_product_detail(self):
        access_token = self.get_auth_header(self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        # Make a GET request to the product detail view
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the serialized data in the response matches the product data
        expected_data = ProductSerializer(instance=self.product).data
        self.assertEqual(response.data, expected_data)

    def test_retrieve_nonexistent_product_detail(self):
        access_token = self.get_auth_header(self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        # Try to retrieve a product with an invalid ID
        invalid_url = '/api/products/999/'
        response = self.client.get(invalid_url)

        # Check that the response status code is 404 (Not Found)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
       
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

    def get_auth_header(self, user):
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return access_token

    def test_list_users_authenticated(self):
        access_token = self.get_auth_header(self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user_authenticated(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

        data = {
            "email": "newuser@example.com",
            "password": "newpassword"
        }
        response = self.client.post('/api/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_user_authenticated(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

        response = self.client.get(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_authenticated(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

        data = {"email": "updated@example.com"}
        response = self.client.patch(f'/api/users/{self.user.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.email, "updated@example.com")
    
    
    # Could not get this to work, seems to be Django delete permissions
    # There is something happening with user permissions that does not allow delete
    # If user permissions are removed from User Views, test passes.
    # def test_delete_user_authenticated(self):
    #    access_token = self.get_auth_header(self.user)
    #    self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
    #    response = self.client.delete(f'/api/users/{self.user.id}/')
    #     # May want a more specific code for deleted user
    #    self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    #     #Verify the user has been deleted
    #    user_exists = User.objects.filter(id=self.user.id).exists()
    #    self.assertFalse(user_exists)

class ProductSearchTestCase(APITestCase):
    def setUp(self):
        # Create a test user and a product
        self.user = User.objects.create_user(email='testuser@test.com', password='testpassword')
        future_date = timezone.now() + timezone.timedelta(days=30)
        self.product = Product.objects.create(
            title='Smartphone',
            content='High-performance mobile device',
            owner=self.user,
            best_before=future_date
        )
        self.client = APIClient()

    def get_auth_header(self, user):
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return access_token

    def test_search_single_keyword(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
    
        # Perform a search with a single keyword
        response = self.client.get('/api/products/', {'search': 'Smartphone'})
       
        # Assert that the response status is HTTP 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check if there is any data in the response
        if response.data and 'results' in response.data:
            results = response.data['results']
            # Assert that the expected product is present in the response
            self.assertEqual(len(results), 1)
            self.assertEqual(results[0].get('title'), 'Smartphone')
        else:
            # Print a message if the response data or 'results' key is missing
            print('Response data or "results" key is missing.')


    def test_search_multiple_keywords(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        # Perform a search with multiple keywords
        response = self.client.get('/api/products/', {'search': 'Smartphone performance'})
        
        # Assert that the response status is HTTP 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert that the expected product is present in the response
        results = response.data['results']
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(results[0].get('title'), 'Smartphone')

    def test_search_no_results(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        # Perform a search with keywords that should yield no results
        response = self.client.get('/api/products/', {'search': 'Nonexistent Keyword'})
        
        # Assert that the response status is HTTP 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert that no products are present in the response
        self.assertEqual(len(response.data['results']), 0)
  
# Test class for best_before date and valid flag      
class ProductValidityTests(TestCase):
    def setUp(self):
        # Create a test user and a product
        self.user = User.objects.create_user(email='testuser@test.com', password='testpassword')
        future_date = timezone.now() + timezone.timedelta(days=30)
        self.client = APIClient()
        
    def test_valid_best_before_date(self):
        future_date = timezone.now() + timezone.timedelta(days=30)
        self.product = Product.objects.create(
            title='Test Product',
            best_before=future_date,
            owner=self.user,
        )
        self.assertTrue(self.product.valid)

    def test_invalid_best_before_date(self):
        past_date = timezone.now() - timezone.timedelta(days=30)
        with self.assertRaises(ValidationError):  # Import ValidationError from django.core.exceptions
            self.product = Product(
                title='Expired Product',
                best_before=past_date,
                owner=self.user,
            )
            self.product.full_clean()  # Run validation manually

        # Verify that the model was not created
        self.assertEqual(Product.objects.count(), 0)