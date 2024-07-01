from django.urls import path
from ctjbackend import views

urlpatterns = [
  path('healthcheck/', views.healthcheck, name='healthcheck'),
]