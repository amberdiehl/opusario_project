# Generated by Django 2.1.1 on 2018-10-20 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_auto_20181020_2158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tool',
            name='name',
            field=models.CharField(help_text='Name of tool. E.g. PyCharm, GIMP, Adobe Premiere Pro, MS Office.', max_length=100, unique=True),
        ),
    ]