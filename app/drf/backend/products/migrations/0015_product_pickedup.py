# Generated by Django 4.0.10 on 2024-03-05 19:24


from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0014_alter_product_best_before'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='pickedUp',
            field=models.BooleanField(default=False),
        ),
    ]