import json, string, random
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
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import User
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.urls import reverse

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
            # Generate a random code for password reset
            reset_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

            # Save the reset code in the user model (you may need to add a field for this)
            user.reset_code = reset_code
            user.save()

            # Send the reset code to the user's email
            send_mail('Password Reset', f'Your password reset code is: {reset_code}', 'PassThePlate Team', [email])

        return Response({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)
    

@permission_classes([AllowAny])
class ResetPasswordView(APIView):
     def post(self, request):
        # Implement logic to reset the password using the reset code
        reset_code = request.data.get('reset_code')
        password = request.data.get('password')

        try:
            # Find all users with the matching reset code
            users = User.objects.filter(reset_code=reset_code)
        
            if not users.exists():
                return Response({'error': 'No users found with the given reset code'}, status=status.HTTP_404_NOT_FOUND)
        
            # Log all users
            for user in users:
                print(f'Found user: {user.email}')
        
            # For simplicity, let's assume you want to use the first user (you can modify this logic)
            user = users.first()
        
            # Reset the password
            user.set_password(password)
            user.reset_code = None  # Reset the reset_code to avoid reuse
            user.save()

            return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)