/**
 * Drag-selection state machinery for the Calendar component.
 *
 * The calendar's selection is encoded as a flat string of `0` and
 * `1` characters (one per cell, row-major). `dissect` and
 * `connect` convert between that flat string and a 2D array for
 * easier indexed access; `useDragState` tracks whether the mouse
 * is currently pressed AND whether the drag is selecting or
 * unselecting (decided by the first cell hit). `useDragToSelectUnselect`
 * is the per-cell hook that flips the appropriate bit when the
 * mouse drags over.
 *
 * The string-encoded format is what gets passed back to the
 * caller via `Calendar.onChange`. The format is owned here; if
 * the encoding changes, both ends need to update.
 */

import { useState } from "react";

import type { cell } from "./Calendar";

function dissect(str: string, partition: number = 7) {
  const arr = str.match(new RegExp(`.{1,${partition}}`, "g"));
  const nestedArr = [];
  if (arr) {
    for (const substring of arr) {
      nestedArr.push(substring.split(""));
    }
  }
  return nestedArr;
}

function connect(nested_arr: string[][]) {
  const arr = [];
  for (const subArr of nested_arr) {
    arr.push(subArr.join(""));
  }
  return arr.join("");
}

function useDragState() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [toSelect, setToSelect] = useState(false);
  return [isMouseDown, setIsMouseDown, toSelect, setToSelect] as const;
}

// sets the state to selected or deselected
function useDragToSelectUnselect(cell: cell, data_: string, toSelect: boolean) {
  const [nextdata, setData] = useState(data_);
  const { row, col } = cell;
  const [next, setNext] = useState(CellStatus());
  const handleSelect = (isMouseDown: boolean) => {
    if (isMouseDown) {
      const newrow = row - 1;
      const newcol = col - 1;
      const nestedArr = dissect(data_);
      if (nestedArr) {
        nestedArr[newrow][newcol] = toSelect ? "1" : "0";
        setData(connect(nestedArr));
        setNext(nestedArr[newrow][newcol] === "1");
      }
    }
    return;
  };

  function CellStatus() {
    const newrow = row - 1;
    const newcol = col - 1;
    const nestedArr = dissect(nextdata);
    if (nestedArr) {
      if (nestedArr[newrow][newcol] === "1") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  return [next, nextdata, handleSelect] as const;
}

export { useDragState, useDragToSelectUnselect };
