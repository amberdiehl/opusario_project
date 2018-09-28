from django.db import models

INVOLVEMENT_LEVEL_CHOICES = (
    ('core', 'Core project team member'),
    ('need', 'On an as needed basis'),
    ('sme', 'Provided guidance as subject matter expert')
)
RELATIONSHIP_CHOICES = (
    ('empl', 'Employee'),
    ('agcy', 'Agency'),
    ('cons', 'Consultant'),
    ('free', 'Freelance contractor')
)
METRIC_TYPE_CHOICES = (
    ('m', 'As a monetary value'),
    ('p', 'As a percentage')
)
METRIC_SUBJECT_CHOICES = (
    ('rev', 'Revenue'),
    ('exp', 'Expense'),
    ('acq', 'Customer acquisition'),
    ('ret', 'Customer retention'),
    ('val', 'Customer lifetime value'),
    ('cgs', 'Cost of goods sold')
)
DEGREE_OF_USE_CHOICES = (
    ('daily', 'Used daily to complete the project'),
    ('occasional', 'Used periodically to complete the project')
)
WORK_SCHEDULE_CHOICES = (
    ('full', 'Full-time'),
    ('part', 'Part-time'),
    ('shared', 'Shared job')
)
WORK_LOCATION_CHOICES = (
    ('office', '100% on site'),
    ('mixed', 'Mixed on site and remote'),
    ('remote', '100% remote')
)

"""

Models defining object instances that are shared amongst subscribers.

"""


class Industry(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text='Industry name'
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


class FunctionalArea(models.Model):
    name = models.CharField(
        max_length=100,
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


class Role(models.Model):
    at_functional_area = models.ForeignKey(
        FunctionalArea,
        models.SET_NULL,
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


class Skill(models.Model):
    at_functional_area = models.ManyToManyField(
        FunctionalArea,
        help_text='Functional area this skill is associated with.'
    )
    at_role = models.ManyToManyField(
        Role,
        help_text='Role this skill is associated with.'
    )
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
        ordering = ['name', ]

    def __str__(self):
        return self.name


class Tool(models.Model):
    at_functional_area = models.ManyToManyField(
        FunctionalArea,
        help_text='Functional area this tool is associated with.'
    )
    at_role = models.ManyToManyField(
        Role,
        help_text='Role this tool is associated with.'
    )
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
        ordering = ['name', ]

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(
        max_length=50,
        unique=True,
        help_text='Name of city.'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Cities'
        ordering = ['name', ]

    def __str__(self):
        return self.name


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
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name', ]

    def __str__(self):
        return self.name


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
        ordering = ['name', ]

    def __str__(self):
        return self.name


class Company(models.Model):
    name = models.CharField(
        max_length=255,
        help_text='Name of company.'
    )
    city = models.ForeignKey(
        City,
        models.SET_NULL,
        null=True,
        help_text='City where company is located.'
    )
    state = models.ForeignKey(
        State,
        models.SET_NULL,
        null=True,
        help_text='State where company is located.'
    )
    country = models.ForeignKey(
        Country,
        models.SET_NULL,
        null=True,
        help_text='Country where company is located.'
    )
    company_website = models.URLField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Companies'
        unique_together = ('name', 'city', 'state')
        ordering = ['name', ]

    def __str__(self):
        return self.name


class ExternalAccount(models.Model):
    type_name = models.CharField(
        max_length=100,
        unique=True,
        help_text='Type or name of the external account, such as Github, Instagram, Facebook, etc.'
    )
    base_url = models.URLField(
        unique=True,
        help_text='Base URL for account. E.g. https://linkedin.com.'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['type_name', ]

    def __str__(self):
        return self.type_name


"""

Models defining subscriber experience.

"""


class Project(models.Model):
    at_company = models.ForeignKey(
        Company,
        models.SET_NULL,
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
    at_project = models.ForeignKey(
        Project,
        models.SET_NULL,
        null=True,
        help_text='Associated project.'
    )
    non_quantified_outcomes = models.TextField(
        blank=True,
        null=True,
        help_text='Use quantified outcomes if possible, otherwise, note positive outcomes here.'
    )
    metric_type = models.CharField(
        max_length=1,
        choices=METRIC_TYPE_CHOICES,
        blank=True,
        null=True,
        help_text='Specify how the outcome was measured.'
    )
    metric_amount = models.IntegerField(
        blank=True,
        null=True,
        help_text='Specify the amount of increase or decrease as a positive or negative integer number.'
    )
    metric_subject = models.CharField(
        max_length=3,
        choices=METRIC_SUBJECT_CHOICES,
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
    at_project = models.ForeignKey(
        Project,
        models.SET_NULL,
        null=True,
        help_text='Associated project.'
    )
    at_role = models.ManyToManyField(
        Role,
        help_text='Your functional role on the project.'
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text='Details regarding your functional role, if different from general description.'
    )
    involvement_level = models.CharField(
        max_length=4,
        choices=INVOLVEMENT_LEVEL_CHOICES,
        help_text='Your type of time commitment to this project.'
    )
    employment_relationship = models.CharField(
        max_length=4,
        choices=RELATIONSHIP_CHOICES,
        help_text='Your employment relationship to this project.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}, {}".format(self.at_project.name, self.at_role.name)


class RoleSkill(models.Model):
    at_project_role = models.ForeignKey(
        ProjectRole,
        on_delete=models.CASCADE
    )
    at_skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE
    )
    degree_of_use = models.CharField(
        max_length=10,
        choices=DEGREE_OF_USE_CHOICES,
        help_text='Degree to which you used this skill.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}, {}'.format(self.at_project_role.at_role.name, self.at_skill.name)


class RoleTool(models.Model):
    at_project_role = models.ForeignKey(
        ProjectRole,
        on_delete=models.CASCADE
    )
    at_tool = models.ForeignKey(
        Tool,
        on_delete=models.CASCADE
    )
    degree_of_use = models.CharField(
        max_length=10,
        choices=DEGREE_OF_USE_CHOICES,
        help_text='Degree to which you used this tool.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}, {}'.format(self.at_project_role.at_role.name, self.at_tool.name)


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
        max_length=60,
        help_text='Your last name.'
    )
    nick_name = models.CharField(
        max_length=60,
        blank=True,
        null=True,
        help_text='Optionally, your nickname.'
    )
    photo = models.ImageField(
        upload_to=user_directory_path,
        blank=True,
        null=True,
        help_text='A nice photo of yourself; not an avatar. '
                  'Although optional, you will get better results when you have one.'
    )
    at_city = models.ForeignKey(
        City,
        models.SET_NULL,
        null=True,
        help_text='The city where you are located.'
    )
    at_state = models.ForeignKey(
        State,
        models.SET_NULL,
        null=True,
        help_text='The state where you are located.'
    )
    phone_number = models.IntegerField(
        help_text='Contact phone number.'
    )
    email_address = models.EmailField(
        help_text='Contact email address.'
    )
    brief = models.TextField(
        help_text='Describe what you are good at; what you are passionate about.'
    )
    work_relationship = models.CharField(
        max_length=4,
        choices=RELATIONSHIP_CHOICES,
        help_text='Preferred relationship with organizations you work for.'
    )
    work_schedule = models.CharField(
        max_length=6,
        choices=WORK_SCHEDULE_CHOICES,
        help_text='Preferred type of work schedule.'
    )
    work_location = models.CharField(
        max_length=6,
        choices=WORK_LOCATION_CHOICES,
        help_text='Preferred location to do your work.'
    )
    who_am_i = models.TextField(
        null=True,
        blank=True,
        help_text='A very brief statement about what makes you, YOU.'
    )
    where_headed = models.TextField(
        null=True,
        blank=True,
        help_text='A very brief description that describes your ambitions and goals.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return '{}, {}'.format(self.last_name, self.first_name)


class MyExternalAccount(models.Model):
    at_myself = models.ForeignKey(
        Myself,
        on_delete=models.CASCADE
    )
    at_account_type = models.ForeignKey(
        ExternalAccount,
        models.SET_NULL,
        null=True,
        help_text='Account type or name such as Github, Instagram, Facebook, etc.'
    )
    account_url = models.URLField(
        help_text='URL for your account.'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['account_url', ]

    def __str__(self):
        return self.account_url


class MyExperience(models.Model):
    at_myself = models.ForeignKey(
        Myself,
        on_delete=models.CASCADE
    )
    at_project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} {}, {}'.format(self.at_myself.first_name, self.at_myself.last_name, self.at_project.name)
