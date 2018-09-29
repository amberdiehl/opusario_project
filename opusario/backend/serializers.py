import re
from rest_framework import serializers
from .models import *


class IndustrySerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_message1 = 'Industry name may only consist of letters and spaces.'
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            raise serializers.ValidationError({'name': error_message1})
        return data

    class Meta:
        model = Industry
        fields = '__all__'


class FunctionalAreaSerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_message1 = 'Functional area name may only consist of letters and spaces.'
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            raise serializers.ValidationError({'name': error_message1})
        return data

    class Meta:
        model = FunctionalArea
        fields = '__all__'
