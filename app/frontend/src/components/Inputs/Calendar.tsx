// Eternal Imports
import React, { useEffect, useState } from "react";

// Internal Imports
import { combineClasses, range } from "../Utility/utils";

// Type declaration for props
interface CalendarProps extends React.PropsWithChildren {
  column?: number;
  columnNames?: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  row?: number;
  rowNames?: string[];
}

interface CalendarHeaderColumnProps {
  rowNames: string[];
}

interface CalendarHeadRowProps extends React.PropsWithChildren {
  columnNames: string[];
}

interface CalendarRowProps extends React.PropsWithChildren {
  rowNum: number;
}

interface CalendarCellProps {
  rowNum: number;
  onChange: (selected: boolean) => any;
  selected?: boolean;
}

function Calendar({ row = 48, column = 7, ...props }: CalendarProps) {
  function handleChange(row: number, column: number, selected: boolean) {
    return;
  }

  return (
    <div className="flex-container">
      {/* Side column with headers. Needs to be separate due to labels being on the border, and alternating */}
      {props.rowNames && <CalendarHeaderColumn rowNames={props.rowNames} />}
      <div style={{ flex: "2 1 0" }}>
        <table className="calendar">
          <thead>
            {/* Top row with the headers */}
            {props.columnNames && (
              <CalendarHeaderRow key={row} columnNames={props.columnNames} />
            )}
          </thead>
          <tbody>
            {/* Top row with the ticks */}
            <tr aria-hidden={true}>
              <td></td>
              {range(1, column).map((col, index) => {
                return <td key={index} className="calendar-ticks-top"></td>;
              })}
            </tr>
            {/* Some number of typical rows */}
            {range(1, row).map((row, index) => {
              return (
                <CalendarRow key={index} rowNum={row}>
                  {range(1, column).map((column, index) => {
                    return (
                      <CalendarCell
                        key={index}
                        rowNum={row}
                        onChange={(selected: boolean) =>
                          handleChange(row, column, selected)
                        }
                      />
                    );
                  })}
                </CalendarRow>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CalendarHeaderColumn(props: CalendarHeaderColumnProps) {
  return (
    <div className="calendar-header-column">
      <div className="calendar-header-row-column-cell"></div>
      {props.rowNames?.map((name, index) => {
        return (
          <div key={index} className="calendar-header-column-cell paragraph-2">
            {name}
          </div>
        );
      })}
    </div>
  );
}

function CalendarHeaderRow(props: CalendarHeadRowProps) {
  return (
    <tr>
      <th aria-hidden={true} className="calendar-header-row-ticks"></th>
      {props.columnNames.map((name, index) => {
        return (
          <th key={index} scope="col" className="calendar-header-row-cell">
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
        props.rowNum % 2 == 0 ? "dashed" : "solid"
      )}
    >
      <td
        className={combineClasses(
          "calendar-ticks-left",
          props.rowNum % 2 == 0 ? "dashed" : "solid"
        )}
        aria-hidden={true}
      ></td>
      {props.children}
    </tr>
  );
}

function CalendarCell({ selected = false, ...props }: CalendarCellProps) {
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    props.onChange(isSelected);
  }, [isSelected]);

  function handleClick() {
    setIsSelected(!isSelected);
  }

  return (
    <td
      className={combineClasses(
        "calendar-cell",
        props.rowNum % 2 == 0 ? "dashed" : "solid",
        isSelected && "selected"
      )}
      onClick={handleClick}
    ></td>
  );
}

export { Calendar };
