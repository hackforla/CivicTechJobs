from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("server.urls")),
    path("", include("frontend.urls")),
]
