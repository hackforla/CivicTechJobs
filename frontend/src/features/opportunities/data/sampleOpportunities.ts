/**
 * Static sample data for the `/opportunities` listing page.
 *
 * Shapes a handful of opportunities the way the reshaped
 * `OpportunityReadSerializer` returns them (project as free-text
 * `project_name`, card content `overview` / `body` /
 * `responsibilities` owned by the opportunity, `meeting_times` JSON,
 * status enum). Two display-only conveniences are inlined that the
 * real wire shape returns as opaque references: `role_title` (the API
 * returns `role` as a UUID) and `skills` (the API returns
 * `skills_required_matrix` as a UUID; matrix *ratings* are
 * intentionally never surfaced, so only skill names appear here).
 *
 * This page renders mock data on purpose: the live
 * `/api/opportunities/` endpoint now requires sign-in, so a static
 * page is the quickest way to eyeball the card without auth plumbing.
 */

export type OpportunityStatus =
  | "open"
  | "closed"
  | "on_hold"
  | "filled"
  | "draft";

export type WorkEnvironment = "remote" | "hybrid" | "in_person";

interface MeetingSlot {
  team: string;
  day: string;
  start: string; // "HH:MM"
  end: string; // "HH:MM"
}

export interface Opportunity {
  id: string;
  project_name: string;
  role_title: string;
  overview: string;
  body: string;
  responsibilities: string;
  min_experience_required: string;
  min_hours_required: number;
  work_environment: WorkEnvironment;
  meeting_times: MeetingSlot[];
  skills: string[];
  status: OpportunityStatus;
  // Display-only: the real serializer returns `created_at` (ISO);
  // pre-formatted here for the preview ("Posted: ..." in the sidebar).
  posted: string;
}

export const sampleOpportunities: Opportunity[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    project_name: "Food Oasis",
    role_title: "Backend Engineer",
    overview:
      "Backend engineers build and maintain the APIs and data models that power the platform's core flows.",
    body: "We're looking for a backend engineer to extend our Django REST API: new endpoints for the food-resource catalog, query performance work, and test coverage.",
    responsibilities:
      "Design and implement REST endpoints, write tests, review pull requests, and pair with frontend on contract design.",
    min_experience_required: "mid-level",
    min_hours_required: 10,
    work_environment: "remote",
    meeting_times: [
      { team: "Dev Team", day: "Wed", start: "18:00", end: "19:00" },
      { team: "All Hands", day: "Sun", start: "10:00", end: "11:00" },
    ],
    skills: ["Python", "Django", "PostgreSQL", "REST APIs"],
    status: "open",
    posted: "May 12, 2026",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    project_name: "Tabler",
    role_title: "Product Designer",
    overview:
      "Product designers own the end-to-end experience: research, flows, wireframes, and high-fidelity UI.",
    body: "Help redesign the onboarding flow. You'll run lightweight research, produce Figma prototypes, and hand off specs to engineering.",
    responsibilities:
      "Lead design reviews, maintain the Figma source of truth, and validate designs with real volunteers.",
    min_experience_required: "senior",
    min_hours_required: 8,
    work_environment: "hybrid",
    meeting_times: [
      { team: "Design Team", day: "Tue", start: "17:30", end: "18:30" },
    ],
    skills: ["Figma", "User Research", "Prototyping"],
    status: "open",
    posted: "May 28, 2026",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    project_name: "Civic Tech Jobs",
    role_title: "Frontend Engineer",
    overview:
      "Frontend engineers build the React/Next.js interfaces volunteers interact with day to day.",
    body: "Build out the opportunity browse and detail surfaces in Next.js with CSS Modules, wiring them to the API client.",
    responsibilities:
      "Ship accessible, responsive components; write component tests; keep the design system consistent.",
    min_experience_required: "junior",
    min_hours_required: 6,
    work_environment: "remote",
    meeting_times: [
      { team: "Dev Team", day: "Thu", start: "19:00", end: "20:00" },
    ],
    skills: ["TypeScript", "React", "Next.js", "CSS"],
    status: "on_hold",
    posted: "Apr 30, 2026",
  },
];
