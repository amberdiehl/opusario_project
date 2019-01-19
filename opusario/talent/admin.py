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


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'start_year', 'duration', 'team_size', 'get_encoded_id')
    readonly_fields = ('get_encoded_id', )


@admin.register(ProjectOutcome)
class ProjectOutcomeAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'non_quantified_outcomes', 'metric_type', 'metric_amount', 'metric_subject')


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):

    list_display = ('id', 'functional_area', 'name', 'management', 'leadership', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'version', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )


@admin.register(State)
class StateAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'abbreviation', 'country', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )


@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'version', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )
