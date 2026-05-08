"""DRF permission classes for CTJ's endpoints; consumed by views in `ctj_api.views`."""

from rest_framework import permissions


class OpportunityPermission(permissions.BasePermission):
    """Permission policy for the Opportunity recruitment-catalog endpoints.

    Policy:
    - Safe methods (GET/HEAD/OPTIONS): allowed for everyone (public read).
    - POST (create): allowed only for users with `isProjectManager=True`.
    - PUT (full update): allowed only for the user who created the
      opportunity (`obj.created_by == request.user`).
    - DELETE: allowed for any project manager
      (`isProjectManager=True`), not only the creator.
    - PATCH: not branched on; falls through to `return False` in both
      `has_permission` and `has_object_permission`. Practical effect:
      PATCH on `/api/opportunities/<id>/` is always 403'd, even though
      `OpportunityViewSet` is a `ModelViewSet` that nominally exposes
      it. Flagging as a bug - if partial updates should be allowed
      (likely scoped to the creator like PUT), this class needs PATCH
      branches in both methods. Deferred out of this docs-only PR.

    Used by:
    - `OpportunityViewSet` (`/api/opportunities/`).
    """

    def has_permission(self, request, view):
        """Request-level permission check (HTTP method + user status).

        Called by DRF before any object lookup, so this method cannot
        inspect a specific `Opportunity` row - it only gates by HTTP
        method and properties of `request.user`.

        Branches:
        - Safe methods (GET/HEAD/OPTIONS): always allowed (public
          read; the catalog should be browsable without auth).
        - POST: requires `request.user.isProjectManager == True`.
          Uses `getattr(..., False)` so anonymous users (whose
          `request.user` is an `AnonymousUser` with no
          `isProjectManager` attribute) are rejected without raising
          `AttributeError`.
        - PUT and DELETE: passes through if the user is authenticated.
          The per-row creator/PM check happens in
          `has_object_permission` once DRF has loaded the target row.
        - PATCH and anything else: falls through to `return False`.
          See the class docstring for the PATCH bug flag.
        """
        # Allow safe methods for all users
        if request.method in permissions.SAFE_METHODS:
            return True

        # Only PM's can create opportunities
        if request.method == "POST":
            return getattr(request.user, "isProjectManager", False)

        # For PUT and DELETE, defer to object-level permissions
        if request.method in ["PUT", "DELETE"]:
            return request.user.is_authenticated

        return False

    def has_object_permission(self, request, view, obj):
        """Object-level permission check (per-row creator/PM rules).

        Called by DRF after `get_object()` resolves the target row,
        so this method has access to the specific `Opportunity`
        instance via `obj`.

        Branches:
        - Safe methods (GET/HEAD/OPTIONS): always allowed (mirrors
          the same allowance in `has_permission`).
        - PUT: only the user who created the opportunity can update
          it (`obj.created_by == request.user`).
        - DELETE: any project manager can delete (the request-level
          check confirmed authentication; this confirms PM status).
          Note this is broader than PUT - any PM can delete anyone's
          opportunity, but only the creator can update their own.
        - PATCH and anything else: falls through to `return False`.
          See the class docstring for the PATCH bug flag.
        """
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # PUT permissions are only allowed to the PM that created the opportunity.
        if request.method == "PUT":
            return obj.created_by == request.user

        # Any PM can delete any opportunity
        if request.method == "DELETE":
            return getattr(request.user, "isProjectManager", False)

        return False
