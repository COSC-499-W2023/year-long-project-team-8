from django.core.management.base import BaseCommand
from django.db.models.fields import AutoField
from products.models import Product

class Command(BaseCommand):
    help = 'Prints the default auto field for the Product model'

    def handle(self, *args, **options):
        # Get the default auto field for the Product model
        auto_field = Product._meta.auto_field

        # Check if it's an instance of AutoField
        if isinstance(auto_field, AutoField):
            self.stdout.write(self.style.SUCCESS(f"The default auto field for Product is: {auto_field}"))
        else:
            self.stdout.write(self.style.ERROR("No default auto field found."))
