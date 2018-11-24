from django.db import models
from django.urls import reverse
from core.models import WorkRelationship, InvolvementLevel, MetricType, MetricSubject, DegreeOfUse
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

"""

Models defining object instances that are shared amongst subscribers.

"""


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
        return reverse("experience:industry_update", kwargs={"pk": hasher.encode(self.pk)})

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
        return reverse("experience:functional_area_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class Skill(models.Model):

    name = models.CharField(
        max_length=100,
        help_text='Name of skill. E.g. Python, Javascript, SEO, Requirements Analysis.'
    )
    version = models.CharField(
        max_length=25,
        blank=True,
        null=True,
        help_text='Version, if applicable. E.g. Python 3.4.'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('name', 'version')
        ordering = ['name', 'version', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("experience:skill_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class Tool(models.Model):

    name = models.CharField(
        max_length=100,
        help_text='Name of tool. E.g. PyCharm, GIMP, Adobe Premiere Pro, MS Office.'
    )
    version = models.CharField(
        max_length=25,
        blank=True,
        null=True,
        help_text='Version, if applicable. E.g. V19.1.6, or Community versus Professional.'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('name', 'version')
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("experience:tool_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class Role(models.Model):

    functional_area = models.ForeignKey(
        FunctionalArea,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Functional area this role is associated with.'
    )
    name = models.CharField(
        max_length=255,
        help_text='Name of role, e.g. Software Engineer, Product Manager, Copy Writer, Customer Service Associate.'
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text='General description of this role.'
    )
    management = models.BooleanField(
        help_text='Has oversight of fellow team members.'
    )
    leadership = models.BooleanField(
        help_text='Has executive leadership.'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("experience:role_update", kwargs={"pk": hasher.encode(self.pk)})

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
        return reverse("experience:country_update", kwargs={"pk": hasher.encode(self.pk)})

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
        return reverse("experience:state_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


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
        return reverse("experience:city_update", kwargs={"pk": hasher.encode(self.pk)})

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
    company_website = models.URLField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Companies'
        unique_together = ('name', 'city', )
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("experience:company_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


"""

Models defining subscriber experience.

"""


class Project(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Company associated with the project.'
    )
    name = models.CharField(
        max_length=255,
        help_text='Title by which you refer to the project.'
    )
    project_objective = models.TextField(
        null=True,
        blank=True,
        help_text='Optional description of the problem solved or anticipated benefits of the project.'
    )
    start_year = models.IntegerField(
        help_text='Year this project started.'
    )
    duration = models.IntegerField(
        help_text='Length of project in weeks.'
    )
    team_size = models.IntegerField(
        help_text='Number of people that directly contributed to the project.'
    )
    code_repository = models.URLField(
        null=True,
        blank=True,
        help_text='Code repository for project, if publicly available.'
    )
    project_site = models.URLField(
        null=True,
        blank=True,
        help_text='Project site, or portion of company website impacted by project, if publicly available.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name', ]

    def __str__(self):
        return self.name


class ProjectOutcome(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        help_text='Associated project.'
    )
    non_quantified_outcomes = models.TextField(
        blank=True,
        null=True,
        help_text='Use quantified outcomes if possible, otherwise, note positive outcomes here.'
    )
    metric_type = models.ForeignKey(
        MetricType,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        help_text='Specify how the outcome was measured.'
    )
    metric_amount = models.IntegerField(
        blank=True,
        null=True,
        help_text='Specify the amount of increase or decrease as a positive or negative integer number.'
    )
    metric_subject = models.ForeignKey(
        MetricSubject,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        help_text='Specify what increased or decreased.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.metric_subject:
            return self.metric_subject
        else:
            return self.non_quantified_outcomes if len(self.non_quantified_outcomes) < 41 \
                else self.non_quantified_outcomes[:40]


class ProjectRole(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        help_text='Associated project.'
    )
    role = models.ForeignKey(
        Role,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Your primary functional role on the project.'
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text='Details regarding your functional role, if different from general description.'
    )
    involvement_level = models.ForeignKey(
        InvolvementLevel,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Your type of time commitment to this project.'
    )
    work_relationship = models.ForeignKey(
        WorkRelationship,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Your employment relationship to this project.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}, {}".format(self.project.name, self.role.name)


class RoleSkill(models.Model):

    project_role = models.ForeignKey(
        ProjectRole,
        on_delete=models.CASCADE
    )
    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE
    )
    degree_of_use = models.ForeignKey(
        DegreeOfUse,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Degree to which you used this skill.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}, {}'.format(self.project_role.role.name, self.skill.name)


class RoleTool(models.Model):

    project_role = models.ForeignKey(
        ProjectRole,
        on_delete=models.CASCADE
    )
    tool = models.ForeignKey(
        Tool,
        on_delete=models.CASCADE
    )
    degree_of_use = models.ForeignKey(
        DegreeOfUse,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Degree to which you used this tool.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}, {}'.format(self.project_role.role.name, self.tool.name)
