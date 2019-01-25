from django.conf.urls import url
from django.views.generic import TemplateView
from .views import *

urlpatterns = [
    url(r'^experience/?$', TemplateView.as_view(template_name='talent/landing.html'), name='experience'),
    url(r'^city/(?P<pk>[a-zA-Z0-9]+)/?$', CityUpdateView.as_view(), name='city_update'),
    url(r'^city/?$', CityCreateView.as_view(), name='city_create'),
    url(r'^company/(?P<pk>[a-zA-Z0-9]+)/?$', CompanyUpdateView.as_view(), name='company_update'),
    url(r'^company/?$', CompanyCreateView.as_view(), name='company_create'),
    url(r'^country/(?P<pk>[a-zA-Z0-9]+)/?$', CountryUpdateView.as_view(), name='country_update'),
    url(r'^country/?$', CountryCreateView.as_view(), name='country_create'),
    url(r'^functional-area/(?P<pk>[a-zA-Z0-9]+)/?$', FunctionalAreaUpdateView.as_view(), name='functional_area_update'),
    url(r'^functional-area/?$', FunctionalAreaCreateView.as_view(), name='functional_area_create'),
    url(r'^industry/(?P<pk>[a-zA-Z0-9]+)/?$', IndustryUpdateView.as_view(), name='industry_update'),
    url(r'^industry/?$', IndustryCreateView.as_view(), name='industry_create'),
    url(r'^project/(?P<pk>[a-zA-Z0-9]+)/?$', ProjectAndProjectOutcomesUpdateView.as_view(),
        name='project_update'),
    url(r'^project/?$', ProjectAndProjectOutcomesCreateView.as_view(), name='project_create'),
    url(r'^role/(?P<pk>[a-zA-Z0-9]+)/?$', RoleUpdateView.as_view(), name='role_update'),
    url(r'^role/?$', RoleCreateView.as_view(), name='role_create'),
    url(r'^skill/(?P<pk>[a-zA-Z0-9]+)/?$', SkillUpdateView.as_view(), name='skill_update'),
    url(r'^skill/?$', SkillCreateView.as_view(), name='skill_create'),
    url(r'^state/(?P<pk>[a-zA-Z0-9]+)/?$', StateUpdateView.as_view(), name='state_update'),
    url(r'^state/?$', StateCreateView.as_view(), name='state_create'),
    url(r'^tool/(?P<pk>[a-zA-Z0-9]+)/?$', ToolUpdateView.as_view(), name='tool_update'),
    url(r'^tool/?$', ToolCreateView.as_view(), name='tool_create'),
    url(r'^ajax-get-states/?$', ajax_get_states, name='ajax_get_states'),
    url(r'^ajax-get-cities/?$', ajax_get_cities, name='ajax_get_states'),
    url(r'^ajax-put-country/?$', ajax_put_country, name='ajax_put_country')
]
