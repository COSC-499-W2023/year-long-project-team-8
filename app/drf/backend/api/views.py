import json
from django.forms.models import model_to_dict
from products.models import Product
from rest_framework.response import Response
from rest_framework.decorators import api_view

from products.models import Product
from products.serializers import ProductSerializer

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



