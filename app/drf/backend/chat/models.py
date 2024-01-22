# chat/models.py
from django.db import models
from django.conf import settings
from products.models import Product

class Chat(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receiver')
    product = models.ForeignKey(Product, on_delete=models.CASCADE) 
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    @classmethod
    def create_chat(cls, sender, receiver, product, message):
        return cls.objects.create(sender=sender, receiver=receiver, product=product, message=message)

