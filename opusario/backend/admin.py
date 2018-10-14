from django.contrib import admin
from .models import *


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', )


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'city', 'state')


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', )


admin.site.register(FunctionalArea)
admin.site.register(Industry)


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbreviation', )
