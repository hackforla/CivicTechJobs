"""Top-level Django views for the backend project.

Currently only the SPA catchall lives here, used by `backend.urls`'s
final catch-all `re_path` to serve an HTML template for non-API
requests. See the architectural note in `backend.urls` - this entire
file is a candidate for removal post-rewrite.

Two flags worth knowing about:

1. The branch between `catchall_dev` and `catchall_prod` is evaluated
   at module-import time (the `if settings.DEBUG` runs once when this
   module first loads). Toggling `DEBUG` at runtime will NOT swap the
   template; the server must be restarted.

2. `index.html` (the production template) does not exist in
   `backend/templates/backend/`. In `DEBUG=False`, `catchall_prod`
   would resolve to that missing template and raise
   `TemplateDoesNotExist` on any matching request. The dev template
   (`dev-mode.html`) does exist. This is a real bug, not just a docs
   note - probably wants the file removed entirely once the SPA
   catchall is dropped, or a real `index.html` placeholder added.
   Deferred out of this docs-only PR.
"""

from django.conf import settings
from django.views.generic import TemplateView

catchall_dev = TemplateView.as_view(template_name="dev-mode.html")

catchall_prod = TemplateView.as_view(template_name="index.html")

catchall = catchall_dev if settings.DEBUG else catchall_prod
