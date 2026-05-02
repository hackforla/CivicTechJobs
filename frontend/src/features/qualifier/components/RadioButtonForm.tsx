"use client";

import React from "react";

import Typography from "@/shared/components/Typography";
import styles from "./RadioButtonForm.module.css";

interface RadioButtonFormProps {
  skills: Array<{
    Name: string;
    Description: string;
  }>;
  selectedCOPTitle: string;
  onSkillSelect: (skill: string, level: string) => void;
  selectedSkillsLevel: Record<string, string>;
}

function RadioButtonForm({
  selectedCOPTitle,
  skills,
  onSkillSelect,
  selectedSkillsLevel,
}: RadioButtonFormProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.copCell}>
            <Typography.Title4>{selectedCOPTitle}</Typography.Title4>
          </th>
          <th colSpan={3} className={styles.experienceLabel}>
            <Typography.Title5>Experience Level</Typography.Title5>
          </th>
        </tr>
        <tr>
          <th></th>
          <th className={styles.colHeader}>
            <Typography.Paragraph4>0-2 yrs</Typography.Paragraph4>
          </th>
          <th className={styles.colHeader}>
            <Typography.Paragraph4>2-4 yrs</Typography.Paragraph4>
          </th>
          <th className={styles.colHeader}>
            <Typography.Paragraph4>4+ yrs</Typography.Paragraph4>
          </th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill) => (
          <SkillRow
            key={skill.Name}
            skillName={skill.Name}
            description={skill.Description}
            onSkillSelect={onSkillSelect}
            selectedLevel={selectedSkillsLevel[skill.Name]}
          />
        ))}
      </tbody>
    </table>
  );
}

interface SkillRowProps {
  skillName: string;
  description: string;
  onSkillSelect: (skill: string, level: string) => void;
  selectedLevel?: string;
}

function SkillRow({
  skillName,
  description,
  onSkillSelect,
  selectedLevel,
}: SkillRowProps) {
  return (
    <tr className={styles.row}>
      <td className={styles.skillCell}>
        <Typography.Title5>{skillName}</Typography.Title5>
        <Typography.Paragraph3 className={styles.skillDescription}>
          {description}
        </Typography.Paragraph3>
      </td>
      <td>
        <RadioButton
          name={skillName}
          value="0-2yrs"
          checked={selectedLevel === "0-2yrs"}
          onChange={() => onSkillSelect(skillName, "0-2yrs")}
        />
      </td>
      <td>
        <RadioButton
          name={skillName}
          value="2-4yrs"
          checked={selectedLevel === "2-4yrs"}
          onChange={() => onSkillSelect(skillName, "2-4yrs")}
        />
      </td>
      <td>
        <RadioButton
          name={skillName}
          value="4+yrs"
          checked={selectedLevel === "4+yrs"}
          onChange={() => onSkillSelect(skillName, "4+yrs")}
        />
      </td>
    </tr>
  );
}

interface RadioButtonProps {
  value: string;
  name: string;
  checked?: boolean;
  onChange: () => void;
}

function RadioButton({ value, name, checked, onChange }: RadioButtonProps) {
  return (
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className={styles.radio}
      suppressHydrationWarning
    />
  );
}

export { RadioButtonForm };
