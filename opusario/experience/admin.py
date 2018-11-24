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


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'start_year', 'duration', 'team_size')


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'functional_area', 'name', 'management', 'leadership', )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'version', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbreviation', 'country', )


@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'version', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )
