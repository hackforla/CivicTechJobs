// External Imports
import { combineClasses } from "components/Utility/utils";
import React, { useEffect, useState } from "react";
import { IconButton } from "components/components";

// Internal Imports
import { iconX } from "../../assets/images/images";
import { TransitionWrapper } from "components/components";

interface NotificationProps extends React.PropsWithChildren {
  autoHidden?: boolean;
  closable?: boolean;
  fade?: boolean;
  role?: "status" | "alert";
  show?: boolean;
  children: React.ReactNode;
}

function Notification({
  autoHidden = false,
  closable = false,
  fade = false,
  role = "status",
  show = true,
  ...props
}: NotificationProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isShow, setIsShow] = useState(show);

  useEffect(() => {
    setIsShow(show);
    if (!show) {
      setIsHidden(true);
    }
  }, [show]);

  const CloseButton = () => {
    function handleClick() {
      if (autoHidden || fade) {
        setIsShow(false);
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
          isHidden && "hidden",
        )}
        aria-hidden={isHidden}
        role={role}
      >
        {closable && <CloseButton />}
        <div className="paragraph-3 text-center">{props.children}</div>
      </div>
    );
  };

  return fade || autoHidden ? (
    <TransitionWrapper show={isShow} autoExit={autoHidden}>
      <Bar></Bar>
    </TransitionWrapper>
  ) : (
    <Bar></Bar>
  );
}

export { Notification };
