from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        abbreviation = US_STATE_ABBREVIATIONS.get(serializer.validated_data['name'], '')
        if abbreviation:
            serializer.validated_data['abbreviation'] = abbreviation
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class StateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer
