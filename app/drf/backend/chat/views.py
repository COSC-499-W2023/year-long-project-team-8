# chat/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Chat
from .serializers import ChatSerializer
from products.models import Product 

class ChatList(generics.ListCreateAPIView):
    serializer_class = ChatSerializer


    # Returning chat object
    def get_queryset(self):
        # Check if the user is authenticated before querying the chat list
        if self.request.user.is_authenticated:
            return Chat.objects.filter(sender=self.request.user) | Chat.objects.filter(receiver=self.request.user)
        else:
            return Chat.objects.none() 

    # Creating chat
    def perform_create(self, serializer):
        sender = self.request.user
        # product_id = self.request.data.get('product_id')
        #placeholder for testing
        product_id = self.request.data.get('product_id') 
        message = self.request.data.get('message')

        # Retrieve the product and its owner
        try:
            # Verify this product_id
            product = Product.objects.get(pk=product_id)
            receiver = product.owner
            

            # Check if a chat room already exists for the given sender, receiver, and product
            existing_chat = Chat.objects.filter(sender=sender, receiver=receiver, product_id=product_id).first()

            if existing_chat:
                # If a chat room already exists, add the new message to the existing chat
                existing_chat.message = message
                existing_chat.save()
                serializer.instance = existing_chat
            else:
                # If no chat room exists, create a new chat room
                serializer.save(sender=sender, receiver=receiver, product_id=product_id, message=message)

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

