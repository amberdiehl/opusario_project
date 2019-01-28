from django.shortcuts import get_object_or_404
from braces.views import LoginRequiredMixin
from django.contrib import messages
from django.views.generic.edit import (
    CreateView,
    UpdateView)
from utils import (  # Pycharm doesn't see these as used but they are.
    hasher,
    validate)

import talent.models
from .forms import *
from .models import *


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


class MyselfAndMyExternalAccountsCreateView(SimpleModelCreateView):

    title = 'My Profile'
    form_class = MyselfForm

    def get_context_data(self, **kwargs):
        context = super(MyselfAndMyExternalAccountsCreateView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['formset'] = MyselfInlineFormSet(self.request.POST, instance=self.object)
        else:
            context['formset'] = MyselfInlineFormSet()
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        accounts_formset = context['formset']
        if accounts_formset.is_valid():
            self.object = form.save(commit=False)
            self.object.user = self.request.user
            self.object.save()
            accounts_formset.instance = self.object
            accounts_formset.save()
        return super(MyselfAndMyExternalAccountsCreateView, self).form_valid(form)


class MyselfAndMyExternalAccountsUpdateView(SimpleModelUpdateView):

    model = 'Myself'
    title = 'My Profile'
    form_class = MyselfForm

    def get_context_data(self, **kwargs):
        context = super(MyselfAndMyExternalAccountsUpdateView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['formset'] = MyselfInlineFormSet(self.request.POST, instance=self.object)
        else:
            context['formset'] = MyselfInlineFormSet(instance=self.object)
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        accounts_formset = context['formset']
        if accounts_formset.is_valid():
            self.object = form.save()
            accounts_formset.instance = self.object
            accounts_formset.save()
        return super(MyselfAndMyExternalAccountsUpdateView, self).form_valid(form)
