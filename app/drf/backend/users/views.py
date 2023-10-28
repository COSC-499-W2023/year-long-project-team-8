from rest_framework.authentication import TokenAuthentication
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status

from .serializers import UserSerializer
from .permissions import UserPermission
from .models import User
 
class UserViewSet(ModelViewSet):
 
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by("-date_joined")
    permission_classes = [UserPermission,]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        user = serializer.instance

        # Generate access token
        token, created = Token.objects.get_or_create(user=user)

        headers = self.get_success_headers(serializer.data)
        response_data = serializer.data
        response_data['access_token'] = token.key  # Include access token in the response

        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
    
class UpdateUserDetails(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def patch(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            # Generate a new access token
            new_access_token = str(request.auth)

            # Include the new access token in the response
            response_data = {
                'user_details': serializer.data,
                'access_token': new_access_token,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
