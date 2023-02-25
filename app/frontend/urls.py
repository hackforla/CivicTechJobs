from django.urls import path

from . import views

url_paths = ["", "demo", "qualifier/<int:page_number>", "credits"]

urlpatterns = [path(url_path, views.index) for url_path in url_paths]
