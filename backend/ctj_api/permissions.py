from rest_framework import permissions


class OpportunityPermission(permissions.BasePermission):
    """
    Only PM users can create new opportunities. Only the creator of an opportunity can edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.method == "POST":
            return request.user.isProjectManager

        # PUT and PATCH permissions are only allowed to the PM that created the opportunity.
        return obj.created_by == request.user
