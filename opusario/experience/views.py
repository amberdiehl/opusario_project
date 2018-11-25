from django.shortcuts import get_object_or_404, render
from braces.views import LoginRequiredMixin
from django.contrib import messages
from django.views.generic.edit import CreateView, UpdateView
from utils import hasher  # Pycharm doesn't see this is used but it is.

import experience.models
from .forms import *
from .models import *


def ajax_get_states(request):
    country_id = request.GET.get('selected')
    states = State.objects.filter(country=country_id)
    return render(request, 'experience/_select_options.html', {'items': states})


def ajax_get_cities(request):
    state_id = request.GET.get('selected')
    cities = City.objects.filter(state=state_id)
    return render(request, 'experience/_select_options.html', {'items': cities})


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
    template_name = 'experience/simple_model_form.html'
    success_message = NotImplemented

    def __init__(self, **kwargs):
        super(SimpleModelCreateView, self).__init__(**kwargs)
        self.success_message = '{} added'.format(self.title)

    def get_context_data(self, **kwargs):
        context = super(SimpleModelCreateView, self).get_context_data(**kwargs)
        context['title'] = self.title
        return context


class SimpleModelUpdateView(LoginRequiredMixin, ModelFormActionMixin, UpdateView):

    model = NotImplemented
    title = NotImplemented
    form_class = NotImplemented
    template_name = 'experience/simple_model_form.html'
    success_message = NotImplemented

    def __init__(self, **kwargs):
        super(SimpleModelUpdateView, self).__init__(**kwargs)
        self.success_message = '{} updated'.format(self.title)

    def get_object(self, queryset=None):
        model_instance = get_object_or_404(getattr(experience.models, self.model),
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
