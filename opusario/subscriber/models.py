from django.db import models
from django.urls import reverse
from core.models import WorkRelationship, WorkSchedule, WorkLocation, ExternalAccountType, InvolvementLevel, DegreeOfUse
from experience.models import City, Skill, Tool, Project, Role
from utils import hasher

"""

Models describing the subscriber.

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
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return '{}, {}'.format(self.last_name, self.first_name)

    def get_absolute_url(self):
        return reverse("experience:project_update", kwargs={"pk": hasher.encode(self.pk)})

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
        on_delete=models.CASCADE
    )
    project = models.ForeignKey(
        Project,
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
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} {}, {}'.format(self.myself.first_name, self.myself.last_name, self.project.name)
