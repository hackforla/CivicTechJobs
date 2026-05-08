"""DRF serializers for `accounts` models, consumed by the views in `accounts.views`.

Follows the same shape convention as `ctj_api.serializers`: a
`XxxReadSerializer` for response shape and a `XxxWriteSerializer`
for request shape, with auto-managed and request-stamped fields
*absent* from the Write serializer's `Meta.fields` rather than
included with `read_only=True`.

See `docs/developer/backend.md` (`Serializer shape` section) for
the full rule.
"""

from rest_framework import serializers

from accounts.models import CustomUser
from ctj_api.models import Opportunity


class CustomUserReadSerializer(serializers.ModelSerializer):
    """Read serializer for `CustomUser` records.

    Note: the `opportunities` field is broken - it declares a writable
    `PrimaryKeyRelatedField(many=True)` but `CustomUser` has no
    `opportunities` attribute (the actual reverse relation from
    `Opportunity.created_by` is named `created_opportunities`).
    Reads would fail with `AttributeError`; writes would fail
    attempting to set `instance.opportunities`. Currently masked
    because no exercised code path hits it. The right fix is to drop
    the field entirely - deferred. See `archive/feat-auth-stage1` for
    a worked example of the removal.

    Used by:
    - `user_detail` FBV (`GET /api/users/<uuid>/`).
    """

    opportunities = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Opportunity.objects.all()
    )

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "people_depot_user_id",
            "name",
            "email",
            "community_of_practice",
            "skills_learned_matrix",
            "max_available_hours",
            "meeting_availability",
            "isProjectManager",
            "opportunities",
            "created_at",
            "updated_at",
        ]
