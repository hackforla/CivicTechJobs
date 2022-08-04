// Eternal Imports
import React, { Fragment } from "react";

// Internal Imports
import { combineClasses, range } from "../Utility/utils";

// Type declaration for props
interface CalendarProps extends React.PropsWithChildren {
  column?: number;
  columnNames?: string[];
  row?: number;
}

interface CalendarRowProps {
  size: number;
  rowNum: number;
}

interface CalendarHeadRowProps extends React.PropsWithChildren {
  columnNames: string[];
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
        return <td key={num} className="calendar-cell"></td>;
      })}
    </tr>
  );
}

export { Calendar };
