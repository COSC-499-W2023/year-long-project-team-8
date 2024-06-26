from django.urls import reverse, path, include
from rest_framework import status
from django.core import mail
from unittest.mock import patch
from rest_framework.test import APITestCase,URLPatternsTestCase
from products.models import Product, ProductImages
from users.models import User
from chat.models import Chat, Message
from django.test import TestCase
from products.serializers import ProductSerializer
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.core.exceptions import ValidationError
import os
from django.core.files import File
from pathlib import Path
from django.conf import settings
from unittest.mock import Mock, mock_open
import io
from datetime import datetime, timedelta

        
class UserExistenceTest(TestCase):
    def test_user_exists(self):
        # Create a test user
        User.objects.create_user(email="testuser@test.com", password="testpassword")
        # Check if the user exists
        user_exists = User.objects.filter(email="testuser@test.com").exists()
        self.assertTrue(user_exists)
               
class ProductViewSetTest(APITestCase):
    def setUp(self):
        # self.product = Product.objects.create(title='Test Product', categories='test')

        self.user = User.objects.create_user(
            email="test@example.com",
            password="testpassword"
        )
        self.user2 = User.objects.create_user(
            email="test2@example.com",
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
        
    # test for filtering API product requests based on category   
    def test_filter_owner(self):
        access_token = self.get_auth_header(self.admin_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        # Make a GET request to the product detail view
        response = self.client.get('/api/products/', {'owner': self.user.id})
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
        response = self.client.get('/api/products/')
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
        
    def test_update_product_wrong_user(self):
        access_token = self.get_auth_header(self.user2)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.patch(self.url, {'title': 'updated title'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        response2 = self.client.get(self.url)
        self.assertEqual(response2.data['title'], 'Test Product')
               
    def test_delete_product_wrong_user(self):
        access_token = self.get_auth_header(self.user2)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'], 'You do not have permission to perform this action.')
        response2 = self.client.get(self.url)
        self.assertIsNotNone(response2.data)

        
    def test_update_product(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.patch(self.url, {'title': 'updated title'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'updated title')
        
    def test_delete_product(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertIsNone(response.data)
        
       
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
    
    
    def test_delete_user_authenticated(self):
       access_token = self.get_auth_header(self.user)
       self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
       response = self.client.delete(f'/api/users/{self.user.id}/')
        # May want a more specific code for deleted user
       self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
        #Verify the user has been deleted
       user_exists = User.objects.filter(id=self.user.id).exists()
       self.assertFalse(user_exists)
       
class SavePostViewTest(TestCase):
    def setUp(self):
        future_date = timezone.now() + timezone.timedelta(days=30)
        self.user = User.objects.create_user(
            email="test@example.com",
            password="testpassword"
        )
        self.product = Product.objects.create(
            title='Spaghetti',
            content='Goated italian food',
            owner=self.user,
            best_before=future_date,
            id = 1
        )
        self.client = APIClient()
    def get_auth_header(self, user):
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return access_token

    def test_toggle_save_view(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        data = {"userId" : self.user.id, "product_id" : self.product.id}
        response = self.client.patch('/api/save_posts/', data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
class ForgotPasswordViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            password="testpassword"
        )
        self.client = APIClient()

    def test_forgot_password_view(self):

        data = {"email": self.user.email}
        response = self.client.post('/api/auth/forgot-password/', data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ResetPasswordViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            password="testpassword"
        )
        self.client = APIClient()

    def test_reset_password_view(self):

        reset_code = 'mock_reset_code' 
        self.user.reset_code = reset_code
        self.user.save()

        # Confirm reset password
        data = {"reset_code": reset_code, "password": "new_password"}
        response = self.client.post('/api/auth/reset-password/', data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        

        # Login to get the authentication token with the new password
        login_data = {"email": self.user.email, "password": "new_password"}
        response = self.client.post('/api/token/', login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ProductSearchTestCase(APITestCase):
    def setUp(self):
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
       
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check if there is any data in the response
        if response.data and 'results' in response.data:
            results = response.data['results']
        
            self.assertEqual(len(results), 1)
            self.assertEqual(results[0].get('title'), 'Smartphone')
        else:
            print('Response data or "results" key is missing.')


    def test_search_multiple_keywords(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        # Perform a search with multiple keywords
        response = self.client.get('/api/products/', {'search': 'Smartphone performance'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        results = response.data['results']
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(results[0].get('title'), 'Smartphone')

    def test_search_no_results(self):
        access_token = self.get_auth_header(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        # Perform a search with keywords that should yield no results
        response = self.client.get('/api/products/', {'search': 'Nonexistent Keyword'})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)
  
# Test class for best_before date and valid flag      
class ProductValidityTests(TestCase):
    def setUp(self):
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
        with self.assertRaises(ValidationError): 
            self.product = Product(
                title='Expired Product',
                best_before=past_date,
                owner=self.user,
            )
            self.product.full_clean() 
            self.assertEqual(Product.objects.count(), 0)
       
 #Tests for chat functionality, need to be configured for new structure
class ChatTests(TestCase):
     def setUp(self):
         self.sender = User.objects.create_user(email='sender@sender.com', password='password1')
         self.receiver = User.objects.create_user(email='receiver@receiver.com', password='password2')
         future_date = timezone.now() + timezone.timedelta(days=30)
         self.product = Product.objects.create(
             title='Test Product',
             owner=self.receiver,
             best_before=future_date
         )
         self.client = APIClient()
     def test_create_chat(self):
         self.client.force_authenticate(user=self.sender)
         data = {
             'sender' : self.sender.id,
             'receiver' : self.receiver.id,
             'product': self.product.id,
             'message': 'Looks delicious. Where do I pick it up?'
         }
         response = self.client.post('/api/chat/', data, format='json')
         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
         self.assertEqual(Chat.objects.first().sender, self.sender)
         self.assertEqual(Chat.objects.first().receiver, self.receiver)
         self.assertEqual(Chat.objects.first().product, self.product)
         
     def test_get_chat_list(self):
         self.client.force_authenticate(user=self.sender)
         # Creating a chat between sender and receiver
         chat = Chat.objects.create(sender=self.sender, receiver=self.receiver, product=self.product)
         Message.objects.create(chat=chat, sender=self.sender, receiver=self.receiver, message='Hello!')
         response = self.client.get('/api/chat/', format='json')
         self.assertEqual(response.status_code, status.HTTP_200_OK)
           
class ReviewViewSetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='testuser@test.com', password='testpassword')
        
    def get_auth_header(self, user):
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return access_token
          
    # REFACTOR FOR NEW REVIEW CODE
    # def test_create_user_review(self):
    #     access_token = self.get_auth_header(self.user)
    #     self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    #     data = {
    #         "user": self.user.id,
    #         "content": "This is a test review for the user",
    #         "rating": '4.5'  # Change this to the desired rating value
    #     }

    #     # Make a POST request to create a review for the user
    #     response = self.client.post('/api/reviews/', data)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    #     # Check if the review was created successfully
    #     self.assertIn("user", response.data)
    #     self.assertEqual(response.data["content"], data["content"])
    #     self.assertEqual(response.data["rating"], data["rating"])
    #     self.assertEqual(response.data["user"], self.user.id)
        
    class ProfilePictureTest(APITestCase):
        def setUp(self):
            self.client = APIClient()
            self.user = User.objects.create_user(email='testuser@test.com', password='testpassword')
            
        def get_auth_header(self, user):
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return access_token
        
        def test_update_user_authenticated(self):
            access_token = self.get_auth_header(self.user)
            self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
            
            mock_image_data = b'Test image data'  # Replace with your mock image data
            self.mock_image_file = mock_open(read_data=mock_image_data)

            data = {"profile_picture": self.mock_image_file}
            response = self.client.patch(f'/api/users/{self.user.id}/', data)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.user.refresh_from_db()
            self.assertIsNotNone(self.user.profile_picture)
            