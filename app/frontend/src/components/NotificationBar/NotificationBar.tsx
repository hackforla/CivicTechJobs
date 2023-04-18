// Eternal Imports
import { combineClasses } from "components/Utility/utils";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { IconButton } from "components/components";

// Internal Imports
import { iconX } from "../../assets/images/images";

interface NotificationBarProps extends React.PropsWithChildren {
  autoHidden: boolean;
  closable: boolean;
  fade: boolean;
  text: string;
}

function NotificationBar({
  autoHidden = false,
  closable = false,
  ...props
}: NotificationBarProps) {
  const [showBar, setShowBar] = useState(true);
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={showBar}
      nodeRef={nodeRef}
      classNames="notification-bar-fade"
      timeout={1000}
      appear
      unmountOnExit
      onEntered={() => {
        if (autoHidden) setShowBar(false);
      }}
    >
      <div
        ref={nodeRef}
        className={combineClasses(
          "flex-center-x",
          "align-center",
          "notification-bar"
        )}
      >
        {closable && (
          <IconButton
            addClass="notification-bar-x"
            iconUrl={iconX}
            label="close"
            onClick={() => setShowBar(false)}
          />
        )}
        <div className="paragraph-3 text-center">{props.children}</div>
      </div>
    </CSSTransition>
  );
}

export { NotificationBar };
