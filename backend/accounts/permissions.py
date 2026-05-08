"""DRF permission classes for `accounts` endpoints.

Consumed by views in `accounts.views`.
"""

from rest_framework import permissions


class UserDetailPermission(permissions.BasePermission):
    """Permission policy for accessing `CustomUser` records.

    Policy:
    - Object-level: a user can only access the record where
      `obj.id == request.user.id` (their own profile).
    - No request-level (`has_permission`) override; DRF's default
      lets the request through and the object-level check does the
      gating. The consuming view stacks `IsAuthenticated` separately
      to require login at the request level.

    Used by:
    - `user_detail` (`GET /api/users/<uuid>/`).
    """

    def has_object_permission(self, request, view, obj):
        """Object-level permission check (own-profile-only access).

        Called by DRF after `get_object()` resolves the target user
        record. Returns `True` only when the resolved record IS the
        requesting user (UUID equality).

        No `has_permission` override is provided; DRF's default
        returns `True` and lets all authenticated requests reach the
        object lookup. The view (`user_detail`) stacks
        `IsAuthenticated` separately to require login - if it didn't,
        anonymous requests could reach this method and crash on
        `request.user.id` (AnonymousUser has no `id`).

        Effective end-to-end policy:
        - Anonymous: rejected by `IsAuthenticated` at request time.
        - Authenticated, requesting own UUID: 200.
        - Authenticated, requesting someone else's UUID: 403.
        - Authenticated, requesting a UUID that doesn't exist: 404
          (object lookup fails before this method is called).
        """
        return obj.id == request.user.id
