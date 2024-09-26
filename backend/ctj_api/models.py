from django.db import models
from django.utils import timezone

import uuid


class Opportunities(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=255, default="default-role")
    subrole = models.CharField(max_length=255, default="default-subrole")
    project = models.CharField(max_length=255, default="default-project")
    meetings_times = models.JSONField(default=list)
    difficulty_level = models.IntegerField(default=0)
    details = models.JSONField(default=dict)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    updated_by = models.CharField(max_length=255)

    class Meta:
        db_table = "opportunities"
