from rest_framework import generics
from .serializers import *
from .models import *


class CityList(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class CityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class FunctionalAreaList(generics.ListCreateAPIView):
    queryset = FunctionalArea.objects.all()
    serializer_class = FunctionalAreaSerializer


class FunctionalAreaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = FunctionalArea.objects.all()
    serializer_class = FunctionalAreaSerializer


class IndustryList(generics.ListCreateAPIView):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer


class IndustryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer


class StateList(generics.ListCreateAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer


class StateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer
