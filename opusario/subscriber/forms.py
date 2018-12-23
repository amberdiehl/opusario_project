import datetime, re
from django.forms import ModelForm, inlineformset_factory, TextInput, ModelChoiceField, Textarea
from utils import validate
from experience.models import Country, State
from .models import *


class SimpleModelForm(ModelForm):

    placeholders = {}

    def __init__(self, *args, **kwargs):

        super(SimpleModelForm, self).__init__(*args, **kwargs)

        for field in self.fields:
            self.fields[field].widget.attrs['placeholder'] = self.placeholders.get(field, '')


class MyselfModelForm(SimpleModelForm):

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

        self.fields['country'].widget.attrs={'data-target': 'state', 'data-url': 'ajax-get-states'}
        self.fields['country'].initial=initial_country

        self.fields['state'].queryset=State.objects.filter(country=initial_country)
        self.fields['state'].widget.attrs={'data-target': 'city', 'data-url': 'ajax-get-cities'}
        self.fields['state'].initial=initial_state

        self.fields['city'].queryset=City.objects.filter(state=initial_state)

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


MyExternalAccountInlineFormSet = inlineformset_factory(Myself, MyExternalAccount, form=MyExternalAccountInlineForm,
                                                       extra=1, can_delete=True, can_order=False)
