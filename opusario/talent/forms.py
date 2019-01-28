import datetime
import re
from django.forms import (
    inlineformset_factory,
    ModelForm,
    ModelChoiceField,
    Textarea,
    TextInput)
from utils import validate
from core.models import (
    Country,
    State)
from .models import *


class SimpleModelForm(ModelForm):

    placeholders = {}

    def __init__(self, *args, **kwargs):

        super(SimpleModelForm, self).__init__(*args, **kwargs)

        for field in self.fields:
            self.fields[field].widget.attrs['placeholder'] = self.placeholders.get(field, '')


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


class ProjectForm(SimpleModelForm):

    placeholders = {
        'name': 'Project name',
        'project_objective': 'Project objective',
        'start_year': 'Start year',
        'duration': 'Duration in weeks',
        'team_size': 'Team size',
        'code_repository': 'https://www.repository.com/project',
        'project_site': 'https://www.projectsite.com',
        'non_quantified_outcomes': 'Non-quantified project outcomes',
    }

    class Meta:
        model = Project
        fields = ['company', 'name', 'project_objective', 'start_year', 'duration', 'team_size', 'code_repository',
                  'project_site']
        widgets = {
            'name': TextInput(attrs={'col-size': 4}),
            'project_objective': Textarea(attrs={'rows': 5}),
            'code_repository': TextInput(attrs={'col-size': 4}),
            'project_site': TextInput(attrs={'col-size': 4}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Setup attributes for company here rather than in meta to access object instance
        key = '/{}'.format(self.instance.get_encoded_id()) if self.instance.pk else ''
        self.fields['company'].widget.attrs = {'data-next': '/core/company/?next=/talent/project{}'.format(key)}

    def clean_name(self):
        name = self.cleaned_data['name']
        if not re.match(validate['g0']['regex'], name):
            self.add_error('name', 'Name may only contain {}.'.format(validate['g0']['valid']))
        return name

    def clean_project_objective(self):
        project_objective = self.cleaned_data['project_objective']
        if not re.match(validate['g2']['regex'], project_objective):
            self.add_error('project_objective', 'Project objective may only contain {}.'
                           .format(validate['g2']['valid']))
        return project_objective

    def clean_start_year(self):
        start_year = self.cleaned_data['start_year']
        current_year = datetime.datetime.today().year
        if start_year > current_year:
            self.add_error('start_year', 'Start year cannot be in the future.')
        if start_year < (current_year-60):
            self.add_error('start_year', 'Start year cannot be earlier than {}.'.format(current_year-60))
        return start_year

    def clean_duration(self):
        duration = self.cleaned_data['duration']
        if duration > 156:  # Three years
            self.add_error('duration', "That's a big project! Please break your project into phases that are 3 years "
                                       "or less in duration.")
        return duration

    def clean_non_quantified_outcomes(self):
        non_quantified_outcomes = self.cleaned_data['non_quantified_outcomes']
        if not re.match(validate['g2']['regex'], non_quantified_outcomes):
            self.add_error('non_quantified_outcomes', 'Description of non-qualified outcomes may only contain {}.'
                           .format(validate['g2']['valid']))
        return non_quantified_outcomes


class ProjectOutcomeInlineForm(SimpleModelForm):

    placeholders = {
        'metric_amount': 'Metric amount',
    }

    class Meta:
        model = ProjectOutcome
        fields = ['metric_type', 'metric_amount', 'metric_subject', ]
        widgets = {
            'non_quantified_outcomes': Textarea(attrs={'rows': 3}),
        }


ProjectInlineFormSet = inlineformset_factory(Project, ProjectOutcome,
                                             form=ProjectOutcomeInlineForm, extra=1, can_delete=True, can_order=False)


class MyselfForm(SimpleModelForm):

    placeholders = {
        'first_name': 'First name',
        'last_name': 'Last name',
        'nick_name': 'Nick name',
        'slug': 'We will create this for you',
        'photo': 'Photo',
        'phone_number': 'Contact phone number',
        'email_address': 'Contact email address',
        'passion': 'Describe the work that you are meant to do',
        'personality': 'Describe your best traits',
        'goals': 'Describe your professional goals'
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
        model = Myself
        fields = ['first_name', 'last_name', 'nick_name', 'slug', 'photo', 'country', 'state', 'city', 'phone_number',
                  'email_address', 'passion', 'personality', 'goals', 'work_relationship', 'work_schedule',
                  'work_location', 'looking']
        widgets = {
            'slug': TextInput(attrs={'col-size': 4, 'read_only': 'read_only'}),
            'passion': Textarea(attrs={'rows': 5}),
            'personality': Textarea(attrs={'rows': 5}),
            'goals': Textarea(attrs={'rows': 5}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        if self.changed_data:
            if self.initial:
                use_key = self.initial['city']  # When form is loaded with existing company
            else:
                use_key = self.data['city']  # When form is re-loaded while adding a company
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

        self.fields['country'].widget.attrs = {
            'data-refresh': 'state',
            'data-refresh-url': 'core/ajax-get-states',
            'data-modal-url': 'core/ajax-put-country'
        }
        self.fields['country'].initial = initial_country

        self.fields['state'].queryset = State.objects.filter(country=initial_country)
        self.fields['state'].widget.attrs = {
            'data-refresh': 'city',
            'data-refresh-url': 'core/ajax-get-cities',
            'data-modal-url': 'core/ajax-put-state',
            'data-modal-dependency': 'country'
        }
        self.fields['state'].initial = initial_state

        self.fields['city'].queryset = City.objects.filter(state=initial_state)
        self.fields['city'].widget.attrs = {
            'data-modal-url': 'core/ajax-put-city',
            'data-modal-dependency': 'state'
        }

    def clean_first_name(self):
        name = self.cleaned_data['first_name']
        if not re.match(validate['g0']['regex'], name):
            self.add_error('first_name', 'First name may only contain {}.'.format(validate['g0']['valid']))
        return name

    def clean_last_name(self):
        name = self.cleaned_data['last_name']
        if not re.match(validate['g0']['regex'], name):
            self.add_error('last_name', 'Last name may only contain {}.'.format(validate['g0']['valid']))
        return name

    def clean_nick_name(self):
        name = self.cleaned_data['nick_name']
        if not re.match(validate['g0']['regex'], name):
            self.add_error('nick_name', 'Nick name may only contain {}.'.format(validate['g0']['valid']))
        return name

    def clean_phone_number(self):
        phone_number = self.cleaned_data['phone_number']
        if not re.match(validate['phone_number']['regex'], phone_number):
            self.add_error('phone_number', validate['phone_number']['valid'])
        return phone_number

    def clean_passion(self):
        description = self.cleaned_data['passion']
        if not re.match(validate['g2']['regex'], description):
            self.add_error('g2', 'Passion description may only contain {}.'.format(validate['g2']['valid']))
        return description

    def clean_personality(self):
        description = self.cleaned_data['personality']
        if not re.match(validate['g2']['regex'], description):
            self.add_error('g2', 'Personality description may only contain {}.'.format(validate['g2']['valid']))
        return description

    def clean_goals(self):
        description = self.cleaned_data['goals']
        if not re.match(validate['g2']['regex'], description):
            self.add_error('g2', 'Goals description may only contain {}.'.format(validate['g2']['valid']))
        return description


class MyExternalAccountInlineForm(SimpleModelForm):

    placeholders = {
        'url': 'Enter URL',
    }

    class Meta:
        model = MyExternalAccount
        fields = ['type', 'url', ]
        widgets = {
            'url': TextInput(attrs={'col-size': 4}),
        }


MyselfInlineFormSet = inlineformset_factory(Myself, MyExternalAccount, form=MyExternalAccountInlineForm, extra=1,
                                            can_delete=True, can_order=False)
