# chat/models.py
from django.db import models
from django.conf import settings
from products.models import Product

class Message(models.Model):
    chat = models.ForeignKey('Chat', on_delete=models.CASCADE)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receiver')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Chat(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sender_chat')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receiver_chat')
    product = models.ForeignKey(Product, on_delete=models.CASCADE) 
    timestamp = models.DateTimeField(auto_now_add=True)

    @classmethod
    def create_chat(cls, sender, receiver, product):
        return cls.objects.create(sender=sender, receiver=receiver, product=product)
