from django.shortcuts import get_object_or_404
from braces.views import LoginRequiredMixin
from django.contrib import messages
from django.views.generic.edit import CreateView, UpdateView
from utils import hasher

from .forms import *
from .models import *


class ModelFormActionMixin(object):

    @property
    def success_message(self):
        return NotImplemented

    def form_valid(self, form):
        messages.info(self.request, self.success_message)
        return super(ModelFormActionMixin, self).form_valid(form)


class IndustryCreateView(LoginRequiredMixin, ModelFormActionMixin, CreateView):

    form_class = IndustryForm
    template_name = 'experience/simple_model_form.html'
    success_message = 'Industry added'

    def get_context_data(self, **kwargs):
        context = super(IndustryCreateView, self).get_context_data(**kwargs)
        context['title'] = 'Industry'
        return context


class IndustryUpdateView(LoginRequiredMixin, ModelFormActionMixin, UpdateView):

    form_class = IndustryForm
    template_name = 'experience/simple_model_form.html'
    success_message = 'Industry updated'

    def get_object(self, queryset=None):
        industry = get_object_or_404(Industry, pk=hasher.decode(self.kwargs.get('pk'))[0])
        return industry

    def get_context_data(self, **kwargs):
        context = super(IndustryUpdateView, self).get_context_data(**kwargs)
        context['title'] = 'Industry'
        return context


class FunctionalAreaCreateView(LoginRequiredMixin, ModelFormActionMixin, CreateView):

    form_class = FunctionalAreaForm
    template_name = 'experience/simple_model_form.html'
    success_message = 'Functional area added'

    def get_context_data(self, **kwargs):
        context = super(FunctionalAreaCreateView, self).get_context_data(**kwargs)
        context['title'] = 'Functional Area'
        return context


class FunctionalAreaUpdateView(LoginRequiredMixin, ModelFormActionMixin, UpdateView):

    form_class = FunctionalAreaForm
    template_name = 'experience/simple_model_form.html'
    success_message = 'Functional area updated'

    def get_object(self, queryset=None):
        functional_area = get_object_or_404(FunctionalArea, pk=hasher.decode(self.kwargs.get('pk'))[0])
        return functional_area

    def get_context_data(self, **kwargs):
        context = super(FunctionalAreaUpdateView, self).get_context_data(**kwargs)
        context['title'] = 'Functional Area'
        return context


class SkillCreateView(LoginRequiredMixin, ModelFormActionMixin, CreateView):

    form_class = SkillForm
    template_name = 'experience/simple_model_form.html'
    success_message = 'Skill added'

    def get_context_data(self, **kwargs):
        context = super(SkillCreateView, self).get_context_data(**kwargs)
        context['title'] = 'Skill'
        return context


class SkillUpdateView(LoginRequiredMixin, ModelFormActionMixin, UpdateView):

    form_class = SkillForm
    template_name = 'experience/simple_model_form.html'
    success_message = 'Skill updated'

    def get_object(self, queryset=None):
        skill = get_object_or_404(Skill, pk=hasher.decode(self.kwargs.get('pk'))[0])
        return skill

    def get_context_data(self, **kwargs):
        context = super(SkillUpdateView, self).get_context_data(**kwargs)
        context['title'] = 'Skill'
        return context


class ToolCreateView(LoginRequiredMixin, ModelFormActionMixin, CreateView):

    form_class = ToolForm
    template_name = 'experience/simple_model_form.html'
    success_message = 'Tool added'

    def get_context_data(self, **kwargs):
        context = super(ToolCreateView, self).get_context_data(**kwargs)
        context['title'] = 'Tool'
        return context


class ToolUpdateView(LoginRequiredMixin, ModelFormActionMixin, UpdateView):

    form_class = ToolForm
    template_name = 'experience/simple_model_form.html'
    success_message = 'Tool updated'

    def get_object(self, queryset=None):
        tool = get_object_or_404(Tool, pk=hasher.decode(self.kwargs.get('pk'))[0])
        return tool

    def get_context_data(self, **kwargs):
        context = super(ToolUpdateView, self).get_context_data(**kwargs)
        context['title'] = 'Tool'
        return context


class RoleCreateView(LoginRequiredMixin, ModelFormActionMixin, CreateView):

    form_class = RoleForm
    template_name = 'experience/simple_model_form.html'
    success_message = 'Role added'

    def get_context_data(self, **kwargs):
        context = super(RoleCreateView, self).get_context_data(**kwargs)
        context['title'] = 'Role'
        return context


class RoleUpdateView(LoginRequiredMixin, ModelFormActionMixin, UpdateView):

    form_class = RoleForm
    template_name = 'experience/simple_model_form.html'
    success_message = 'Role updated'

    def get_object(self, queryset=None):
        role = get_object_or_404(Role, pk=hasher.decode(self.kwargs.get('pk'))[0])
        return role

    def get_context_data(self, **kwargs):
        context = super(RoleUpdateView, self).get_context_data(**kwargs)
        context['title'] = 'Role'
        return context
