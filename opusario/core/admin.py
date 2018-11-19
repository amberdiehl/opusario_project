from django.contrib import admin
from .models import *


@admin.register(WorkRelationship)
class WorkRelationshipAdmin(admin.ModelAdmin):
    list_display = ('id', 'relationship', )


@admin.register(WorkSchedule)
class WorkScheduleAdmin(admin.ModelAdmin):
    list_display = ('id', 'schedule', )


@admin.register(WorkLocation)
class WorkLocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'location', )


@admin.register(ExternalAccountType)
class ExternalAccountTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', )


@admin.register(InvolvementLevel)
class InvolvementLevelAdmin(admin.ModelAdmin):
    list_display = ('id', 'involvement', 'weight', )


@admin.register(MetricType)
class MetricTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'metric_type', )


@admin.register(MetricSubject)
class MetricSubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'metric_subject', )


@admin.register(DegreeOfUse)
class DegreeOfUseAdmin(admin.ModelAdmin):
    list_display = ('id', 'degree_used', 'weight', )
