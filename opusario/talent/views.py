from django.shortcuts import (
    get_object_or_404,
    render)
from braces.views import LoginRequiredMixin
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.views.generic import ListView
from django.views.generic.edit import (
    CreateView,
    UpdateView,
    DeleteView)
from utils import (  # Pycharm doesn't see these as used but they are.
    hasher,
    validate)

# imports which enable dynamically instantiating objects
import talent.models
import talent.forms

from .forms import *
from .models import *


def ajax_filter_pills(request):

    model_name = request.GET.get('model', '')
    group_name = request.GET.get('name', '')
    selected_string = request.GET.get('selected', '')
    filter_by = request.GET.get('filter_by', 'all')

    try:
        model = getattr(talent.models, model_name)
    except AttributeError:
        return render(request, 'talent/widgets/pill_button_error.html', {})

    if not group_name:
        return render(request, 'talent/widgets/pill_button_error.html', {})

    selected = [int(item) for item in selected_string.split(',') if item.isdigit()]

    qs = model.objects.exclude(pk__in=selected)
    if not filter_by == 'all':
        qs = qs.filter(name__startswith=filter_by)

    items = [(item.id, item.name, 'plus') for item in qs]

    widget = {
        'name': group_name,
        'items': items
    }

    return render(request, 'talent/widgets/pill_button_groups.html', {'widget': widget, 'group': 'plus'})


def my_experience_save_m2m(selected_items, field_name, experience):
    """
    MySkill and MyTool are M2M through models associated with MyExperience, so cannot use Django .save_m2m()
    :param selected_items: from the model form M2M field, e.g. experience_formset.forms[0].cleaned_data['skills']
    :param through_model: the through model name, e.g. MySkill
    :param experience: the instance of MyExperience
    :return:
    """
    model = getattr(talent.models, 'My{}'.format(field_name.title()))
    selected = [item for item in selected_items]
    saved = model.objects.filter(my_experience=experience)
    for item in saved:
        if not item in selected:
            item.delete()
    for item in selected:
        if model.objects.filter(my_experience=experience, **{field_name: item}).count() == 0:
            new_item = model(my_experience=experience, **{field_name: item})
            new_item.save()


class ModelFormActionMixin(object):

    @property
    def success_message(self):
        return NotImplemented

    def form_valid(self, form):
        messages.info(self.request, self.success_message)
        return super(ModelFormActionMixin, self).form_valid(form)


class ModelListView(LoginRequiredMixin, ListView):
    model = None
    context_object_name = None
    template_name = 'talent/list_model_form.html'


class InstanceModelCreateView(LoginRequiredMixin, ModelFormActionMixin, CreateView):

    title = NotImplemented
    form_class = NotImplemented
    template_name = 'talent/instance_model_form.html'
    success_message = NotImplemented

    def __init__(self, **kwargs):
        super(InstanceModelCreateView, self).__init__(**kwargs)
        self.success_message = '{} added'.format(self.title)

    def dispatch(self, *args, **kwargs):
        # If next defined, go to specified path rather than default behavior
        if self.request.GET.get('next'):
            self.success_url = self.request.GET['next']
        return super(InstanceModelCreateView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(InstanceModelCreateView, self).get_context_data(**kwargs)
        context['title'] = self.title
        return context


class InstanceModelUpdateView(LoginRequiredMixin, ModelFormActionMixin, UpdateView):

    model = NotImplemented
    title = NotImplemented
    form_class = NotImplemented
    template_name = 'talent/instance_model_form.html'
    success_message = NotImplemented

    def __init__(self, **kwargs):
        super(InstanceModelUpdateView, self).__init__(**kwargs)
        self.success_message = '{} updated'.format(self.title)

    def dispatch(self, *args, **kwargs):
        # If next defined, go to specified path rather than default behavior
        if self.request.GET.get('next'):
            self.success_url = self.request.GET['next']
        return super(InstanceModelUpdateView, self).dispatch(*args, **kwargs)

    def get_object(self, queryset=None):
        model_instance = get_object_or_404(getattr(talent.models, self.model),
                                           pk=hasher.decode(self.kwargs.get('pk'))[0])  # hasher returns tuple
        return model_instance

    def get_context_data(self, **kwargs):
        context = super(InstanceModelUpdateView, self).get_context_data(**kwargs)
        context['title'] = self.title
        return context


class InstanceModelDeleteView(LoginRequiredMixin, ModelFormActionMixin, DeleteView):

    title = NotImplemented
    target_item = NotImplemented
    template_name = 'talent/confirm_delete.html'
    success_message = NotImplemented

    def __init__(self, **kwargs):
        super(InstanceModelDeleteView, self).__init__(**kwargs)
        self.success_message = '{} deleted'.format(self.title)

    def get_context_data(self, **kwargs):
        context = super(InstanceModelDeleteView, self).get_context_data(**kwargs)
        context['title'] = self.title
        context['target_item'] = self.target_item
        return context


class SkillCreateView(InstanceModelCreateView):

    title = 'Skill'
    form_class = SkillForm


class SkillUpdateView(InstanceModelUpdateView):

    model = 'Skill'
    title = 'Skill'
    form_class = SkillForm


class ToolCreateView(InstanceModelCreateView):

    title = 'Tool'
    form_class = ToolForm


class ToolUpdateView(InstanceModelUpdateView):

    model = 'Tool'
    title = 'Tool'
    form_class = ToolForm


class RoleCreateView(InstanceModelCreateView):

    title = 'Role'
    form_class = RoleForm


class RoleUpdateView(InstanceModelUpdateView):

    model = 'Role'
    title = 'Role'
    form_class = RoleForm


class ProjectListView(ModelListView):
    model = Project
    context_object_name = 'my_projects'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['title'] = 'Projects'

        form_list = []
        my_experience = MyExperience.objects.filter(myself__user=self.request.user)
        for experience in my_experience:
            instance = Project.objects.get(pk=experience.project_id)
            project_form = ProjectListForm(instance=instance)
            form_list.append(project_form)
        context['form_list'] = form_list

        return context


class ProjectDeleteView(InstanceModelDeleteView):
    title = 'Delete Project'
    target_item = 99

    def __init__(self, **kwargs):
        super(InstanceModelDeleteView, self).__init__(**kwargs)
        self.success_message = '{} deleted'.format(self.title)


class ProjectAndProjectOutcomesCreateView(InstanceModelCreateView):

    title = 'Project'
    form_class = ProjectForm

    def get(self, request, *args, **kwargs):
        self.object = None
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        experience_formset = ProjectMyExperienceInlineFormSet()
        outcome_formset = ProjectOutcomeInlineFormSet()
        return self.render_to_response(
            self.get_context_data(
                form=form,
                formsets=[
                    {
                        'title': 'My Project Experience',
                        'formset': experience_formset
                    },
                    {
                        'title': 'Project Outcomes',
                        'formset': outcome_formset
                    }
                ]
            )
        )

    def post(self, request, *args, **kwargs):
        self.object = None
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        experience_formset = ProjectMyExperienceInlineFormSet(self.request.POST)
        outcome_formset = ProjectOutcomeInlineFormSet(self.request.POST)
        if form.is_valid() and experience_formset.is_valid() and outcome_formset.is_valid():
            return self.form_valid(form, experience_formset, outcome_formset)
        else:
            return self.form_invalid(form, experience_formset, outcome_formset)

    def form_valid(self, form, experience_formset, outcome_formset):

        project = form.save(commit=False)
        project.save()

        # experience_formset.instance = self.object
        experience = experience_formset.forms[0].save(commit=False)
        myself = Myself.objects.get(user=self.request.user)
        experience.myself = myself
        experience.project = project
        experience.save()

        # per Django documentation many to many instances must be maintained manually
        my_experience_save_m2m(experience_formset.forms[0].cleaned_data['skills'], 'skill', experience)
        my_experience_save_m2m(experience_formset.forms[0].cleaned_data['tools'], 'tool', experience)

        outcome_formset.instance = self.object
        outcome_formset.save()

        return HttpResponseRedirect(project.get_absolute_url() if not self.success_url else self.success_url)

    def form_invalid(self, form, experience_formset, outcome_formset):
        return self.render_to_response(
            self.get_context_data(
                form=form,
                formsets=[
                    {
                        'title': 'My Project Experience',
                        'formset': experience_formset
                    },
                    {
                        'title': 'Project Outcomes',
                        'formset': outcome_formset
                    }
                ]
            )
        )


class ProjectAndProjectOutcomesUpdateView(InstanceModelUpdateView):

    model = 'Project'
    title = 'Project'
    form_class = ProjectForm

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        experience_formset = ProjectMyExperienceInlineFormSet(instance=self.object)
        outcome_formset = ProjectOutcomeInlineFormSet(instance=self.object)
        return self.render_to_response(
            self.get_context_data(
                form=form,
                formsets=[
                    {
                        'title': 'My Project Experience',
                        'formset': experience_formset
                    },
                    {
                        'title': 'Project Outcomes',
                        'formset': outcome_formset
                    }
                ]
            )
        )

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        experience_formset = ProjectMyExperienceInlineFormSet(self.request.POST, instance=self.object)
        outcome_formset = ProjectOutcomeInlineFormSet(self.request.POST, instance=self.object)
        if form.is_valid() and experience_formset.is_valid() and outcome_formset.is_valid():
            return self.form_valid(form, experience_formset, outcome_formset)
        else:
            return self.form_invalid(form, experience_formset, outcome_formset)

    def form_valid(self, form, experience_formset, outcome_formset):

        project = form.save(commit=False)
        project.save()

        # experience_formset.instance = self.object
        experience = experience_formset.forms[0].save(commit=False)
        myself = Myself.objects.get(user=self.request.user)
        experience.myself = myself
        experience.project = project
        experience.save()

        # per Django documentation many to many instances must be maintained manually
        my_experience_save_m2m(experience_formset.forms[0].cleaned_data['skills'], 'skill', experience)
        my_experience_save_m2m(experience_formset.forms[0].cleaned_data['tools'], 'tool', experience)

        outcome_formset.instance = self.object
        outcome_formset.save()

        return HttpResponseRedirect(project.get_absolute_url() if not self.success_url else self.success_url)

    def form_invalid(self, form, experience_formset, outcome_formset):
        return self.render_to_response(
            self.get_context_data(
                form=form,
                formsets=[
                    {
                        'title': 'My Project Experience',
                        'formset': experience_formset
                    },
                    {
                        'title': 'Project Outcomes',
                        'formset': outcome_formset
                    }
                ]
            )
        )


class MyselfAndMyExternalAccountsCreateView(InstanceModelCreateView):

    title = 'My Profile'
    form_class = MyselfForm

    def get_context_data(self, **kwargs):
        context = super(MyselfAndMyExternalAccountsCreateView, self).get_context_data(**kwargs)

        context['formsets'] = []

        formset = {
            'title': 'External Accounts',
            'formset': None
        }
        if self.request.POST:
            formset['formset'] = MyselfInlineFormSet(self.request.POST, instance=self.object)
        else:
            formset['formset'] = MyselfInlineFormSet(instance=self.object)
        context['formsets'].append(formset)

        return context

    def form_valid(self, form):
        context = self.get_context_data()
        accounts_formset = context['formsets'][0]['formset']
        if accounts_formset.is_valid():
            self.object = form.save(commit=False)
            self.object.user = self.request.user
            self.object.save()
            accounts_formset.instance = self.object
            accounts_formset.save()
        return super(MyselfAndMyExternalAccountsCreateView, self).form_valid(form)


class MyselfAndMyExternalAccountsUpdateView(InstanceModelUpdateView):

    model = 'Myself'
    title = 'My Profile'
    form_class = MyselfForm

    def get_context_data(self, **kwargs):
        context = super(MyselfAndMyExternalAccountsUpdateView, self).get_context_data(**kwargs)

        context['formsets'] = []

        formset = {
            'title': 'External Accounts',
            'formset': None
        }
        if self.request.POST:
            formset['formset'] = MyselfInlineFormSet(self.request.POST, instance=self.object)
        else:
            formset['formset'] = MyselfInlineFormSet(instance=self.object)
        context['formsets'].append(formset)

        return context

    def form_valid(self, form):
        context = self.get_context_data()
        accounts_formset = context['formsets'][0]['formset']
        if accounts_formset.is_valid():
            self.object = form.save()
            accounts_formset.instance = self.object
            accounts_formset.save()
        return super(MyselfAndMyExternalAccountsUpdateView, self).form_valid(form)
