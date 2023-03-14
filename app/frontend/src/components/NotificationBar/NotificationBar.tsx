// Eternal Imports
import { combineClasses } from "components/Utility/utils";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { IconButton } from "components/components";
// Internal Imports
import { iconX } from "../../assets/images/images";
import { auto } from "@popperjs/core";
// Type declaration for props
interface NotificationBarProps extends React.PropsWithChildren {
  autoHidden: boolean; // 1. Added new prop to indicate the bar disappearing on its own
  color: String;
  text: String;
}

function NotificationBar({
  autoHidden = false,
  color = "warning",
  text = "Content of the notification appears here",
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
          "flex-container",
          `notification-bar-${color}`
        )}
      >
        <IconButton
          addClass={`notification-bar-close appear-${autoHidden}`}
          iconUrl={iconX}
          label="close"
          onClick={() => setShowBar(false)}
        />
        <div className="notification-bar-text text-center">
          {props.children}
        </div>
      </div>
    </CSSTransition>
  );
}

export { NotificationBar };
