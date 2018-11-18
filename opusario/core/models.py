from django.db import models


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
