import re
from rest_framework import serializers
from .models import *


class IndustrySerializer(serializers.ModelSerializer):

    def validate(self, data):
        if re.match("^[a-zA-Z ]*$", data['name']):
            pass
        else:
            raise serializers.ValidationError({'name': 'Industry name may only consist of letters and spaces.'})
        return data

    class Meta:
        model = Industry
        fields = '__all__'
