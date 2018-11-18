from django.db import models
from core.models import WorkRelationship, WorkSchedule, WorkLocation, ExternalAccountType
from experience.models import City, Skill, Tool, Project

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
    skills = models.ManyToManyField(
        Skill,
        help_text='Your skills, regardless degree of expertise.'
    )
    tools = models.ManyToManyField(
        Tool,
        help_text='Tools you use, regardless degree of expertise.'
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


class MyExperience(models.Model):

    myself = models.ForeignKey(
        Myself,
        on_delete=models.CASCADE
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} {}, {}'.format(self.myself.first_name, self.myself.last_name, self.project.name)
