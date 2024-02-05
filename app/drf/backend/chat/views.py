from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Chat
from users.models import User
from .serializers import ChatSerializer
from products.models import Product 


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_list(request):
    user = request.user
    chat_list = Chat.objects.filter(sender=user) | Chat.objects.filter(receiver=user)
    serializer = ChatSerializer(chat_list, many=True)
    return Response(serializer.data)
class ChatList(generics.ListCreateAPIView):
    serializer_class = ChatSerializer

    # Returning chat object
    def get_queryset(self):
        # Check if the user is authenticated before querying the chat list
        if self.request.user.is_authenticated:
            print("User req", self.request.user)
            return Chat.objects.filter(sender=self.request.user) | Chat.objects.filter(receiver=self.request.user)
        else:
            print("No chat objects")
            return Chat.objects.none() 

    # Creating chat
    def perform_create(self, serializer):
        sender = self.request.user
        product = self.request.data.get('product') 
        message = self.request.data.get('message')
        
        print('Sender', sender)
        print('Product', product)
        print('Message', message)

        # Retrieve the product and its owner
        try:
            # Verify this product_id
            product = Product.objects.get(pk=product)
            receiver = product.owner
            
            # Check if a chat room already exists for the given sender, receiver, and product
            existing_chat = Chat.objects.filter(sender=sender, receiver=receiver, product=product).first()

            if existing_chat:
                # If a chat room already exists, add the new message to the existing chat
                existing_chat.message = message
                existing_chat.save()
                serializer.instance = existing_chat
            else:
                # If no chat room exists, create a new chat room
                serializer.save(sender=sender, receiver=receiver, product=product, message=message)

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
