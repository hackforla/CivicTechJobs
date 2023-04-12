from django.shortcuts import render

# Create your views here.


def index(request, **args):
    return render(request, "frontend/index.html")


def custom_404(request, exception):
    return render(request, "frontend/404.html", status=404)
