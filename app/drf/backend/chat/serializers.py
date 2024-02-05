from rest_framework import serializers
from .models import Chat, Message

#Chat instance serializer
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'
        
#Message serializer
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'