from django.urls import path, re_path
from django.http import JsonResponse

from ctj_api import views


# Custom error handler for incorrect API routes
def api_not_found(request, exception=None):
    return JsonResponse(
        {
            "error": "API endpoint not found",
            "status_code": 404,
            "message": "The requested API endpoint does not exist",
        },
        status=404,
    )


urlpatterns = [
    path("opportunities/", views.OpportunityList.as_view()),
    path("opportunities/<uuid:pk>/", views.OpportunityDetails.as_view()),
    path("healthcheck", views.Healthcheck.as_view(), name="healthcheck"),
    # Catch-all for incorrect API routes
    re_path(r"^.*$", api_not_found),
]
