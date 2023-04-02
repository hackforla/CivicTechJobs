from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("", include("frontend.urls")),
    path("api/", include("server.urls")),
]
