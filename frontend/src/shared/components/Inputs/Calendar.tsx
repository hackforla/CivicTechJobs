"use client";

import React, { useEffect, useState } from "react";

import { cn, onKey, range } from "@/shared/lib/utils";

import styles from "./Calendar.module.css";
import { daysOfWeek, hoursOfDay } from "./calendar_data";
import { useDragToSelectUnselect, useDragState } from "./dragToSelectUnselect";

// Type declaration for props
interface CalendarProps extends React.PropsWithChildren {
  addClass?: string;
  onChange: (data: string) => void;
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

const initialValue = "0".repeat(24 * 2 * 7);

function Calendar({ value = initialValue, addClass, onChange }: CalendarProps) {
  const [data, setData] = useState(value);
  const [isMouseDown, setIsMouseDown, toSelect, setToSelect] = useDragState();

  useEffect(() => {
    onChange(data);
  }, [onChange, data]);

  return (
    <div className={cn(styles.root, addClass)} data-testid="calendar-root">
      <CalendarHeaderColumn rowNames={hoursOfDay()} />
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <CalendarHeaderRow columnNames={daysOfWeek} />
          </thead>
          <tbody>
            <tr aria-hidden={true}>
              <td></td>
              {range(1, 7).map((_, index) => {
                return <td key={index} className={styles.ticksTop}></td>;
              })}
            </tr>
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
    <div className={styles.headerColumn}>
      <div aria-hidden="true"></div>
      {props.rowNames?.map((name, index) => {
        return (
          <div key={index} className={styles.headerLabel}>
            {name}
          </div>
        );
      })}
    </div>
  );
}

function CalendarHeaderRow(props: CalendarHeadRowProps) {
  return (
    <tr className={styles.headerRow}>
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
      className={cn(
        styles.row,
        props.rowNum % 2 == 0 ? styles.dashed : styles.solid,
      )}
    >
      <td
        className={cn(
          styles.ticksLeft,
          props.rowNum % 2 == 0 ? styles.dashed : styles.solid,
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
    toSelect,
  );
  useEffect(() => {
    setData(nextdata);
  }, [setData, nextdata]);

  function mouseDown() {
    setToSelect(!next);
    setIsMouseDown(true);
  }

  function mouseMove(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    handleSelect(isMouseDown);
  }

  return (
    <td
      tabIndex={-1}
      className={cn(
        styles.cell,
        cell.row % 2 == 0 ? styles.dashed : styles.solid,
        next && styles.selected,
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

export type { cell };
export { Calendar };
