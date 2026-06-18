/**
 * Filter bar for the `/opportunities` listing page.
 *
 * Three controls per the spec (`blah.`):
 *   - Availability: ON/OFF checkbox; ON keeps opportunities the user
 *     can attend at least one meeting of.
 *   - Project: free-text substring filter against `project_name`.
 *   - Skills: two-state radio (OFF / Partial Match, ≥30% overlap).
 *
 * Controlled component - the parent owns the filter state and the
 * filtering itself. This file is presentational + binding only.
 */

"use client";

import { Checkbox } from "@/shared/components/Checkbox";
import Typography from "@/shared/components/Typography";

import styles from "./OpportunityFilters.module.css";

import type {
  OpportunityFilterState,
  SkillsFilterMode,
} from "@/features/opportunities/lib/filters";

interface OpportunityFiltersProps {
  filters: OpportunityFilterState;
  onAvailabilityChange: (value: boolean) => void;
  onProjectQueryChange: (value: string) => void;
  onSkillsModeChange: (value: SkillsFilterMode) => void;
}

function OpportunityFilters({
  filters,
  onAvailabilityChange,
  onProjectQueryChange,
  onSkillsModeChange,
}: OpportunityFiltersProps) {
  return (
    <section className={styles.bar} aria-label="Filter opportunities">
      <div className={styles.group}>
        <Typography.Paragraph4 className={styles.groupLabel}>
          Availability
        </Typography.Paragraph4>
        <Checkbox
          label="Only show opportunities I can attend"
          defaultChecked={filters.availability}
          onChange={(event) => onAvailabilityChange(event.target.checked)}
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="opportunity-project-filter">
          <Typography.Paragraph4 className={styles.groupLabel}>
            Project
          </Typography.Paragraph4>
        </label>
        <input
          id="opportunity-project-filter"
          type="text"
          className={styles.textInput}
          placeholder="Filter by project name"
          value={filters.projectQuery}
          onChange={(event) => onProjectQueryChange(event.target.value)}
        />
      </div>

      <fieldset className={styles.group}>
        <legend>
          <Typography.Paragraph4 className={styles.groupLabel}>
            Skills
          </Typography.Paragraph4>
        </legend>
        <div className={styles.radioRow}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="opportunity-skills-mode"
              value="off"
              checked={filters.skillsMode === "off"}
              onChange={() => onSkillsModeChange("off")}
            />
            <Typography.Paragraph5>Off</Typography.Paragraph5>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="opportunity-skills-mode"
              value="partial_match"
              checked={filters.skillsMode === "partial_match"}
              onChange={() => onSkillsModeChange("partial_match")}
            />
            <Typography.Paragraph5>Partial match (30%)</Typography.Paragraph5>
          </label>
        </div>
      </fieldset>
    </section>
  );
}

export { OpportunityFilters };
