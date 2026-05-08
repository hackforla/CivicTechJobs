"""DRF serializers for `accounts` models, consumed by the views in `accounts.views`.

Follows the same shape convention as `ctj_api.serializers`: a
`XxxReadSerializer` for response shape and a `XxxWriteSerializer`
for request shape, with auto-managed and request-stamped fields
*absent* from the Write serializer's `Meta.fields` rather than
included with `read_only=True`.

See `docs/developer/backend.md` (`Serializer shape` section) for
the full rule.
"""

import uuid

from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from accounts.models import CustomUser


class CustomUserReadSerializer(serializers.ModelSerializer):
    """Read serializer for `CustomUser` records.

    Used by:
    - `user_detail` FBV (`GET /api/users/<uuid>/`).
    - `auth_me` / `auth_signup` / `auth_login` for response bodies
      where the canonical "current user" shape is needed.
    """

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
            "created_at",
            "updated_at",
        ]


class RegisterSerializer(serializers.Serializer):
    """Request serializer for `POST /api/auth/signup/`.

    Validates the signup payload and creates a `CustomUser`. Uses the
    Stage 1 signup contract:
    - `email` becomes `username` (the field Django's `ModelBackend`
      authenticates against).
    - `password` is validated against the configured
      `AUTH_PASSWORD_VALIDATORS` before being hashed.
    - `people_depot_user_id` is stamped with a `local:<uuid>`
      placeholder; Stage 2 reconciles to a real PD ID.

    Not a `ModelSerializer` because the input shape (`email`,
    `password`, `name`) is narrower than the model and the
    create-side semantics (`set_password`, `username = email`,
    placeholder stamping) need explicit handling.
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})
    name = serializers.CharField(max_length=100)

    def validate_email(self, value):
        """Reject duplicate emails. The field is unique on the model,
        but checking here gives a 400 with a structured message
        instead of a 500 from a DB integrity error."""
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def validate_password(self, value):
        """Run Django's configured password validators (length,
        common-passwords, numeric-only)."""
        validate_password(value)
        return value

    def create(self, validated_data):
        return CustomUser.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"],
            name=validated_data["name"],
            people_depot_user_id=f"local:{uuid.uuid4()}",
        )


class LoginSerializer(serializers.Serializer):
    """Request serializer for `POST /api/auth/login/`.

    Validates the credentials by calling `authenticate()` and stashes
    the resolved `user` on `self.validated_data["user"]` for the view
    to consume. Returning the user from `validate()` keeps the view
    short and centralizes the credential check (the view doesn't have
    to call `authenticate` itself or interpret a `None` return).

    On success, the view calls `django.contrib.auth.login(request,
    user)` to create the session.
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        request = self.context.get("request")
        user = authenticate(
            request=request,
            username=attrs["email"],
            password=attrs["password"],
        )
        if user is None:
            raise serializers.ValidationError(
                "Invalid email or password.", code="invalid_credentials"
            )
        attrs["user"] = user
        return attrs
