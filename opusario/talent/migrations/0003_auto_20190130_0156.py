# Generated by Django 2.1.1 on 2019-01-30 01:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('talent', '0002_auto_20190130_0151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myself',
            name='phone_number',
            field=models.CharField(help_text='Contact phone number.', max_length=20),
        ),
    ]
