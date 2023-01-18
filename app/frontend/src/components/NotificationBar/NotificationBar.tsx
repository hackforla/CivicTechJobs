// Eternal Imports
import React, { useState, useEffect } from "react";

// Internal Imports
import { iconX } from "../../assets/images/images";
import { combineClasses } from "../Utility/utils";
import "./_transition.scss";
// Type declaration for props
interface NotificationBarProps {
  content: string;
}

function NotificationBar({ content }: NotificationBarProps) {
  const [showBar, setShowBar] = useState("inherit");
  return (
    <div
      className={combineClasses("bar", "slide-in")}
      style={{
        backgroundColor: "peachpuff",
        padding: "1em",
        display: showBar,
        position: "sticky",
        zIndex: 2,
      }}
    >
      <div onClick={() => setShowBar("none")}>
        <img
          src={iconX}
          style={{ float: "right", cursor: "pointer" }}
          height={"10px"}
          width={"10px"}
        />
      </div>
      {content}
    </div>
  );
}

export { NotificationBar };
