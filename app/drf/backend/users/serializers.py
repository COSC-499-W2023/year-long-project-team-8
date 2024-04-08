from rest_framework.serializers import ModelSerializer
 
from .models import User, Review
 
class ReviewSerializer(ModelSerializer):
    
    class Meta:
        model = Review
        fields = ["giver", "receiver","content", "rating", "timestamp"]
        
class UserSerializer(ModelSerializer):
    given_reviews = ReviewSerializer(many=True, read_only=True)
    received_reviews = ReviewSerializer(many=True, read_only=True)
     
    class Meta:
        model = User
        fields = ["url", "email", "password", "firstname", "lastname", "phone", "received_reviews", "given_reviews", "rating", "profile_picture", "id", "saved_posts"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        receiver = User(email=validated_data["email"],username = validated_data["email"])
        receiver.set_password(validated_data["password"])
        receiver.save()
        return receiver
