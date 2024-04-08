from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
 
from .serializers import UserSerializer
from .permissions import UserPermission,IsSelfOrReadOnly
from .models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
 
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


class SavedPostsViewSet(APIView):
    def patch(self, request):
        userId = request.data.get("userId")
        product_id = request.data.get('product_id')
        
        try:
            user = User.objects.get(id=userId)
            if product_id in user.saved_posts.values_list('id', flat=True):
                # Unsave post if not in list
                user.saved_posts.remove(product_id)
            else:
                # Save posts if not in list
                user.saved_posts.add(product_id)
            user.save()
            serializer = UserSerializer(user, context={'request': request})
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response('User DNE', status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    
        