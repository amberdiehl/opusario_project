import re
from django.forms import ModelForm, TextInput, ChoiceField
from utils import validate
from .models import *


class CountrySelectField(ChoiceField):

    choices = Country.objects.all()


class SimpleModelForm(ModelForm):

    placeholders = {}

    def __init__(self, *args, **kwargs):

        super(SimpleModelForm, self).__init__(*args, **kwargs)

        for field in self.fields:
            self.fields[field].widget.attrs['placeholder'] = self.placeholders.get(field, '')


class IndustryForm(SimpleModelForm):

    placeholders = {
        'name': 'Industry name',
        'description': 'Brief industry description'
    }

    class Meta:
        model = Industry
        fields = ['name', 'description', ]

    def clean_name(self):
        name = self.cleaned_data['name']
        if not re.match(validate['g0']['regex'], name):
            self.add_error('name', 'Name may only contain {}.'.format(validate['g0']['valid']))
        return name

    def clean_description(self):
        description = self.cleaned_data['description']
        if not re.match(validate['g2']['regex'], description):
            self.add_error('description', 'Description may only contain {}'.format(validate['g2']['valid']))
        return description


class FunctionalAreaForm(SimpleModelForm):

    placeholders = {
        'name': 'Functional area name',
        'description': 'Brief functional area description'
    }

    class Meta:
        model = FunctionalArea
        fields = ['name', 'description', ]

    def clean_name(self):
        name = self.cleaned_data['name']
        if not re.match(validate['g0']['regex'], name):
            self.add_error('name', 'Name may only contain {}.'.format(validate['g0']['valid']))
        return name

    def clean_description(self):
        description = self.cleaned_data['description']
        if not re.match(validate['g2']['regex'], description):
            self.add_error('description', 'Description may only contain {}'.format(validate['g2']['valid']))
        return description


class SkillForm(SimpleModelForm):

    placeholders = {
        'name': 'Skill name',
        'version': 'Skill version'
    }

    class Meta:
        model = Skill
        fields = ['name', 'version', ]

    def clean_name(self):
        name = self.cleaned_data['name']
        if not re.match(validate['g1']['regex'], name):
            self.add_error('name', 'Name may only contain {}.'.format(validate['g1']['valid']))
        return name

    def clean_version(self):
        version = self.cleaned_data['version']
        if version:
            if not re.match(validate['g3']['regex'], version):
                self.add_error('version', 'Version may only contain {}'.format(validate['g3']['valid']))
        return version


class ToolForm(SimpleModelForm):

    placeholders = {
        'name': 'Tool name',
        'version': 'Tool version'
    }

    class Meta:
        model = Tool
        fields = ['name', 'version', ]

    def clean_name(self):
        name = self.cleaned_data['name']
        if not re.match(validate['g1']['regex'], name):
            self.add_error('name', 'Name may only contain {}.'.format(validate['g1']['valid']))
        return name

    def clean_version(self):
        version = self.cleaned_data['version']
        if version:
            if not re.match(validate['g3']['regex'], version):
                self.add_error('version', 'Version may only contain {}'.format(validate['g3']['valid']))
        return version


class RoleForm(SimpleModelForm):

    placeholders = {
        'name': 'Role name',
        'description': 'Role description'
    }

    class Meta:
        model = Role
        fields = ['functional_area', 'name', 'description', 'management', 'leadership', ]
        widgets = {
            'name': TextInput(attrs={'col-size': 4}),
        }

    def clean_name(self):
        name = self.cleaned_data['name']
        if not re.match(validate['g1']['regex'], name):
            self.add_error('name', 'Name may only contain {}.'.format(validate['g1']['valid']))
        return name

    def clean_description(self):
        description = self.cleaned_data['description']
        if description:
            if not re.match(validate['g2']['regex'], description):
                self.add_error('description', 'Version may only contain {}'.format(validate['g2']['valid']))
        return description


class CountryForm(SimpleModelForm):

    placeholders = {
        'name': 'Country name',
    }

    class Meta:
        model = Country
        fields = ['name', ]
        widgets = {
            'name': TextInput(attrs={'col-size': 4}),
        }

    def clean_name(self):
        name = self.cleaned_data['name']
        if not re.match(validate['g0']['regex'], name):
            self.add_error('name', 'Name may only contain {}.'.format(validate['g0']['valid']))
        return name


class StateForm(SimpleModelForm):

    placeholders = {
        'name': 'State name',
    }

    class Meta:
        model = State
        fields = ['country', 'name', ]
        widgets = {
            'name': TextInput(attrs={'col-size': 3}),
        }

    def clean_name(self):
        name = self.cleaned_data['name'].title()
        country = self.cleaned_data['country']
        if not re.match(validate['g0']['regex'], name):
            self.add_error('name', 'Name may only contain {}.'.format(validate['g0']['valid']))
            return name # Don't go any further if name has bad characters
        if country == 'United States':
            abbreviation = US_STATE_ABBREVIATIONS.get(name, '')
            if len(abbreviation) == 0:
                self.add_error('name', '{} is not a valid US state.'.format(name))
        return name
