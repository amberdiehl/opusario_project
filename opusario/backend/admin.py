from django.contrib import admin
from .models import *


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'state', )


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'city', 'size', 'industry', 'company_website', )


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', )


admin.site.register(FunctionalArea)
admin.site.register(Industry)


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'functional_area', 'name', 'management', 'leadership', )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_roles', 'name', 'version')


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbreviation', 'country', )
