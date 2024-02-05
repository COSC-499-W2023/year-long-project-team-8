from django.contrib import admin
from products.models import Product
from users.models import Review
from chat.models import Chat, Message

# Register your models here to view on admin site
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Chat)
admin.site.register(Message)
