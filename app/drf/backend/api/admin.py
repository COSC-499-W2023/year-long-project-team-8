from django.contrib import admin
from products.models import Product
from users.models import Review

# Register the Product model with the admin site
admin.site.register(Product)
# Register your models here.
admin.site.register(Review)
