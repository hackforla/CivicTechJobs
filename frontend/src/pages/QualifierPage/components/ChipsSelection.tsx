import React from "react";

import Typography from "tw-components/Typography";
import { Chip } from "components/components";

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
    <div className="mt-10">
      <Typography.Title4 className="text-charcoal">
        Technical Skills and Tools
      </Typography.Title4>
      <div className="mt-10 flex flex-wrap justify-center gap-4 px-8">
        {tools.map((tool) => {
          return <Chip key={tool} value={tool} variant="multi" />;
        })}
      </div>
    </div>
  );
}

export { ChipsSelection };
