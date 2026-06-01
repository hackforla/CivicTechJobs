"""Django admin registrations for `accounts` models.

`CustomUser` is registered with the default `ModelAdmin` (no
customization). Effect: admins see every field on every row, with
no list filters, search fields, or read-only protections. Enough
for Stage 1 emergency edits to user records; revisit if the user
table grows beyond admin-by-eyeball.
"""

from django.contrib import admin

from .models import CustomUser

admin.site.register(CustomUser)
