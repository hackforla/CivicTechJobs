from django.conf import settings
from django.views.generic import TemplateView

catchall_dev = TemplateView.as_view(template_name="dev-mode.html")

catchall_prod = TemplateView.as_view(template_name="index.html")

catchall = catchall_dev if settings.DEBUG else catchall_prod
