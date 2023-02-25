// Eternal Imports
import React, { useEffect, useState } from "react";

// Internal Imports
import { combineClasses, onKey, range } from "../Utility/utils";
import { daysOfWeek, hoursOfDay } from "./calendar_data";
import {
  useDragToSelectUnselect,
  useDragState,
} from "../Utility/hooks/dragToSelectUnselect";

// Type declaration for props
interface CalendarProps extends React.PropsWithChildren {
  addClass?: string;
  onChange: (data: string) => any;
  value?: any;
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

type cell = {
  row: number;
  col: number;
};

interface CalendarCellProps {
  key: number;
  data: string;
  cell: cell;
  setData: (str: string) => void;
  isMouseDown: boolean;
  setIsMouseDown: (bool: boolean) => void;
  toSelect: boolean;
  setToSelect: (bool: boolean) => void;
}

function Calendar({ value = "0".repeat(24 * 2 * 7), ...props }: CalendarProps) {
  const [data, setData] = useState(value);
  const [isMouseDown, setIsMouseDown, toSelect, setToSelect] = useDragState();
  useEffect(() => {
    props.onChange(data);
  }, [data]);
  return (
    <div className={combineClasses("flex-container fill", props.addClass)}>
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
                        cell={{ row: row, col: column }}
                        data={data}
                        setData={setData}
                        isMouseDown={isMouseDown}
                        setIsMouseDown={setIsMouseDown}
                        toSelect={toSelect}
                        setToSelect={setToSelect}
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
    <div className="calendar-header-column pr-1">
      <div aria-hidden="true"></div>
      {props.rowNames?.map((name, index) => {
        return (
          <div key={index} className="paragraph-2">
            {name}
          </div>
        );
      })}
    </div>
  );
}

function CalendarHeaderRow(props: CalendarHeadRowProps) {
  return (
    <tr className="calendar-header-row">
      <th aria-hidden="true"></th>
      {props.columnNames.map((name, index) => {
        return (
          <th key={index} scope="col">
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

function CalendarCell({
  cell,
  setToSelect,
  setIsMouseDown,
  isMouseDown,
  data,
  setData,
  toSelect,
}: CalendarCellProps) {
  const [next, nextdata, handleSelect] = useDragToSelectUnselect(
    cell,
    data,
    toSelect
  );
  useEffect(() => {
    setData(nextdata);
  }, [next]);

  function mouseDown(e: any) {
    setToSelect(!next);
    setIsMouseDown(true);
  }

  function mouseMove(e: any) {
    e.preventDefault();
    handleSelect(isMouseDown);
  }

  return (
    <td
      tabIndex={-1}
      className={combineClasses(
        "calendar-cell",
        cell.row % 2 == 0 ? "dashed" : "solid",
        next && "selected"
      )}
    >
      <div
        tabIndex={0}
        role="checkbox"
        aria-checked={next}
        aria-label={`I am available on ${cell.row}, ${cell.col}`}
        onClick={() => handleSelect(!isMouseDown)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseMove={mouseMove}
        onMouseDown={mouseDown}
        onKeyDown={(e) => onKey(mouseDown, "Enter")(e)}
      ></div>
    </td>
  );
}

export { Calendar };
