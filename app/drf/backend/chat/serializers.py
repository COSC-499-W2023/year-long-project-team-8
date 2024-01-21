from rest_framework import serializers
from .models import Chat

#basic serializer for chat instances
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'
