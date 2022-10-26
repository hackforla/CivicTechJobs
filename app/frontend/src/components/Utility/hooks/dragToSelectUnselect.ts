import React, { useEffect, useState, useCallback } from "react";

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

export function useDragState() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [toSelect, setToSelect] = useState(false);
  return [isMouseDown, setIsMouseDown, toSelect, setToSelect] as const;
}

// sets the state to selected or deselected 
export function useDragToSelectUnselect(cell: any, data_: string, toSelect: boolean) {
    const [nextdata, setData] = useState(data_);
    const { row, col } = cell;
    const orig = CellStatus()
    const [next, setNext] = useState(orig);
    const handleSelect = (isMouseDown: boolean) => {
        if (isMouseDown) {
            const rowIndex = row - 1;
            const columnIndex = col - 1;
            const nestedArr = dissect(data_);
            if (nestedArr) {
              nestedArr[rowIndex][columnIndex] = toSelect ? "1" : "0";
              setData(connect(nestedArr));
              setNext(nestedArr[rowIndex][columnIndex] === "1");
            }
        }
        return;
    };
    function CellStatus() {
        const rowIndex = row - 1;
        const columnIndex = col - 1;
        const nestedArr = dissect(nextdata);
        if (nestedArr) {
        if (nestedArr[rowIndex][columnIndex] === "1") {
            return true;
        } else {
            return false;
        }
        } else {
        return false;
        }
    }
    return [orig, next, nextdata, handleSelect] as const;
}