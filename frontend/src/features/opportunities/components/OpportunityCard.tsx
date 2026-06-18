/**
 * Presentational card for a single Opportunity, used by the
 * `/opportunities` listing page to preview the reshaped Opportunity
 * shape.
 *
 * Two-column layout matching the Figma target: a prose column on the
 * left ("About the Project" / "Role Overview" / "Responsibilities &
 * Requirements") and a metadata sidebar on the right (project name +
 * posted date, grouped meeting times, and the condensed skills list).
 *
 * Departures from the legacy Figma, per Ryan's clarification (`blah.`):
 * - No "Program Area" chip (concept deleted).
 * - Skills are one flat list with no Tech/Languages split and no
 *   ratings (ratings are intentionally never surfaced).
 * - No project logo (the project is now a free-text name, no image).
 * - No login banner / "create account" CTA (sign-in is required).
 */

import Typography from "@/shared/components/Typography";
import { cn } from "@/shared/lib/utils";

import styles from "./OpportunityCard.module.css";

import type {
  Opportunity,
  OpportunityStatus,
  WorkEnvironment,
} from "@/features/opportunities/data/sampleOpportunities";

const WORK_ENVIRONMENT_LABELS: Record<WorkEnvironment, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  in_person: "In Person",
};

const STATUS_LABELS: Record<OpportunityStatus, string> = {
  open: "Open",
  closed: "Closed",
  on_hold: "On hold",
  filled: "Filled",
  draft: "Draft",
};

// Maps each status to a CSS-module class so the badge color tracks state.
const STATUS_CLASSES: Record<OpportunityStatus, string> = {
  open: styles.statusOpen,
  closed: styles.statusClosed,
  on_hold: styles.statusOnHold,
  filled: styles.statusFilled,
  draft: styles.statusDraft,
};

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const {
    project_name,
    role_title,
    overview,
    body,
    responsibilities,
    min_experience_required,
    min_hours_required,
    work_environment,
    meeting_times,
    skills,
    status,
    posted,
  } = opportunity;

  return (
    <article className={styles.card}>
      {/* Left: prose column */}
      <div className={styles.main}>
        <header className={styles.titleBlock}>
          <Typography.Title5 className={styles.role}>
            {role_title}
          </Typography.Title5>
          {min_experience_required ? (
            <Typography.Paragraph3 className={styles.experience}>
              {min_experience_required}
            </Typography.Paragraph3>
          ) : null}
          <ul className={styles.metaRow}>
            <li className={styles.metaChip}>{min_hours_required} hrs/week</li>
            <li className={styles.metaChip}>
              {WORK_ENVIRONMENT_LABELS[work_environment]}
            </li>
          </ul>
        </header>

        {body ? (
          <section className={styles.section}>
            <Typography.Paragraph4 className={styles.sectionLabel}>
              About the Project
            </Typography.Paragraph4>
            <Typography.Paragraph4>{body}</Typography.Paragraph4>
          </section>
        ) : null}

        {overview ? (
          <section className={styles.section}>
            <Typography.Paragraph4 className={styles.sectionLabel}>
              Role Overview
            </Typography.Paragraph4>
            <Typography.Paragraph4>{overview}</Typography.Paragraph4>
          </section>
        ) : null}

        {responsibilities ? (
          <section className={styles.section}>
            <Typography.Paragraph4 className={styles.sectionLabel}>
              Responsibilities &amp; Requirements
            </Typography.Paragraph4>
            <Typography.Paragraph4>{responsibilities}</Typography.Paragraph4>
          </section>
        ) : null}
      </div>

      {/* Right: metadata sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHead}>
          <Typography.Paragraph3 className={styles.project}>
            {project_name}
          </Typography.Paragraph3>
          <span className={cn(styles.statusBadge, STATUS_CLASSES[status])}>
            {STATUS_LABELS[status]}
          </span>
          <Typography.Paragraph5 className={styles.posted}>
            Posted: {posted}
          </Typography.Paragraph5>
        </div>

        {meeting_times.length > 0 ? (
          <section className={styles.sidebarSection}>
            <Typography.Paragraph4 className={styles.sidebarLabel}>
              Meeting Times
            </Typography.Paragraph4>
            <ul className={styles.meetingList}>
              {meeting_times.map((slot) => (
                <li
                  key={`${slot.day}-${slot.start}`}
                  className={styles.meeting}
                >
                  <Typography.Paragraph5 className={styles.meetingTeam}>
                    {slot.team}
                  </Typography.Paragraph5>
                  <Typography.Paragraph5>
                    {slot.day} {slot.start}&ndash;{slot.end}
                  </Typography.Paragraph5>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {skills.length > 0 ? (
          <section className={styles.sidebarSection}>
            <Typography.Paragraph4 className={styles.sidebarLabel}>
              Skills
            </Typography.Paragraph4>
            <Typography.Paragraph5>{skills.join(", ")}</Typography.Paragraph5>
          </section>
        ) : null}
      </aside>
    </article>
  );
}

export { OpportunityCard };
