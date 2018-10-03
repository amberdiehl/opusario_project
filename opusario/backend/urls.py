from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    url(r'^cities/$', CityList.as_view()),
    url(r'^cities/(?P<pk>[0-9]+)/$', CityDetail.as_view()),
    url(r'^functional-areas/$', FunctionalAreaList.as_view()),
    url(r'^functional-areas/(?P<pk>[0-9]+)/$', FunctionalAreaDetail.as_view()),
    url(r'^industries/$', IndustryList.as_view()),
    url(r'^industries/(?P<pk>[0-9]+)/$', IndustryDetail.as_view()),
    url(r'^states/$', StateList.as_view()),
    url(r'^states/(?P<pk>[0-9]+)/$', StateDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
