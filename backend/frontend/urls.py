from django.urls import path

from . import views

url_paths = ["", "credits", "demo", "demo-tailwind", "qualifier/<int:page_number>"]

urlpatterns = [path(url_path, views.index) for url_path in url_paths]
