# Generated by Django 5.2 on 2025-05-14 16:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shared_models', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='player',
            name='defeat',
        ),
        migrations.RemoveField(
            model_name='player',
            name='victory',
        ),
    ]
