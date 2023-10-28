from rest_framework.serializers import ModelSerializer
 
from .models import User
 
class UserSerializer(ModelSerializer):
     
    class Meta:
        model = User
        fields = ["url", "email", "password", "firstname", "lastname", "phone"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User(email=validated_data["email"],username = validated_data["email"])
        user.set_password(validated_data["password"])
        user.firstname = validated_data.get("firstname", "")
        user.lastname = validated_data.get("lastname", "")
        user.phone = validated_data.get("phone", "")
        user.save()
        return user