from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from server import views

router = DefaultRouter()
router.register(r"opportunities", views.OpportunitiesViewSet, basename="opportunities")
router.register(r"users", views.UserViewSet, basename="user")

urlpatterns = [
    path("api/", include(router.urls)),
    path("healthcheck", views.Healthcheck.as_view()),
    path(
        "api/schema",
        get_schema_view(
            title="Your Project", description="API for all things …", version="1.0.0"
        ),
        name="openapi-schema",
    ),
    path(
        "swagger/",
        TemplateView.as_view(
            template_name="swagger-ui.html",
            extra_context={"schema_url": "openapi-schema"},
        ),
        name="swagger-ui",
    ),
]
