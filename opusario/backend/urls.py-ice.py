from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    url(r'^cities$', CityList.as_view()),
    url(r'^cities/(?P<pk>[0-9]+)$', CityDetail.as_view()),
    url(r'^companies$', CompanyList.as_view()),
    url(r'^companies/(?P<pk>[0-9]+)$', CompanyDetail.as_view()),
    url(r'^countries$', CountryList.as_view()),
    url(r'^countries/(?P<pk>[0-9]+)$', CountryDetail.as_view()),
    url(r'^functional-areas$', FunctionalAreaList.as_view()),
    url(r'^functional-areas/(?P<pk>[0-9]+)$', FunctionalAreaDetail.as_view()),
    url(r'^industries$', IndustryList.as_view()),
    url(r'^industries/(?P<pk>[0-9]+)$', IndustryDetail.as_view()),
    url(r'^projects$', ProjectList.as_view()),
    url(r'^projects/(?P<pk>[0-9]+)$', ProjectDetail.as_view()),
    url(r'^roles$', RoleList.as_view()),
    url(r'^roles/(?P<pk>[0-9]+)$', RoleDetail.as_view()),
    url(r'^skills$', SkillList.as_view()),
    url(r'^skills/(?P<pk>[0-9]+)$', SkillDetail.as_view()),
    url(r'^states$', StateList.as_view()),
    url(r'^states/(?P<pk>[0-9]+)$', StateDetail.as_view()),
    url(r'^tools$', ToolList.as_view()),
    url(r'^tools/(?P<pk>[0-9]+)$', ToolDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
