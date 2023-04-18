// Eternal Imports
import { combineClasses } from "components/Utility/utils";
import React, { useState, useRef, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import { IconButton } from "components/components";

// Internal Imports
import { iconX } from "../../assets/images/images";

interface NotificationProps extends React.PropsWithChildren {
  autoHidden: boolean;
  closable: boolean;
  fade: boolean;
}

function Notification({
  autoHidden = false,
  closable = false,
  fade = false,
  ...props
}: NotificationProps) {
  const [hidden, setHidden] = useState(false);
  const nodeRef = useRef(null);

  const TransitionWrapper = (props) => {
    return (
      <CSSTransition
        in={!hidden}
        nodeRef={nodeRef}
        classNames="notification-bar-fade"
        timeout={1000}
        appear
        unmountOnExit
        onEntered={() => {
          if (autoHidden) setHidden(true);
        }}
      >
        <div ref={nodeRef}>{props.children}</div>
      </CSSTransition>
    );
  };

  const Tag = fade || autoHidden ? TransitionWrapper : Fragment;

  return (
    <Tag>
      <div
        className={combineClasses(
          "flex-center-x",
          "align-center",
          "notification-bar",
          hidden && !fade && "hidden"
        )}
      >
        {closable && (
          <IconButton
            addClass="notification-bar-x"
            iconUrl={iconX}
            label="close"
            onClick={() => setHidden(true)}
          />
        )}
        <div className="paragraph-3 text-center">{props.children}</div>
      </div>
    </Tag>
  );
}

export { Notification };
