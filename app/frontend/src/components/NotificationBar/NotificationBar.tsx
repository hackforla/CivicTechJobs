// Eternal Imports
import React, { useState, useEffect } from "react";

// Internal Imports
import { iconX } from "../../assets/images/images";
import { combineClasses } from "../Utility/utils";
import "./_transition.scss";
import "../Basics/_alignment.scss";
// Type declaration for props
interface NotificationBarProps {
  content: string;
}

function NotificationBar({ content }: NotificationBarProps) {
  const [showBar, setShowBar] = useState(true);
  return (
    <>
      {showBar ? (
        <div className={combineClasses("bar", "slide-in")}>
          <div onClick={() => setShowBar(false)}>
            <img
              src={iconX}
              style={{ float: "right", cursor: "pointer" }}
              height={"10px"}
              width={"10px"}
            />
          </div>
          <p className={combineClasses("text-center")}>{content}</p>
        </div>
      ) : null}
    </>
  );
}

export { NotificationBar };
