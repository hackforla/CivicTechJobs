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

import styles from "./OpportunityCard.module.css";

import type {
  Opportunity,
  WorkEnvironment,
} from "@/features/opportunities/data/sampleOpportunities";

const WORK_ENVIRONMENT_LABELS: Record<WorkEnvironment, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  in_person: "In Person",
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
    posted,
  } = opportunity;

  return (
    <article className={styles.card}>
      {/* Left: prose column */}
      <div className={styles.main}>
        <header className={styles.titleBlock}>
          <div className={styles.titleRow}>
            <Typography.Title5 className={styles.role}>
              {role_title}
            </Typography.Title5>
            <Typography.Paragraph3 className={styles.project}>
              {project_name}
            </Typography.Paragraph3>
          </div>
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
        <Typography.Paragraph5 className={styles.posted}>
          Posted: {posted}
        </Typography.Paragraph5>

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
