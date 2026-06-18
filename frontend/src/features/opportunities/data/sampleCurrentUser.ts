/**
 * Static sample "current user" data used by the `/opportunities`
 * listing page to drive the Availability and Skills filters while the
 * page is rendering against mock data.
 *
 * The Availability and Skills filters compare each opportunity against
 * a user-side input (the user's reachable meeting windows / known
 * skill names) - in the live app those come from the signed-in user.
 * Until the API client + auth wire-up land, this file stands in. When
 * the swap happens, this source goes away and the filter helpers move
 * to reading the same shape off the auth context.
 */

interface AvailabilitySlot {
  day: string; // e.g. "Tue"; matched case-insensitively against meeting_times.day
  start: string; // "HH:MM"
  end: string; // "HH:MM"
}

export interface CurrentUser {
  availability: AvailabilitySlot[];
  skills: string[];
}

export const sampleCurrentUser: CurrentUser = {
  availability: [
    { day: "Wed", start: "17:00", end: "21:00" },
    { day: "Thu", start: "18:00", end: "20:30" },
    { day: "Sun", start: "09:00", end: "12:00" },
  ],
  skills: ["TypeScript", "React", "PostgreSQL", "Figma"],
};
