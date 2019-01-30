from django.conf.urls import url
from django.views.generic import TemplateView
from .views import *

urlpatterns = [
    url(r'^landing/?$', TemplateView.as_view(template_name='talent/landing.html'), name='landing_page'),
    url(r'^myself/(?P<pk>[a-zA-Z0-9]+)/?$', MyselfAndMyExternalAccountsUpdateView.as_view(), name='myself_update'),
    url(r'^myself/?$', MyselfAndMyExternalAccountsCreateView.as_view(), name='myself_create'),
    url(r'^project/(?P<pk>[a-zA-Z0-9]+)/?$', ProjectAndProjectOutcomesUpdateView.as_view(), name='project_update'),
    url(r'^project/?$', ProjectAndProjectOutcomesCreateView.as_view(), name='project_create'),
    url(r'^role/(?P<pk>[a-zA-Z0-9]+)/?$', RoleUpdateView.as_view(), name='role_update'),
    url(r'^role/?$', RoleCreateView.as_view(), name='role_create'),
    url(r'^skill/(?P<pk>[a-zA-Z0-9]+)/?$', SkillUpdateView.as_view(), name='skill_update'),
    url(r'^skill/?$', SkillCreateView.as_view(), name='skill_create'),
    url(r'^tool/(?P<pk>[a-zA-Z0-9]+)/?$', ToolUpdateView.as_view(), name='tool_update'),
    url(r'^tool/?$', ToolCreateView.as_view(), name='tool_create'),
]
