from django.db.utils import IntegrityError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from braces.views import LoginRequiredMixin
from django.contrib import messages
from django.views.generic.edit import CreateView, UpdateView
from utils import hasher, validate  # Pycharm doesn't see this is used but it is.

import talent.models
from .forms import *
from .models import *

MINIMUM_COUNTRY_LENGTH = 4
MINIMUM_STATE_LENGTH = 2


def ajax_get_states(request):
    country_id = request.GET.get('selected')
    states = State.objects.filter(country=country_id)
    return render(request, 'talent/_select_options.html', {'items': states})


def ajax_get_cities(request):
    state_id = request.GET.get('selected')
    cities = City.objects.filter(state=state_id)
    return render(request, 'talent/_select_options.html', {'items': cities})


def ajax_put_country(request):
    country_name = request.POST.get('country', '')
    if (not re.match(validate['g0']['regex'], country_name)) or (len(country_name) < MINIMUM_COUNTRY_LENGTH):
        return JsonResponse({'success': False, 'data': 'Invalid country name.'})
    else:
        new_country = Country()
        new_country.name = country_name
        try:
            new_country.save()
        except IntegrityError:
            return JsonResponse({'success': False, 'data': 'Country already exists.'})
        else:
            return JsonResponse({'success': True, 'data': {'id': new_country.pk, 'name': new_country.name}})


def ajax_put_state(request):

    state_name = request.POST.get('state', '')
    country_id = request.POST.get('dependency', 0)
    request_response = {
        'success': True,
        'data': {}
    }

    if (not re.match(validate['g0']['regex'], state_name)) or (len(state_name) < MINIMUM_STATE_LENGTH):
        request_response['success'] = False
        request_response['data'] = 'Invalid state name.'
    if not request_response['success']:
        return JsonResponse(request_response)

    if re.match("^[0-9]*$", country_id):  # Ensure numeric value only
        country = Country.objects.filter(pk=country_id)  # Ensure country exists
        if len(country) == 0:
            request_response['success'] = False
    else:
        request_response['success'] = False
    if not request_response['success']:
        request_response['data'] = 'Invalid request.'
        return JsonResponse(request_response)

    new_state = State()
    new_state.name = state_name
    new_state.country = country[0]
    try:
        new_state.save()
    except IntegrityError:
        return JsonResponse({'success': False, 'data': 'State already exists.'})
    else:
        return JsonResponse({'success': True, 'data': {'id': new_state.pk, 'name': new_state.name}})


def ajax_put_city(request):

    city_name = request.POST.get('city', '')
    state_id = request.POST.get('dependency', 0)
    request_response = {
        'success': True,
        'data': {}
    }

    if (not re.match(validate['g0']['regex'], city_name)) or (len(city_name) < MINIMUM_STATE_LENGTH):
        request_response['success'] = False
        request_response['data'] = 'Invalid city name.'
    if not request_response['success']:
        return JsonResponse(request_response)

    if re.match("^[0-9]*$", state_id):  # Ensure numeric value only
        state = State.objects.filter(pk=state_id)  # Ensure state exists
        if len(state) == 0:
            request_response['success'] = False
    else:
        request_response['success'] = False
    if not request_response['success']:
        request_response['data'] = 'Invalid request.'
        return JsonResponse(request_response)

    new_city = City()
    new_city.name = city_name
    new_city.state = state[0]
    try:
        new_city.save()
    except IntegrityError:
        return JsonResponse({'success': False, 'data': 'City already exists.'})
    else:
        return JsonResponse({'success': True, 'data': {'id': new_city.pk, 'name': new_city.name}})


class ModelFormActionMixin(object):

    @property
    def success_message(self):
        return NotImplemented

    def form_valid(self, form):
        messages.info(self.request, self.success_message)
        return super(ModelFormActionMixin, self).form_valid(form)


class SimpleModelCreateView(LoginRequiredMixin, ModelFormActionMixin, CreateView):

    title = NotImplemented
    form_class = NotImplemented
    template_name = 'talent/simple_model_form.html'
    success_message = NotImplemented

    def __init__(self, **kwargs):
        super(SimpleModelCreateView, self).__init__(**kwargs)
        self.success_message = '{} added'.format(self.title)

    def dispatch(self, *args, **kwargs):
        # If next defined, go to specified path rather than default behavior
        if self.request.GET.get('next'):
            self.success_url = self.request.GET['next']
        return super(SimpleModelCreateView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(SimpleModelCreateView, self).get_context_data(**kwargs)
        context['title'] = self.title
        return context


class SimpleModelUpdateView(LoginRequiredMixin, ModelFormActionMixin, UpdateView):

    model = NotImplemented
    title = NotImplemented
    form_class = NotImplemented
    template_name = 'talent/simple_model_form.html'
    success_message = NotImplemented

    def __init__(self, **kwargs):
        super(SimpleModelUpdateView, self).__init__(**kwargs)
        self.success_message = '{} updated'.format(self.title)

    def get_object(self, queryset=None):
        model_instance = get_object_or_404(getattr(talent.models, self.model),
                                           pk=hasher.decode(self.kwargs.get('pk'))[0])  # hasher returns tuple
        return model_instance

    def get_context_data(self, **kwargs):
        context = super(SimpleModelUpdateView, self).get_context_data(**kwargs)
        context['title'] = self.title
        return context


class IndustryCreateView(SimpleModelCreateView):

    title = 'Industry'
    form_class = IndustryForm


class IndustryUpdateView(SimpleModelUpdateView):

    model = 'Industry'
    title = 'Industry'
    form_class = IndustryForm


class FunctionalAreaCreateView(SimpleModelCreateView):

    title = 'Functional Area'
    form_class = FunctionalAreaForm


class FunctionalAreaUpdateView(SimpleModelUpdateView):

    model = 'FunctionalArea'
    title = 'Functional Area'
    form_class = FunctionalAreaForm


class SkillCreateView(SimpleModelCreateView):

    title = 'Skill'
    form_class = SkillForm


class SkillUpdateView(SimpleModelUpdateView):

    model = 'Skill'
    title = 'Skill'
    form_class = SkillForm


class ToolCreateView(SimpleModelCreateView):

    title = 'Tool'
    form_class = ToolForm


class ToolUpdateView(SimpleModelUpdateView):

    model = 'Tool'
    title = 'Tool'
    form_class = ToolForm


class RoleCreateView(SimpleModelCreateView):

    title = 'Role'
    form_class = RoleForm


class RoleUpdateView(SimpleModelUpdateView):

    model = 'Role'
    title = 'Role'
    form_class = RoleForm


class CountryCreateView(SimpleModelCreateView):

    title = 'Country'
    form_class = CountryForm


class CountryUpdateView(SimpleModelUpdateView):

    model = 'Country'
    title = 'Country'
    form_class = CountryForm


class StateCreateView(SimpleModelCreateView):

    title = 'State'
    form_class = StateForm


class StateUpdateView(SimpleModelUpdateView):

    model = 'State'
    title = 'State'
    form_class = StateForm


class CityCreateView(SimpleModelCreateView):

    title = 'City'
    form_class = CityForm


class CityUpdateView(SimpleModelUpdateView):

    model = 'City'
    title = 'City'
    form_class = CityForm


class CompanyCreateView(SimpleModelCreateView):

    title = 'Company'
    form_class = CompanyForm


class CompanyUpdateView(SimpleModelUpdateView):

    model = 'Company'
    title = 'Company'
    form_class = CompanyForm


class ProjectAndProjectOutcomesCreateView(SimpleModelCreateView):

    title = 'Project'
    form_class = ProjectForm

    def get_context_data(self, **kwargs):
        context = super(ProjectAndProjectOutcomesCreateView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['formset'] = ProjectInlineFormSet(self.request.POST, instance=self.object)
        else:
            context['formset'] = ProjectInlineFormSet()
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        outcomes_formset = context['formset']
        if outcomes_formset.is_valid():
            self.object = form.save()
            outcomes_formset.instance = self.object
            outcomes_formset.save()
        return super(ProjectAndProjectOutcomesCreateView, self).form_valid(form)


class ProjectAndProjectOutcomesUpdateView(SimpleModelUpdateView):

    model = 'Project'
    title = 'Project'
    form_class = ProjectForm

    def get_context_data(self, **kwargs):
        context = super(ProjectAndProjectOutcomesUpdateView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['formset'] = ProjectInlineFormSet(self.request.POST, instance=self.object)
        else:
            context['formset'] = ProjectInlineFormSet(instance=self.object)
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        outcomes_formset = context['formset']
        if outcomes_formset.is_valid():
            self.object = form.save()
            outcomes_formset.instance = self.object
            outcomes_formset.save()
        return super(ProjectAndProjectOutcomesUpdateView, self).form_valid(form)
