from django.urls import path

from server import views

urlpatterns = [
    path("v1/opportunities/", views.OpportunityList.as_view()),
    path("healthcheck", views.Healthcheck.as_view()),
]
