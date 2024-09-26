"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.http import JsonResponse

# from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView


# Custom handler for incorrect API routes
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
    path("api/", include("ctj_api.urls"), name="api"),
    # Catch-all for incorrect API routes
    re_path(r"^api/.*$", api_not_found),
    # Catch-all for frontend (React)
    re_path(
        r"^.*$",
        TemplateView.as_view(template_name="index.html"),
        name="index",
    ),
]
