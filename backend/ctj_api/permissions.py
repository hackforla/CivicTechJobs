"""DRF permission classes for CTJ's endpoints; consumed by views in `ctj_api.views`."""

from rest_framework import permissions


class OpportunityPermission(permissions.BasePermission):
    """Permission policy for the Opportunity recruitment-catalog endpoints.

    Policy:
    - Safe methods (GET/HEAD/OPTIONS): allowed for any *authenticated*
      user. There are no public listings - browsing requires sign-in.
    - POST (create): allowed only for users with `isProjectManager=True`.
    - PUT and PATCH (full / partial update): allowed only for the user
      who created the opportunity (`obj.created_by == request.user`).
      PATCH mirrors PUT - same authorization semantics, smaller
      payload.
    - DELETE: allowed for any project manager
      (`isProjectManager=True`), not only the creator. Deletion is
      intentionally broader than update so PMs can co-moderate
      abandoned listings; update stays creator-scoped so PMs don't
      step on each other's wording.

    Used by:
    - `OpportunityViewSet` (`/api/opportunities/`).
    """

    def has_permission(self, request, view):
        """Request-level permission check (HTTP method + user status).

        Called by DRF before any object lookup, so this method cannot
        inspect a specific `Opportunity` row - it only gates by HTTP
        method and properties of `request.user`.

        Branches:
        - Safe methods (GET/HEAD/OPTIONS): allowed only for
          authenticated users (no public listings - sign-in required
          to browse).
        - POST: requires `request.user.isProjectManager == True`.
          Uses `getattr(..., False)` so anonymous users (whose
          `request.user` is an `AnonymousUser` with no
          `isProjectManager` attribute) are rejected without raising
          `AttributeError`.
        - PUT, PATCH, DELETE: passes through if the user is
          authenticated. The per-row creator/PM check happens in
          `has_object_permission` once DRF has loaded the target row.
        - Anything else: falls through to `return False`.
        """
        # Reads require sign-in (no public listings)
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated

        # Only PM's can create opportunities
        if request.method == "POST":
            return getattr(request.user, "isProjectManager", False)

        # For PUT, PATCH and DELETE, defer to object-level permissions
        if request.method in ["PUT", "PATCH", "DELETE"]:
            return request.user.is_authenticated

        return False

    def has_object_permission(self, request, view, obj):
        """Object-level permission check (per-row creator/PM rules).

        Called by DRF after `get_object()` resolves the target row,
        so this method has access to the specific `Opportunity`
        instance via `obj`.

        Branches:
        - Safe methods (GET/HEAD/OPTIONS): allowed for authenticated
          users (mirrors the same allowance in `has_permission`).
        - PUT and PATCH: only the user who created the opportunity
          can update it (`obj.created_by == request.user`). PATCH
          shares PUT's authorization semantics.
        - DELETE: any project manager can delete (the request-level
          check confirmed authentication; this confirms PM status).
          Broader than update - any PM can delete anyone's
          opportunity, but only the creator can edit their own.
        - Anything else: falls through to `return False`.
        """
        # Reads require sign-in (no public listings); has_permission
        # already gated anonymous users, this mirrors it at object level.
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated

        # PUT/PATCH only by the user that created the opportunity.
        if request.method in ["PUT", "PATCH"]:
            return obj.created_by == request.user

        # Any PM can delete any opportunity
        if request.method == "DELETE":
            return getattr(request.user, "isProjectManager", False)

        return False
