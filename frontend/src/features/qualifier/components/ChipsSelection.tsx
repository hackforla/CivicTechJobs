import React from "react";

import Typography from "@/shared/components/Typography";
import { Chip } from "@/shared/components/Inputs/Chip";
import styles from "./ChipsSelection.module.css";

const tools: string[] = [
  "Figma",
  "Adobe XD",
  "Miro",
  "Figjam",
  "Github",
  "UserTesting.com",
  "Tailwind CSS",
  "HTML",
  "Optimal Workshop",
  "JavaScript",
  "CSS",
  "Photoshop",
  "ARIA",
  "Illustrator",
  "Lyssna",
  "Web Content Accessibility (WCAG)",
];

function ChipsSelection() {
  return (
    <div className={styles.section}>
      <Typography.Title4 className={styles.title}>
        Technical Skills and Tools
      </Typography.Title4>
      <div className={styles.chips}>
        {tools.map((tool) => {
          return <Chip key={tool} value={tool} variant="multi" />;
        })}
      </div>
    </div>
  );
}

export { ChipsSelection };
