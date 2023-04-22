// External Imports
import { combineClasses } from "components/Utility/utils";
import React, { useState } from "react";
import { IconButton } from "components/components";

// Internal Imports
import { iconX } from "../../assets/images/images";
import { TransitionWrapper } from "components/components";

interface NotificationProps extends React.PropsWithChildren {
  autoHidden: boolean;
  closable: boolean;
  fade: boolean;
  show: boolean;
}

function Notification({
  autoHidden = false,
  closable = false,
  fade = false,
  ...props
}: NotificationProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [show, setShow] = useState(true);

  const CloseButton = () => {
    function handleClick() {
      if (autoHidden || fade) {
        setShow(false);
      } else {
        setIsHidden(true);
      }
    }

    return (
      <IconButton
        addClass="notification-x"
        iconUrl={iconX}
        label="close"
        onClick={() => {
          handleClick();
        }}
      />
    );
  };

  const Bar = () => {
    return (
      <div
        className={combineClasses(
          "flex-center-x",
          "align-center",
          "notification",
          isHidden && "hidden"
        )}
      >
        {closable && <CloseButton />}
        <div className="paragraph-3 text-center">{props.children}</div>
      </div>
    );
  };

  return fade || autoHidden ? (
    <TransitionWrapper show={show} autoExit={autoHidden}>
      <Bar></Bar>
    </TransitionWrapper>
  ) : (
    <Bar></Bar>
  );
}

export { Notification };
