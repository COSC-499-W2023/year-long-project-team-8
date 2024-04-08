from django.contrib import admin
from products.models import Product, ProductImages
from users.models import Review, User
from chat.models import Chat, Message
class UserAdmin(admin.ModelAdmin):

    search_fields = ("email",)

# Register your models here to view on admin site
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(ProductImages)
