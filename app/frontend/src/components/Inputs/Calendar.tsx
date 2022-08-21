// Eternal Imports
import React, { useEffect, useState } from "react";

// Internal Imports
import { combineClasses, onKey, range } from "../Utility/utils";
import { daysOfWeek, hoursOfDay } from "./calendar_data";

// Type declaration for props
interface CalendarProps extends React.PropsWithChildren {
  onChange: (data: string) => any;
  value?: string;
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

function Calendar({ value = "0".repeat(24 * 2 * 7), ...props }: CalendarProps) {
  const [data, setData] = useState(value);

  useEffect(() => {
    props.onChange(data);
  }, [data]);

  function handleChange(row: number, column: number, selected: boolean) {
    const rowIndex = row - 1;
    const columnIndex = column - 1;
    const nestedArr = dissect(data);
    if (nestedArr) {
      nestedArr[rowIndex][columnIndex] = selected ? "1" : "0";
      setData(connect(nestedArr));
    }
  }

  return (
    <div className="flex-container">
      {/* Side column with headers. Needs to be separate due to labels being on the border, and alternating */}
      <CalendarHeaderColumn rowNames={hoursOfDay()} />
      <div style={{ flex: "2 1 0" }}>
        <table className="calendar">
          <thead>
            {/* Top row with the headers */}
            <CalendarHeaderRow columnNames={daysOfWeek} />
          </thead>
          <tbody>
            {/* Top row with the ticks */}
            <tr aria-hidden={true}>
              <td></td>
              {range(1, 7).map((_, index) => {
                return <td key={index} className="calendar-ticks-top"></td>;
              })}
            </tr>
            {/* Some number of typical rows */}
            {range(1, 48).map((row, index) => {
              return (
                <CalendarRow key={index} rowNum={row}>
                  {range(1, 7).map((column, index) => {
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
      role="checkbox"
      tabIndex={0}
      className={combineClasses(
        "calendar-cell",
        props.rowNum % 2 == 0 ? "dashed" : "solid",
        isSelected && "selected"
      )}
      onClick={handleClick}
      onKeyDown={(e) => onKey(handleClick, "Enter")(e)}
    ></td>
  );
}

function dissect(str: string, partition: number = 7) {
  const arr = str.match(new RegExp(`.{1,${partition}}`, "g"));
  const nestedArr = [];
  if (arr) {
    for (const substring of arr) {
      nestedArr.push(substring.split(""));
    }
    return nestedArr;
  }
}

function connect(nested_arr: string[][]) {
  const arr = [];
  for (const subArr of nested_arr) {
    arr.push(subArr.join(""));
  }
  return arr.join("");
}

export { Calendar };
