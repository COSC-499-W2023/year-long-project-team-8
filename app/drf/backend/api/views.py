import json, string, random
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from products.serializers import ProductSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework import status
from users.models import User
import sendgrid
from sendgrid.helpers.mail import Mail

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
        
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()

        if user:
            # Generate a random code for password reset
            reset_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            user.reset_code = reset_code
            user.save()

             # Send the reset code to the user's email using SendGrid
            try:
                sg = sendgrid.SendGridAPIClient(api_key='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')
                from_email = 'passtheplate9@gmail.com'
                to_email = email
                subject = 'Password Reset'
                content = f'Hello! Your one time password reset code is: {reset_code} \nPass those plates.'
                mail = Mail(from_email, to_email, subject, content)
                sg.send(mail)
            except Exception as e:
                print("error email api")

            return Response({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User not found with the provided email'}, status=status.HTTP_404_NOT_FOUND)
    

@permission_classes([AllowAny])
class ResetPasswordView(APIView):
     def post(self, request):
        reset_code = request.data.get('reset_code')
        password = request.data.get('password')

        try:
            # Find all users with the matching reset code
            users = User.objects.filter(reset_code=reset_code)
        
            if not users.exists():
                return Response({'error': 'No users found with the given reset code'}, status=status.HTTP_404_NOT_FOUND)
            user = users.first()
        
            # Reset the password and clear old reset code
            user.set_password(password)
            user.reset_code = None  
            user.save()

            return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
