# Generated by Django 4.0.10 on 2024-01-25 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0011_alter_product_best_before'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='best_before',
            field=models.DateTimeField(),
        ),
    ]
