from django.views.decorators.csrf import csrf_exempt
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    url(r'^industries/$', csrf_exempt(IndustryList.as_view())),
    url(r'^industries/(?P<pk>[0-9]+)/$', IndustryDetail.as_view()),
    url(r'^functional-areas/$', csrf_exempt(FunctionalAreaList.as_view())),
    url(r'^functional-areas/(?P<pk>[0-9]+)/$', FunctionalAreaDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
