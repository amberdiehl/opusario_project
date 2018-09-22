from rest_framework import serializers
from .models import *


class IndustrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Industry
        fields = '__all__'
