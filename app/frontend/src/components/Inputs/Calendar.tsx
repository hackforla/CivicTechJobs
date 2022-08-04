// Eternal Imports
import React, { Fragment, useState } from "react";

// Internal Imports
import { combineClasses, range } from "../Utility/utils";

// Type declaration for props
interface CalendarProps extends React.PropsWithChildren {
  column?: number;
  columnNames?: string[];
  row?: number;
}

interface CalendarHeadRowProps extends React.PropsWithChildren {
  columnNames: string[];
}

interface CalendarRowProps {
  size: number;
  rowNum: number;
}

interface CalendarCellProps {
  key: number;
  selected?: boolean;
}

function Calendar({ row = 48, column = 7, ...props }: CalendarProps) {
  return (
    <table className="calendar">
      {props.columnNames && (
        <CalendarHeaderRow key={row} columnNames={props.columnNames} />
      )}
      {range(1, row).map((row, index) => {
        return <CalendarRow key={row} size={column} rowNum={index} />;
      })}
    </table>
  );
}

function CalendarHeaderRow(props: CalendarHeadRowProps) {
  return (
    <tr>
      {props.columnNames.map((name, index) => {
        return (
          <th key={index} scope="col" className="calendar-header">
            {name}
          </th>
        );
      })}
    </tr>
  );
}

function CalendarRow(props: CalendarRowProps) {
  return (
    <tr
      className={combineClasses(
        "calendar-row",
        props.rowNum % 2 == 0 ? "solid" : "dashed"
      )}
    >
      {range(1, props.size).map((num) => {
        return <CalendarCell key={num} />;
      })}
    </tr>
  );
}

function CalendarCell({ selected = false, ...props }: CalendarCellProps) {
  const [isSelected, setIsSelected] = useState(selected);

  function handleClick() {
    setIsSelected(!isSelected);
  }

  return (
    <td
      key={props.key}
      className={combineClasses("calendar-cell", isSelected && "selected")}
      onClick={handleClick}
    ></td>
  );
}

export { Calendar };
