from rest_framework import permissions


class OpportunityPermission(permissions.BasePermission):
    """
    Only PM users can create new opportunities.
    Only the creator of an opportunity can edit it.
    """

    def has_permission(self, request, view):
        """
        Check global permissions for the request method.
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
        """
        Check object-level permissions for the request method.
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


class UserDetailPermission(permissions.BasePermission):
    """
    Only the authenticated user can access and modify their own user data
    """

    def has_object_permission(self, request, view, obj):
        return obj.id == request.user.id
