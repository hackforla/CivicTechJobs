// Eternal Imports
import React, { useState, useEffect } from "react";

// Internal Imports
import { iconX } from "../../assets/images/images";
import { combineClasses } from "../Utility/utils";
import "./_transition.scss";
import "./_closeButton.scss";
import "../Basics/_alignment.scss";
// Type declaration for props
interface NotificationBarProps {
  content: string;
}

function NotificationBar_Close({ content }: NotificationBarProps) {
  const [showBar, setShowBar] = useState(true);
  return (
    <>
      {showBar ? (
        <div className={combineClasses("bar", "slide-in")}>
          <button
            onClick={() => setShowBar(false)}
            onKeyDown={() => null}
            className="close"
          >
            <img src={iconX} height={"10px"} width={"10px"} alt="close" />
          </button>
          <p className={combineClasses("text-center")}>{content}</p>
        </div>
      ) : null}
    </>
  );
}

export { NotificationBar_Close };
