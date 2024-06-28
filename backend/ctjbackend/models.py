from django.db import models
from django.utils import timezone

import uuid



class Opportunities(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=255)
    subrole = models.CharField(max_length=255)
    project = models.CharField(max_length=255)
    meetings_times = models.JSONField(default=list)
    difficulty_level = models.IntegerField()
    details = models.JSONField(default=dict)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    updated_by_or_token = models.CharField(max_length=255)

    class Meta:
        db_table = "opportunities"
