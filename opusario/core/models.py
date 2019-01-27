from django.db import models
from django.urls import reverse
from utils import hasher


US_STATE_ABBREVIATIONS = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "American Samoa": "AS",
    "District of Columbia": "DC",
    "Federated States of Micronesia": "FM",
    "Guam": "GU",
    "Marshall Islands": "MH",
    "Northern Mariana Islands": "MP",
    "Palau": "PW",
    "Puerto Rico": "PR",
    "Virgin Islands": "VI",
}


class Industry(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True,
        help_text='Industry name',
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text='General description of this industry.'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Industries'
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("core:industry_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class Country(models.Model):

    name = models.CharField(
        max_length=50,
        unique=True,
        help_text='Name of country.'
    )
    abbreviation = models.CharField(
        max_length=4,
        null=True,
        blank=True,
        help_text='Optional internet country code assignment.'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Countries'
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("core:country_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class State(models.Model):

    name = models.CharField(
        max_length=50,
        unique=True,
        help_text='Name of state.'
    )
    abbreviation = models.CharField(
        max_length=2,
        null=True,
        blank=True,
        help_text='For United States, two character abbreviation for state.'
    )
    country = models.ForeignKey(
        Country,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Country where state is located.'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("core:state_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''

    def save(self, *args, **kwargs):
        if self.country.name == 'United States':
            self.abbreviation = US_STATE_ABBREVIATIONS.get(self.name)
        super().save(*args, **kwargs)


class City(models.Model):

    name = models.CharField(
        max_length=50,
        unique=True,
        help_text='Name of city.'
    )
    state = models.ForeignKey(
        State,
        on_delete=models.SET_NULL,
        null=True,
        help_text='State where city is located.'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Cities'
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("core:city_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class Company(models.Model):

    name = models.CharField(
        max_length=255,
        help_text='Name of company.'
    )
    city = models.ForeignKey(
        City,
        on_delete=models.SET_NULL,
        null=True,
        help_text='City where company is located.'
    )
    size = models.IntegerField(
        blank=True,
        null=True,
        help_text='Number of employees.'
    )
    industry = models.ForeignKey(
        Industry,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Primary source of revenue.'
    )
    company_website = models.URLField(
        null=True,
        blank=True,
        help_text='Company website; e.g. https://www.opusario.com'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Companies'
        unique_together = ('name', 'city', )
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("core:company_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class FunctionalArea(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True,
        help_text='Name for functional area, e.g. Technology, Marketing, Product Management, Executive Management.'
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text='General description of this functional area.'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("core:functional_area_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''
