from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
 
from .serializers import UserSerializer
from .permissions import UserPermission,IsSelfOrReadOnly
from .models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.permissions import IsAuthenticated
 
class UserViewSet(ModelViewSet):
 
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by("-date_joined")
    permission_classes = [UserPermission]
    authentication_classes = [JWTAuthentication]

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
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

class SavedPostsViewSet(ModelViewSet):
    queryset = User.objects.all() 
    serializer_class = UserSerializer  

    def toggle_save(self, request, *args, **kwargs):
        user = self.get_object() 
        product_id = request.data.get('product_id')
        
        try:
            if product_id in user.saved_posts.values_list('id', flat=True):
                # Unsave post if not in list
                user.saved_posts.remove(product_id)
                message = f"Product {product_id} has been unsaved."
            else:
                # Save posts if not in list
                user.saved_posts.add(product_id)
                message = f"Product {product_id} has been saved."

            return Response({"message": message}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    
        