import re
from django.forms import ModelForm, TextInput, ChoiceField, ModelChoiceField
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


class CityForm(SimpleModelForm):

    placeholders = {
        'name': 'City name',
    }

    class Meta:
        model = City
        fields = ['state', 'name', ]
        widgets = {
            'name': TextInput(attrs={'col-size': 3}),
        }

    def clean_name(self):
        name = self.cleaned_data['name'].title()
        if not re.match(validate['g0']['regex'], name):
            self.add_error('name', 'Name may only contain {}.'.format(validate['g0']['valid']))
        return name


class CompanyForm(SimpleModelForm):

    placeholders = {
        'name': 'Company name',
        'size': 'Employee count',
        'company_website': 'Company website'
    }

    country = ModelChoiceField(
        queryset=Country.objects.all(),
        help_text='Country where company is located.'
    )
    state = ModelChoiceField(
        queryset=State.objects.all(),
        help_text='State where company is located.'
    )

    class Meta:
        model = Company
        fields = ['name', 'country', 'state', 'city', 'size', 'industry', 'company_website', ]
        widgets = {
            'name': TextInput(attrs={'col-size': 4}),
            'company_website': TextInput(attrs={'col-size': 4}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.changed_data:
            if self.initial:
                use_key = self.initial['city']
            else:
                use_key = self.data['city']
            selected_city = City.objects.get(pk=use_key)
            initial_country = selected_city.state.country_id
            initial_state = selected_city.state_id
        else:
            try:
                default_country = Country.objects.get(name='United States')
                initial_country = default_country.pk
            except models.ObjectDoesNotExist:
                initial_country = 0
            initial_state = 0

        self.fields['country'].widget.attrs={'data-target': 'state', 'data-url': 'ajax-get-states'}
        self.fields['country'].initial=initial_country

        self.fields['state'].queryset=State.objects.filter(country=initial_country)
        self.fields['state'].widget.attrs={'data-target': 'city', 'data-url': 'ajax-get-cities'}
        self.fields['state'].initial=initial_state

        self.fields['city'].queryset=City.objects.filter(state=initial_state)

    def clean_name(self):
        name = self.cleaned_data['name']
        if not re.match('^[A-Z0-9 ]*$', name):
            name = name.title()
        if not re.match(validate['g1']['regex'], name):
            self.add_error('name', 'Name may only contain {}.'.format(validate['g1']['valid']))
        return name
