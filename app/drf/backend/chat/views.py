from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Chat, Message
from users.models import User
from products.models import Product 
from .serializers import ChatSerializer, MessageSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_list(request):
    user = request.user
    chat_list = Chat.objects.filter(sender=user) | Chat.objects.filter(receiver=user)
    serializer = ChatSerializer(chat_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_messages(request, chatId):  
    try:
        user = request.user
        chat = Chat.objects.get(pk=chatId)

        # Check if the user is a participant in the chat
        if user == chat.sender or user == chat.receiver:
            messages = Message.objects.filter(chat=chat)
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        else:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    except Chat.DoesNotExist:
        return Response({'error': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)
    
class ChatList(generics.ListCreateAPIView):
    serializer_class = ChatSerializer

    # Returning chat object
    def get_queryset(self):
        # Check if the user is authenticated before querying the chat list
        if self.request.user.is_authenticated:
            return Chat.objects.filter(sender=self.request.user) | Chat.objects.filter(receiver=self.request.user)
        else:
            print("No chat objects")
            return Chat.objects.none() 

    # Creating chat
    def perform_create(self, serializer):
        sender = self.request.user
        product = self.request.data.get('product')
        
        # Retrieve the product and its owner
        try:
            # Verify this product_id
            product = Product.objects.get(pk=product)
            receiver = product.owner
            

            # Check if a chat room already exists for the given sender, receiver, and product
            existing_chat = Chat.objects.filter(sender=sender, receiver=receiver, product=product).first()

            if existing_chat:
                # If a chat room already exists, associate the new message with the existing chat
                Message.objects.create(chat=existing_chat, sender=sender, receiver=receiver, message=self.request.data.get('message'))
                serializer.instance = existing_chat
            else:
                # If no chat room exists, create a new chat room
                new_chat = Chat.objects.create(sender=sender, receiver=receiver, product=product)
                Message.objects.create(chat=new_chat, sender=sender, receiver=receiver, message=self.request.data.get('message'))
                serializer.instance = new_chat

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
