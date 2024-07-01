from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
import datetime
from ctjbackend.uptime import start_time


# Healthcheck view that returns the uptime of the app, a healthcheck message, and the version.
def healthcheck(request):
  current_time = datetime.datetime.now()
  uptime_duration = current_time - start_time
  uptime_seconds = int(uptime_duration.total_seconds())

  hours = int(uptime_seconds // 3600)
  minutes = int((uptime_seconds % 3600) // 60)
  seconds = int(uptime_seconds % 60)

  uptime_str = f"{hours:02d} hours {minutes:02d} minutes {seconds:02d} seconds"

  context = {
      "message": "healthcheck",
      "uptime": uptime_str,
      "version": settings.VERSION,
  }
  
  return JsonResponse(context)
