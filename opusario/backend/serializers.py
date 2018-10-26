import re
from rest_framework import serializers
from .models import *


class CitySerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_messages = []
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            error_messages.append('City name may only contain letters and spaces.')
            raise serializers.ValidationError(error_messages)
        return data

    class Meta:
        model = City
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):

    country = serializers.SerializerMethodField()
    state = serializers.SerializerMethodField()

    def validate(self, data):
        error_messages = []
        if re.match("^[a-zA-Z0-9 ]*$", data['name']):
            pass
        else:
            error_messages.append('Company name may only contain letters, numbers and spaces.')
            raise serializers.ValidationError(error_messages)
        return data

    class Meta:
        model = Company
        fields = '__all__'

    def get_country(self, obj):
        return obj.city.state.country_id

    def get_state(self, obj):
        return obj.city.state.id


class CountrySerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_messages = []
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            error_messages.append('Country name may only contain letters and spaces.')
            raise serializers.ValidationError(error_messages)
        return data

    class Meta:
        model = Country
        fields = '__all__'


class FunctionalAreaSerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_messages = []
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            error_messages.append('Functional area name may only contain letters and spaces.')
            raise serializers.ValidationError(error_messages)
        return data

    class Meta:
        model = FunctionalArea
        fields = '__all__'


class IndustrySerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_messages = []
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            error_messages.append('Industry name may only contain letters and spaces.')
            raise serializers.ValidationError(error_messages)
        return data

    class Meta:
        model = Industry
        fields = '__all__'


class RoleSerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_messages = []
        if data['functional_area'] == '0':
            error_messages.append('Add or select a functional area.')

        if not re.match("^[a-zA-Z0-9 ]*$", data['name']):
            error_messages.append('Role name may only contain letters, numbers and spaces.')

        if not re.match("^[a-zA-Z0-9., ]*$", data['description']):
            error_messages.append('Role description may only contain letters, numbers, periods, commas, and spaces.')

        if error_messages:
            raise serializers.ValidationError(error_messages)

        return data

    class Meta:
        model = Role
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):

    roles = serializers.SerializerMethodField()

    def validate(self, data):
        error_messages = []

        if not re.match("^[a-zA-Z0-9 ]*$", data['name']):
            error_messages.append('Skill name may only contain letters, numbers and spaces.')

        if not re.match("^[a-zA-Z0-9. ]*$", data['version']):
            error_messages.append('Skill version may only contain letters, numbers, periods, and spaces.')

        if error_messages:
            raise serializers.ValidationError(error_messages)

        return data

    class Meta:
        model = Skill
        fields = '__all__'

    def get_roles(self, obj):
        return obj.get_roles()


class StateSerializer(serializers.ModelSerializer):

    def validate(self, data):
        error_messages = []
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            error_messages.append('State name may only contain letters and spaces.')
            raise serializers.ValidationError(error_messages)
        return data

    class Meta:
        model = State
        fields = '__all__'


class ToolSerializer(serializers.ModelSerializer):

    roles = serializers.SerializerMethodField()

    def validate(self, data):
        error_messages = []

        if not re.match("^[a-zA-Z0-9 ]*$", data['name']):
            error_messages.append('Tool name may only contain letters, numbers and spaces.')

        if not re.match("^[a-zA-Z0-9. ]*$", data['version']):
            error_messages.append('Tool version may only contain letters, numbers, periods, and spaces.')

        if error_messages:
            raise serializers.ValidationError(error_messages)

        return data

    class Meta:
        model = Tool
        fields = '__all__'

    def get_roles(self, obj):
        return obj.get_roles()
