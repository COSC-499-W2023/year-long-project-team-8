import json
from django.forms.models import model_to_dict
from products.models import Product
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from products.models import Product
from products.serializers import ProductSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import User
from django.core.mail import send_mail

# currently set to display sample data and headers
# adjust to set to api home gui
@api_view(["GET"])
def api_home(request, *args, **kwaargs):
    
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        #instance = serializer.save()     # use this so save the data
        #print(instance)
        print(serializer.data)
        return Response(serializer.data)
    return Response({"invalid":"bad data"}, status=400)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        # ...

        return token

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        # Implement logic to send a password reset email
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()

        if user:
            refresh = RefreshToken.for_user(user)
            reset_token = str(refresh.access_token)

            # Send the reset link to the user's email
            reset_url = f'http://localhost/reset-password/{reset_token}/'
            send_mail('Password Reset', f'Click the link to reset your password: {reset_url}', 'PassThePlate Team', [email])

        return Response({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)

class ResetPasswordView(APIView):
    def post(self, request):
        # Implement logic to reset the password
        token = request.data.get('token')
        password = request.data.get('password')

        try:
            payload = RefreshToken(token).payload
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
            user.set_password(password)
            user.save()
            return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)