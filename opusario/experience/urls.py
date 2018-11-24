from django.urls import path, re_path
from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^industry/(?P<pk>[a-zA-Z0-9]+)/?$', IndustryUpdateView.as_view(), name='industry_update'),
    url(r'^industry/?$', IndustryCreateView.as_view(), name='industry_add'),
    url(r'^functional-area/(?P<pk>[a-zA-Z0-9]+)/?$', FunctionalAreaUpdateView.as_view(), name='functional_area_update'),
    url(r'^functional-area/?$', FunctionalAreaCreateView.as_view(), name='functional_area_add'),
    url(r'^skill/(?P<pk>[a-zA-Z0-9]+)/?$', SkillUpdateView.as_view(), name='skill_update'),
    url(r'^skill/?$', SkillCreateView.as_view(), name='skill_add'),
    url(r'^tool/(?P<pk>[a-zA-Z0-9]+)/?$', ToolUpdateView.as_view(), name='tool_update'),
    url(r'^tool/?$', ToolCreateView.as_view(), name='tool_add'),
    url(r'^role/(?P<pk>[a-zA-Z0-9]+)/?$', RoleUpdateView.as_view(), name='role_update'),
    url(r'^role/?$', RoleCreateView.as_view(), name='role_add'),
    url(r'^country/(?P<pk>[a-zA-Z0-9]+)/?$', CountryUpdateView.as_view(), name='country_update'),
    url(r'^country/?$', CountryCreateView.as_view(), name='country_add'),
]
