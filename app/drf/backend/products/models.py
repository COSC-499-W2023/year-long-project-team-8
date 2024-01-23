from django.db import models
from users.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone

# Create your models here.
class ProductManager(models.Manager):
    def update_valid_flag(self):
        """
        Update the 'valid' flag based on the 'best_before' date.
        """
        expired_products = self.filter(best_before__lte=timezone.now())
        expired_products.update(valid=False)
        
#The default auto field for Product is: products.Product.id
class Product(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=250, blank=True, null=True)
    categories = models.CharField(max_length=200, blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products") # when a user is deleted, their products are deleted
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    valid = models.BooleanField(default=True)
    best_before = models.DateTimeField(blank=False,null=False) # CHANGE TO DATEFIELD WHEN TIME PERMITTING (will need to drop database or update all products)
    
    objects = ProductManager()
    
    def clean(self):
        # Ensure best_before is set to a value after the current date
        if self.best_before and self.best_before <= timezone.now():
            raise ValidationError("The best before date must be after today's date.")

    def save(self, *args, **kwargs):
        # Call clean to perform validation
        self.clean()

        try:
            super().save(*args, **kwargs)
        except ValidationError as e:
            print(f"Validation Error: {e}")
   
class ProductImages(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="img",null=True, blank=True)