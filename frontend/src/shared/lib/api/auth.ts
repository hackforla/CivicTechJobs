/**
 * Typed wrappers for the `/api/auth/*` endpoints.
 *
 * The wrappers exist so call sites don't repeat the URL paths
 * literally and so the request / response shapes have a single
 * source of truth. `User` mirrors `accounts.serializers.CustomUserReadSerializer`.
 *
 * All wrappers use the shared `apiFetch` client, which handles
 * cookies, the CSRF header, and the error envelope.
 */

import { apiFetch } from "./client";

/**
 * One availability window the user can attend. Parallels the
 * `meeting_availability` JSON shape on `CustomUser`; same fields as
 * `MeetingSlot` minus `team`. Used by the Availability filter on the
 * `/opportunities` browse surface.
 */
interface AvailabilitySlot {
  day: string;
  start: string; // "HH:MM"
  end: string; // "HH:MM"
}

/**
 * Response shape of `GET /api/auth/me/`, `POST /api/auth/login/`,
 * `POST /api/auth/signup/`, and `GET /api/users/<uuid>/`.
 *
 * Mirrors `CustomUserReadSerializer.Meta.fields` on the backend.
 * `community_of_practice` and `skills_learned_matrix` are foreign
 * key UUIDs (not nested objects); resolve them via separate
 * endpoints if the UI needs full records. `skill_names` is the
 * serializer-resolved alphabetical list of the user's skill names
 * (sourced off `skills_learned_matrix`); the browse surface's Skills
 * filter reads this directly.
 */
export type User = {
  id: string;
  people_depot_user_id: string;
  name: string;
  email: string;
  community_of_practice: string | null;
  skills_learned_matrix: string | null;
  skill_names: string[];
  max_available_hours: number | null;
  meeting_availability: AvailabilitySlot[] | null;
  isProjectManager: boolean;
  created_at: string;
  updated_at: string;
};

export type SignupPayload = {
  email: string;
  password: string;
  name: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const authApi = {
  /** Seed the `csrftoken` cookie. Call once on app load. */
  csrf: () => apiFetch<void>("/api/auth/csrf/"),

  /** Create a new user and auto-login. Returns the new user. */
  signup: (payload: SignupPayload) =>
    apiFetch<User>("/api/auth/signup/", { method: "POST", body: payload }),

  /** Validate credentials and create a session. Returns the user. */
  login: (payload: LoginPayload) =>
    apiFetch<User>("/api/auth/login/", { method: "POST", body: payload }),

  /** Clear the session. Idempotent. */
  logout: () => apiFetch<void>("/api/auth/logout/", { method: "POST" }),

  /** Return the current authenticated user; throws ApiError(403) if anonymous. */
  me: () => apiFetch<User>("/api/auth/me/"),
};
