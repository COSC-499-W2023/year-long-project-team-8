from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=250, blank=True, null=True)
    categories = models.CharField(max_length=200, blank=True, null=True)
