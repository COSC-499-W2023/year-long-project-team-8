from django.urls import path
from .views import UserProfileView

urlpatterns = [
    path('api/user-profile/', UserProfileView.as_view(), name='user-profile'),
]

