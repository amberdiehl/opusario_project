from django.contrib import admin
from .models import *


admin.site.register(City)
admin.site.register(Country)
admin.site.register(FunctionalArea)
admin.site.register(Industry)


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'abbreviation', )
