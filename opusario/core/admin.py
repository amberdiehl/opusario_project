from django.contrib import admin
from .models import *


@admin.register(City)
class CityAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'state', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'city', 'size', 'industry', 'company_website', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )


@admin.register(FunctionalArea)
class FunctionalAreaAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'description', 'get_encoded_id')
    readonly_fields = ('get_encoded_id', )


@admin.register(Industry)
class IndustryAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'description', 'get_encoded_id')
    readonly_fields = ('get_encoded_id', )


@admin.register(State)
class StateAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'abbreviation', 'country', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )
