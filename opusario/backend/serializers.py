import re
from rest_framework import serializers
from .models import *


class CitySerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_message1 = 'City may only consist of letters and spaces.'
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            raise serializers.ValidationError({'name': error_message1})
        return data

    class Meta:
        model = City
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_messages = []
        if re.match("^[a-zA-Z0-9 ]*$", data['name']):
            pass
        else:
            error_messages.append('Company name may only consist of letters, numbers and spaces.')
            raise serializers.ValidationError(error_messages)
        return data

    class Meta:
        model = Company
        fields = '__all__'


class CountrySerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_message1 = 'Country may only consist of letters and spaces.'
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            raise serializers.ValidationError({'name': error_message1})
        return data

    class Meta:
        model = Country
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


class StateSerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_message1 = 'State may only consist of letters and spaces.'
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            raise serializers.ValidationError({'name': error_message1})
        return data

    class Meta:
        model = State
        fields = '__all__'
