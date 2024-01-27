from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
 
from .serializers import UserSerializer
from .permissions import UserPermission
from .models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.permissions import IsAuthenticated
 
class UserViewSet(ModelViewSet):
 
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by("-date_joined")
    # permission_classes = [UserPermission,]
    # authentication_classes = [JWTAuthentication]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
