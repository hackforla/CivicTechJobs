"""
    Pull data from VRMS endpoint: https://www.vrms.io/api/recurringevents
    Format data for Project and RecurringEvent models to be loaded as django fixtures
"""
import requests
import yaml

response = requests.get("https://www.vrms.io/api/recurringevents")
recurring_events = response.json()

events = []
projects = []
project_ids = set()

for event in recurring_events:
    events.append(
        {
            "model": "server.recurringevent",
            "pk": event["_id"],
            "fields": {
                "name": event["name"],
                "description": event["description"],
                "start_time": event["startTime"],
                "end_time": event["endTime"],
                "hours": event["hours"],
                "project": event["project"]["_id"],
            },
        }
    )

    project_id = event["project"]["_id"]
    if project_id not in project_ids:
        project_ids.add(project_id)

        project = {
            "model": "server.project",
            "pk": event["project"]["_id"],
            "fields": {},
        }
        project["fields"]["name"] = event["project"].get("name", "unknown")
        project["fields"]["description"] = event["project"].get(
            "description", "unknown"
        )
        project["fields"]["github_url"] = event["project"].get(
            "githubUrl", "https://unknown.com"
        )
        project["fields"]["slack_url"] = event["project"].get(
            "slackUrl", "https://unknown.com"
        )
        project["fields"]["google_drive_url"] = event["project"].get(
            "googleDriveUrl", "https://unknown.com"
        )
        project["fields"]["video_conference_link"] = event["project"].get(
            "videoConferenceLink", "https://unknown.com"
        )
        project["fields"]["project_status"] = event["project"].get(
            "projectStatus", "unknown"
        )
        projects.append(project)

with open(r"./projects.yaml", "w", encoding="utf-8") as file:
    yaml.dump(projects, file)

with open(r"./recurring_events.yaml", "w", encoding="utf-8") as file:
    yaml.dump(events, file)
