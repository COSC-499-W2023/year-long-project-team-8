from rest_framework.serializers import ModelSerializer
 
from .models import User, Review
 
class ReviewSerializer(ModelSerializer):
    
    class Meta:
        model = Review
        fields = ["user", "content", "rating", "timestamp"]
        
class UserSerializer(ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
     
    class Meta:
        model = User
        fields = ["url", "email", "password", "firstname", "lastname", "phone", "reviews", "rating"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User(email=validated_data["email"],username = validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()
        return user
    