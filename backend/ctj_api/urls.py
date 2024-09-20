from django.urls import path

from ctj_api import views

urlpatterns = [
    path("opportunities/", views.OpportunitiesList.as_view()),
    path("opportunities/<uuid:pk>/", views.OpportunitiesDetails.as_view()),
]
