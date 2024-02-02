"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
 

from api.views import ForgotPasswordView, ResetPasswordView
from users.views import UserViewSet, ReviewViewSet
from chat.views import get_chat_list
from chat.views import ChatList
from products.views import ProductViewSet, ImageViewSet
from django.conf import settings
from django.conf.urls.static import static
 
router = routers.DefaultRouter()
router.register("users", UserViewSet)
router.register("products", ProductViewSet)
router.register('images', ImageViewSet)
router.register('reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("api.urls")),
    path("api/", include(router.urls)),
    path('api/my-products/', ProductViewSet.as_view({'get': 'list_my_products'}), name='my-products'),
    path('api/auth/forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('api/auth/reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('api/chat/', ChatList.as_view(), name='chat_list'),
    path('api/chat/list/', get_chat_list, name='get_chat_list'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
