# Generated by Django 5.0.4 on 2024-04-08 00:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0002_remove_location_reviews_per_star'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='attributes',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='location',
            name='cost',
            field=models.CharField(default=1, max_length=5),
            preserve_default=False,
        ),
    ]
