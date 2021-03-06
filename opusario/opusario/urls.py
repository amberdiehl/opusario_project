"""opusario URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import include
from django.views.generic import TemplateView

urlpatterns = [
    # path('admin/', admin.site.urls), <-- does not seem to want to work with React setup
    url(r'^admin/', admin.site.urls),
    url(r"^account/", include("account.urls")),
    url(r"^core/", include(("core.urls", 'core'), namespace='core')),
    url(r"^talent/", include(("talent.urls", 'talent'), namespace='talent')),
    # url(r'^api/', include('backend.urls')),
    url(r'^landing$', TemplateView.as_view(template_name="opusario/app.html")),
    url(r'^app/', TemplateView.as_view(template_name="frontend/index.html")),
    url(r'^', TemplateView.as_view(template_name="opusario/base.html")),
]
