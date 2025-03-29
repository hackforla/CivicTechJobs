import React from "react";

// Internal Imports
import Typography from "tw-components/Typography";

function RadioButtonForm() {
  return (
    <table className="w-full table-fixed border-collapse text-charcoal">
      <thead>
        <tr>
          <th className="w-2/3 text-left">
            <Typography.Title4>UX Research and Strategy</Typography.Title4>
          </th>
          <th colSpan={3} className="pb-2 text-left">
            <Typography.Title5>Experience Level</Typography.Title5>
          </th>
        </tr>
        <tr>
          <th></th>
          <th className="pb-4 text-left font-normal text-grey-dark">
            <Typography.Paragraph4>0-2 yrs</Typography.Paragraph4>
          </th>
          <th className="pb-4 text-left font-normal text-grey-dark">
            <Typography.Paragraph4>2-4 yrs</Typography.Paragraph4>
          </th>
          <th className="pb-4 text-left font-normal text-grey-dark">
            <Typography.Paragraph4>4+ yrs</Typography.Paragraph4>
          </th>
        </tr>
      </thead>
      <tbody>
        <SkillRow
          skillName="User Research Methods"
          description="Interviews, surveys, and usability testing"
        />
        <SkillRow
          skillName="User Personas & Journey Mapping"
          description="Developing representative user profiles and mapping user journeys"
        />
        <SkillRow
          skillName="Information Architecture"
          description="E.g., creating site maps, navigation flows, or using card sorting"
        />
        <SkillRow
          skillName="Wireframing & Sketching"
          description="low-fidelity layouts to visualize structure and flow"
        />
      </tbody>
    </table>
  );
}

interface SkillRowProps {
  skillName: string;
  description: string;
}

function SkillRow({ skillName, description }: SkillRowProps) {
  return (
    <tr className="border-b-2 border-grey last:border-0">
      <td className="pb-7 pt-6">
        <Typography.Title5>{skillName}</Typography.Title5>
        <Typography.Paragraph3 className="text-grey-dark">
          {description}
        </Typography.Paragraph3>
      </td>
      <td>
        <RadioButton name={skillName} value="0-2yrs" />
      </td>
      <td>
        <RadioButton name={skillName} value="2-4yrs" />
      </td>
      <td>
        <RadioButton name={skillName} value="4+yrs" />
      </td>
    </tr>
  );
}

interface RadioButtonProps {
  value: string;
  name: string;
}

function RadioButton({ value, name }: RadioButtonProps) {
  return (
    <input
      type="radio"
      name={name}
      value={value}
      className="size-8 border-2 border-grey-dark checked:bg-blue-dark"
    />
  );
}

export { RadioButtonForm };
