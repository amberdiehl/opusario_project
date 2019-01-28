from django.contrib import admin
from .models import *


@admin.register(DegreeOfUse)
class DegreeOfUseAdmin(admin.ModelAdmin):
    list_display = ('id', 'degree_used', 'weight', 'display_order', )


@admin.register(ExternalAccountType)
class ExternalAccountTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', )


@admin.register(InvolvementLevel)
class InvolvementLevelAdmin(admin.ModelAdmin):
    list_display = ('id', 'involvement', 'weight', )


@admin.register(MetricSubject)
class MetricSubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'metric_subject', )


@admin.register(MetricType)
class MetricTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'metric_type', )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'start_year', 'duration', 'team_size', 'get_encoded_id')
    readonly_fields = ('get_encoded_id', )


@admin.register(ProjectOutcome)
class ProjectOutcomeAdmin(admin.ModelAdmin):
    list_display = ('id', 'project', 'metric_type', 'metric_amount', 'metric_subject')


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):

    list_display = ('id', 'functional_area', 'name', 'management', 'leadership', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'version', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )


@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'version', 'get_encoded_id', )
    readonly_fields = ('get_encoded_id', )


@admin.register(WorkLocation)
class WorkLocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'location', )


@admin.register(WorkRelationship)
class WorkRelationshipAdmin(admin.ModelAdmin):
    list_display = ('id', 'relationship', )


@admin.register(WorkSchedule)
class WorkScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'schedule', )
