// Eternal Imports
import { combineClasses } from "components/Utility/utils";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

// Internal Imports
import { iconX } from "../../assets/images/images";
// Type declaration for props
interface NotificationBarProps extends React.PropsWithChildren {
  autoHidden: boolean; // 1. Added new prop to indicate the bar disappearing on its own
  color: String;
}

function NotificationBar({
  autoHidden = false,
  color = "warning",
  ...props
}: NotificationBarProps) {
  const [showBar, setShowBar] = useState(true);
  const nodeRef = useRef(null);

  // 2. Added CSS Transition component to wrap around notification bar
  return (
    <CSSTransition
      in={showBar}
      nodeRef={nodeRef}
      classNames="notification-bar-fade"
      timeout={300}
      appear
      unmountOnExit
      onEntered={() => {
        if (autoHidden) setShowBar(false);
      }}
    >
      <div
        ref={nodeRef}
        className={combineClasses(
          "notification-bar",
          `notification-bar-${color}`
        )}
      >
        <button
          onClick={() => setShowBar(false)}
          className="notification-bar-close"
        >
          <img src={iconX} height={"10px"} width={"10px"} alt="close" />
        </button>
        <p className="text">{props.children}</p>
      </div>
    </CSSTransition>
  );
}

export { NotificationBar };
