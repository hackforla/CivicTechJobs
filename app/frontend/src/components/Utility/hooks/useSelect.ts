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

// sets the relavant state of the mouse 
export function useMouse (state = false) {
    const [isMouseDown, setIsMouseDown] = useState(state);
    return [isMouseDown, setIsMouseDown] as const;
}

// sets the relevant state of calendar selection
export function setSelect(bool: boolean) {
    const [selected, setSelected] = useState(bool);
    return [selected, setSelected] as const;
}

// sets the state to selected or deselected 
export function useSelect(cell: any, data_: string) {
    const { row, col } = cell;
    const [data, setData] = useState(data_);
    const orig = CellStatus();
    const [next, setNext] = useState(orig);
    const handleSelect = useCallback((selected: boolean) => {
        const rowIndex = row - 1;
        const columnIndex = col - 1;
        const nestedArr = dissect(data_);
        if (nestedArr) {
            nestedArr[rowIndex][columnIndex] = selected ? "1" : "0";
            setData(connect(nestedArr));
            setNext(nestedArr[rowIndex][columnIndex] === "1");
        }
    }, [orig]);
    function CellStatus() {
        const rowIndex = row - 1;
        const columnIndex = col - 1;
        const nestedArr = dissect(data);
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
    return [orig, next, data, handleSelect] as const;
}




