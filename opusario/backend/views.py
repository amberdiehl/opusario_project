from rest_framework import generics
from .serializers import *
from .models import *


class IndustryList(generics.ListCreateAPIView):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer


class IndustryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer
