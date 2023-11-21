import json
from django.forms.models import model_to_dict
from products.models import Product
from rest_framework.response import Response
from rest_framework.decorators import api_view

from products.models import Product
from products.serializers import ProductSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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

