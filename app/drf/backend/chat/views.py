from django.shortcuts import render
from rest_framework import generics
from .models import Chat
from .serializers import ChatSerializer

# Basic list chat objects
class ChatList(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


# Implement other views for specific message functioning
