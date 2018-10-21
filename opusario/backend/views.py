from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from .models import *


class CityList(generics.ListCreateAPIView):
    serializer_class = CitySerializer

    def get_queryset(self):
        queryset = City.objects.all()
        state = self.request.query_params.get('filter', None)
        if state:
            queryset = queryset.filter(state=state)
        return queryset


class CityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class CompanyList(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CountryList(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class CountryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


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


class RoleList(generics.ListCreateAPIView):
    serializer_class = RoleSerializer

    def get_queryset(self):
        queryset = Role.objects.all()
        functional_area = self.request.query_params.get('filter', None)
        if functional_area:
            queryset = queryset.filter(at_functional_area=functional_area)
        return queryset


class RoleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class SkillList(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class SkillDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class StateList(generics.ListCreateAPIView):
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

    def get_queryset(self):
        queryset = State.objects.all()
        country = self.request.query_params.get('filter', None)
        if country:
            queryset = queryset.filter(country=country)
        return queryset


class StateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = State.objects.all()
    serializer_class = StateSerializer
