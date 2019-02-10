# Generated by Django 2.1.1 on 2019-02-09 23:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of city.', max_length=50, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': 'Cities',
            },
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of company.', max_length=255)),
                ('size', models.IntegerField(blank=True, help_text='Number of employees.', null=True)),
                ('company_website', models.URLField(blank=True, help_text='Company website; e.g. https://www.opusario.com', null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('city', models.ForeignKey(help_text='City where company is located.', null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.City')),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': 'Companies',
            },
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of country.', max_length=50, unique=True)),
                ('abbreviation', models.CharField(blank=True, help_text='Optional internet country code assignment.', max_length=4, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': 'Countries',
            },
        ),
        migrations.CreateModel(
            name='FunctionalArea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name for functional area, e.g. Technology, Marketing, Product Management, Executive Management.', max_length=100, unique=True)),
                ('description', models.TextField(blank=True, help_text='General description of this functional area.', null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Industry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Industry name', max_length=100, unique=True)),
                ('description', models.TextField(blank=True, help_text='General description of this industry.', null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['name'],
                'verbose_name_plural': 'Industries',
            },
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of state.', max_length=50, unique=True)),
                ('abbreviation', models.CharField(blank=True, help_text='For United States, two character abbreviation for state.', max_length=2, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('country', models.ForeignKey(help_text='Country where state is located.', null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.Country')),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.AddField(
            model_name='company',
            name='industry',
            field=models.ForeignKey(help_text='Primary source of revenue.', null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.Industry'),
        ),
        migrations.AddField(
            model_name='city',
            name='state',
            field=models.ForeignKey(help_text='State where city is located.', null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.State'),
        ),
        migrations.AlterUniqueTogether(
            name='company',
            unique_together={('name', 'city')},
        ),
    ]
