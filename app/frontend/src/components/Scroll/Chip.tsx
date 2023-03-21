// External Imports
import React, { useState, useEffect, useRef } from "react";
import { CarrotDown } from "assets/images/images";
// Internal Imports
import { combineClasses } from "../Utility/utils";

interface ChipProps extends React.PropsWithChildren {}

function Chip({children}: ChipProps) { 
    return (
      <div id="scroll-chip">
        <div>{children}</div>
        <div>
          <button className="scroll-chevron-button">
            <img
                src={CarrotDown}
                className="scroll-chevron-carrot"
            />
          </button>
        </div>
      </div>
    );
}

export default Chip;