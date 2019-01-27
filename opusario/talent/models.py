from django.db import models
from django.urls import reverse
from core.models import City, Company, FunctionalArea
from utils import hasher


"""

Models defining object instances that are shared amongst talented people.

"""


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
        return reverse("talent:skill_update", kwargs={"pk": hasher.encode(self.pk)})

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
        return reverse("talent:tool_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class DegreeOfUse(models.Model):

    degree_used = models.CharField(
        max_length=50,
        unique=True,
        help_text='Frequency of use, e.g. Daily, Occasionally'
    )
    weight = models.IntegerField(
        help_text='Weight of use for analysis.'
    )

    class Meta:
        ordering = ('degree_used', )

    def __str__(self):
        return self.degree_used


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
        return reverse("talent:role_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class InvolvementLevel(models.Model):

    involvement = models.CharField(
        max_length=50,
        unique=True,
        help_text='Involvement in project, e.g. Core team member, Part-time, Subject matter expert.'
    )
    weight = models.IntegerField(
        help_text='Weight of involvement for analysis.'
    )

    class Meta:
        ordering = ('involvement', )

    def __str__(self):
        return self.involvement


class WorkRelationship(models.Model):

    relationship = models.CharField(
        max_length=30,
        unique=True,
        help_text='Relationship with employer, e.g. Employee, Consultant, Freelancer.'
    )

    class Meta:
        ordering = ('relationship', )

    def __str__(self):
        return self.relationship


class WorkSchedule(models.Model):

    schedule = models.CharField(
        max_length=20,
        unique=True,
        help_text='Work schedule, e.g. Full-time, Part-Time, Shared job.'
    )

    class Meta:
        ordering = ('schedule', )

    def __str__(self):
        return self.schedule


class WorkLocation(models.Model):

    location = models.CharField(
        max_length=30,
        unique=True,
        help_text='Work location, e.g. On site, Mixed (on site and remote), Remote.'
    )

    class Meta:
        ordering = ('location', )

    def __str__(self):
        return self.location


class MetricType(models.Model):

    metric_type = models.CharField(
        max_length=20,
        unique=True,
        help_text='Type of measurement value, e.g. Monetary, Percentage.'
    )

    class Meta:
        ordering = ('metric_type', )

    def __str__(self):
        return self.metric_type


# Revenue, Expense, Customer acquisition, Customer retention, Customer lifetime value, Cost of goods sold
class MetricSubject(models.Model):

    metric_subject = models.CharField(
        max_length=25,
        unique=True,
        help_text='Subject of metric value, e.g. Revenue, Expense.'
    )

    class Meta:
        ordering = ('metric_subject', )

    def __str__(self):
        return self.metric_subject


class ExternalAccountType(models.Model):

    type = models.CharField(
        max_length=50,
        unique=True,
        help_text='External account, e.g. Source code, Social media, Blog.'
    )

    class Meta:
        ordering = ('type', )

    def __str__(self):
        return self.type


"""

Models defining talent experience.

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
    non_quantified_outcomes = models.TextField(
        blank=True,
        null=True,
        help_text='Use quantified outcomes if possible, otherwise, note positive outcomes here.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name', ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("talent:project_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class ProjectOutcome(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        help_text='Associated project.'
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
        return self.metric_subject


"""

Models describing the talented person.

"""


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)


class Myself(models.Model):

    first_name = models.CharField(
        max_length=20,
        help_text='Your first name.'
    )
    last_name = models.CharField(
        max_length=40,
        help_text='Your last name.'
    )
    nick_name = models.CharField(
        max_length=60,
        blank=True,
        null=True,
        help_text='Optionally, your nickname.'
    )
    slug = models.SlugField(
        blank=True,
        null=True,
        help_text='Subscriber relative URL on Opusario.'
    )
    photo = models.ImageField(
        upload_to=user_directory_path,
        blank=True,
        null=True,
        help_text='A nice photo of yourself; not an avatar. '
                  'Although optional, you will get better results when you have one.'
    )
    city = models.ForeignKey(
        City,
        on_delete=models.SET_NULL,
        null=True,
        help_text='The city where you are located.'
    )
    phone_number = models.IntegerField(
        help_text='Contact phone number.'
    )
    email_address = models.EmailField(
        help_text='Contact email address.'
    )
    passion = models.TextField(
        help_text='Describe what you are good at; what you are passionate about.'
    )
    personality = models.TextField(
        null=True,
        blank=True,
        help_text='A very brief statement about what makes you, YOU.'
    )
    goals = models.TextField(
        null=True,
        blank=True,
        help_text='A very brief description that describes your ambitions and goals.'
    )
    work_relationship = models.ForeignKey(
        WorkRelationship,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Preferred relationship with organizations you work for.'
    )
    work_schedule = models.ForeignKey(
        WorkSchedule,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Preferred type of work schedule.'
    )
    work_location = models.ForeignKey(
        WorkLocation,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Preferred location to do your work.'
    )
    looking = models.BooleanField(
        default=False,
        help_text='Ready for new opportunities.'
    )
    projects = models.ManyToManyField('Project', through='MyExperience', related_name='people')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return '{}, {}'.format(self.last_name, self.first_name)

    def get_absolute_url(self):
        return reverse("talent:project_update", kwargs={"pk": hasher.encode(self.pk)})

    def get_encoded_id(self):
        return hasher.encode(self.pk) if self.pk else ''


class MyExternalAccount(models.Model):

    myself = models.ForeignKey(
        Myself,
        on_delete=models.CASCADE
    )
    type = models.ForeignKey(
        ExternalAccountType,
        on_delete=models.SET_NULL,
        null=True,
        help_text='Type of external account.'
    )
    url = models.URLField(
        help_text='URL for the account.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['url', ]

    def __str__(self):
        return self.url


class MySkill(models.Model):

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
        return self.skill.name


class MyTool(models.Model):

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
        return self.tool.name


class MyExperience(models.Model):

    myself = models.ForeignKey(
        Myself,
        related_name='membership',
        on_delete=models.CASCADE
    )
    project = models.ForeignKey(
        Project,
        related_name='membership',
        on_delete=models.CASCADE
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
    skills = models.ManyToManyField(
        MySkill,
        help_text='Skills used to complete this project.'
    )
    tools = models.ManyToManyField(
        MyTool,
        help_text='Tools used to complete this project.'
    )
    project_owner = models.BooleanField(
        default=False,
        help_text='Controls sharing of project with other team members.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} {}, {}'.format(self.myself.first_name, self.myself.last_name, self.project.name)
