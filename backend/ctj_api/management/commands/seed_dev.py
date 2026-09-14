"""Idempotent dev-only seed: one PM user, one CoP, one Role, three Opportunities.

Invoke via `make db-seed` (in-container) or
`python manage.py seed_dev` (host, after `make db-up`). Safe to re-run:
all rows are looked up by stable natural keys and updated in place.

This command exists to make local UI work usable without clicking
through admin to hand-build the dependency graph. It is NOT used by
production code paths, NOT imported by views, and NOT loaded in
tests. The committed-data prohibition (memory: feedback_no_hardcoded_data)
explicitly carves out dev-only seed scripts.
"""

from django.core.management.base import BaseCommand
from django.db import transaction

from accounts.models import CustomUser
from ctj_api.models import CommunityOfPractice, Opportunity, Role

DEV_USER_EMAIL = "dev@example.com"
DEV_USER_PASSWORD = "password123!"


class Command(BaseCommand):
    help = "Seed the dev database with a PM user and a few open Opportunities."

    @transaction.atomic
    def handle(self, *args, **options):
        cop, _ = CommunityOfPractice.objects.get_or_create(
            practice_area=CommunityOfPractice.PracticeAreas.ENGINEERING,
            defaults={"description": "Engineering CoP"},
        )

        role_backend, _ = Role.objects.get_or_create(
            title="Backend Engineer", community_of_practice=cop
        )
        role_frontend, _ = Role.objects.get_or_create(
            title="Frontend Engineer", community_of_practice=cop
        )
        role_sre, _ = Role.objects.get_or_create(
            title="Site Reliability Engineer", community_of_practice=cop
        )

        user, created = CustomUser.objects.get_or_create(
            email=DEV_USER_EMAIL,
            defaults={
                "username": DEV_USER_EMAIL,
                "name": "Dev User",
                "people_depot_user_id": f"local:{DEV_USER_EMAIL}",
                "isProjectManager": True,
                "is_staff": True,
                "is_superuser": True,
            },
        )
        if created:
            user.set_password(DEV_USER_PASSWORD)
            user.save()
        else:
            updated_flags = False
            for flag in ("isProjectManager", "is_staff", "is_superuser"):
                if not getattr(user, flag):
                    setattr(user, flag, True)
                    updated_flags = True
            if updated_flags:
                user.save()

        opportunities = [
            {
                "project_name": "Civic Tech Jobs",
                "role": role_backend,
                "overview": "Build the Django + DRF backend for the CTJ matcher.",
                "body": "Wire the opportunity catalog, matching pipeline, and DRF.",
                "responsibilities": "Ship endpoints, review PRs, pair with frontend.",
                "min_experience_required": "mid-level",
                "min_hours_required": 8,
                "work_environment": "remote",
                "meeting_times": [
                    {
                        "team": "Developer Team",
                        "day": "Wed",
                        "start": "12:30",
                        "end": "13:30",
                    }
                ],
            },
            {
                "project_name": "Civic Tech Jobs",
                "role": role_frontend,
                "overview": "Build the Next.js surfaces for browsing opportunities.",
                "body": "Own the /opportunities listing, filter UI, and cards.",
                "responsibilities": "Implement Figma flows, write Vitest, keep a11y.",
                "min_experience_required": "junior",
                "min_hours_required": 6,
                "work_environment": "remote",
                "meeting_times": [
                    {
                        "team": "Developer Team",
                        "day": "Wed",
                        "start": "12:30",
                        "end": "13:30",
                    }
                ],
            },
            {
                "project_name": "HfLA Tools",
                "role": role_sre,
                "overview": "Keep HfLA's shared dev infrastructure healthy.",
                "body": "Tune CI, run migrations, and own the staging environment.",
                "responsibilities": "Monitor deploys, triage stage, write runbooks.",
                "min_experience_required": "senior",
                "min_hours_required": 10,
                "work_environment": "hybrid",
                "meeting_times": [
                    {"team": "Ops", "day": "Tue", "start": "18:00", "end": "19:00"}
                ],
            },
        ]

        for spec in opportunities:
            Opportunity.objects.update_or_create(
                project_name=spec["project_name"],
                role=spec["role"],
                defaults={
                    "overview": spec["overview"],
                    "body": spec["body"],
                    "responsibilities": spec["responsibilities"],
                    "min_experience_required": spec["min_experience_required"],
                    "min_hours_required": spec["min_hours_required"],
                    "work_environment": spec["work_environment"],
                    "meeting_times": spec["meeting_times"],
                    "status": "open",
                    "created_by": user,
                },
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {Opportunity.objects.count()} opportunities. "
                f"Login: {DEV_USER_EMAIL} / {DEV_USER_PASSWORD}"
            )
        )
