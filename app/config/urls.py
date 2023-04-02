from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("", include("server.urls")),
    path("", include("frontend.urls")),
    path("api/", include("rest_framework.urls")),
]
