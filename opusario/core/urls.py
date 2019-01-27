from django.conf.urls import url
from .views import *

urlpatterns = [
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
    url(r'^state/(?P<pk>[a-zA-Z0-9]+)/?$', StateUpdateView.as_view(), name='state_update'),
    url(r'^state/?$', StateCreateView.as_view(), name='state_create'),
    url(r'^ajax-get-states/?$', ajax_get_states, name='ajax_get_states'),
    url(r'^ajax-get-cities/?$', ajax_get_cities, name='ajax_get_states'),
    url(r'^ajax-put-country/?$', ajax_put_country, name='ajax_put_country'),
    url(r'^ajax-put-state/?$', ajax_put_state, name='ajax_put_state'),
    url(r'^ajax-put-city/?$', ajax_put_city, name='ajax_put_city'),
]
