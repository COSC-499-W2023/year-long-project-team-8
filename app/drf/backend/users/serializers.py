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
        fields = ["url", "email", "password", "firstname", "lastname", "phone", "received_reviews", "given_reviews", "rating", "profile_picture"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        receiver = User(email=validated_data["email"],username = validated_data["email"])
        receiver.set_password(validated_data["password"])
        receiver.save()
        return receiver
    
    def update(self, instance, validated_data):
        profile_picture = validated_data.pop("profile_picture", None)  # Extract profile picture data if present

        # Update the user fields
        instance.email = validated_data.get("email", instance.email)
        instance.firstname = validated_data.get("firstname", instance.firstname)
        instance.lastname = validated_data.get("lastname", instance.lastname)
        instance.phone = validated_data.get("phone", instance.phone)

        # Update the profile picture if it exists
        if profile_picture:
            instance.profile_picture = profile_picture

        # Save the changes
        instance.save()

        return instance
    