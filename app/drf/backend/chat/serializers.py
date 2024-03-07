from rest_framework import serializers
from .models import Chat, Message
from users.models import User

#class UserSerializer(serializers.ModelSerializer):
    #class Meta:
       # model = User
       # fields = ['id', 'email', 'firstname', 'profile_picture']

#Chat instance serializer
class ChatSerializer(serializers.ModelSerializer):
    #sender = UserSerializer()
    #receiver = UserSerializer()
    #sender_id = serializers.PrimaryKeyRelatedField(source='sender', read_only=True)
    #receiver_id = serializers.PrimaryKeyRelatedField(source='receiver', read_only=True)
    class Meta:
        model = Chat
        fields = '__all__'
        
#Message serializer
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'