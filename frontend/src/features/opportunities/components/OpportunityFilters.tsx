/**
 * Filter sidebar for the `/opportunities` listing page.
 *
 * Layout mirrors the Figma: a sticky left rail with the "Filters (N)"
 * count + "Clear all" link, a row of active-filter chips, a divider,
 * then one collapsible section per filter. Sections use `<details>`
 * for native a11y / keyboard support.
 *
 * Content per the spec (`blah.`) - the legacy Figma's Roles /
 * Experience / Program Area / Tech / Languages sections are gone;
 * Tech + Languages condensed into Skills:
 *   - Availability: ON/OFF checkbox; ON keeps opportunities the user
 *     can attend at least one meeting of.
 *   - Project: free-text substring filter against `project_name`.
 *   - Skills: two-state radio (OFF / Partial Match, ≥30% overlap).
 *
 * Controlled component - the parent owns the filter state and the
 * filtering itself.
 */

"use client";

import { useMemo } from "react";

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
  onClearAll: () => void;
}

interface ActiveChip {
  key: string;
  label: string;
  clear: () => void;
}

function OpportunityFilters({
  filters,
  onAvailabilityChange,
  onProjectQueryChange,
  onSkillsModeChange,
  onClearAll,
}: OpportunityFiltersProps) {
  const activeChips = useMemo<ActiveChip[]>(() => {
    const chips: ActiveChip[] = [];
    if (filters.availability) {
      chips.push({
        key: "availability",
        label: "Available to me",
        clear: () => onAvailabilityChange(false),
      });
    }
    const trimmedQuery = filters.projectQuery.trim();
    if (trimmedQuery) {
      chips.push({
        key: "project",
        label: `Project: ${trimmedQuery}`,
        clear: () => onProjectQueryChange(""),
      });
    }
    if (filters.skillsMode === "partial_match") {
      chips.push({
        key: "skills",
        label: "Skills: Partial match (30%)",
        clear: () => onSkillsModeChange("off"),
      });
    }
    return chips;
  }, [filters, onAvailabilityChange, onProjectQueryChange, onSkillsModeChange]);

  return (
    <aside className={styles.sidebar} aria-label="Filter opportunities">
      <header className={styles.head}>
        <Typography.Title5 className={styles.title}>
          Filters ({activeChips.length})
        </Typography.Title5>
        <button
          type="button"
          className={styles.clearAll}
          onClick={onClearAll}
          disabled={activeChips.length === 0}
        >
          Clear all
        </button>
      </header>

      {activeChips.length > 0 ? (
        <ul className={styles.chipList}>
          {activeChips.map((chip) => (
            <li key={chip.key} className={styles.chip}>
              <span className={styles.chipLabel}>{chip.label}</span>
              <button
                type="button"
                aria-label={`Remove ${chip.label} filter`}
                onClick={chip.clear}
                className={styles.chipRemove}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <hr className={styles.divider} />

      <details className={styles.section}>
        <summary className={styles.sectionHead}>Availability</summary>
        <div className={styles.sectionBody}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={filters.availability}
              onChange={(event) => onAvailabilityChange(event.target.checked)}
            />
            Only show opportunities I can attend
          </label>
        </div>
      </details>

      <details className={styles.section}>
        <summary className={styles.sectionHead}>Project</summary>
        <div className={styles.sectionBody}>
          <label htmlFor="opportunity-project-filter" className={styles.srOnly}>
            Filter by project name
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
      </details>

      <details className={styles.section}>
        <summary className={styles.sectionHead}>Skills</summary>
        <div className={styles.sectionBody}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="opportunity-skills-mode"
              value="off"
              checked={filters.skillsMode === "off"}
              onChange={() => onSkillsModeChange("off")}
            />
            Off
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="opportunity-skills-mode"
              value="partial_match"
              checked={filters.skillsMode === "partial_match"}
              onChange={() => onSkillsModeChange("partial_match")}
            />
            Partial match (30%)
          </label>
        </div>
      </details>
    </aside>
  );
}

export { OpportunityFilters };
