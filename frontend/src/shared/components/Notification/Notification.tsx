"use client";

import React, { useEffect, useState } from "react";

import { IconButton } from "@/shared/components/Buttons";
import IconX from "@/shared/icons/icon-x.svg";
import { TransitionWrapper } from "@/shared/components/TransitionWrapper/TransitionWrapper";
import { cn } from "@/shared/lib/utils";
import styles from "./Notification.module.css";

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
        className={styles.closeButton}
        Icon={IconX}
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
        className={cn(styles.bar, isHidden && styles.barHidden)}
        aria-hidden={isHidden}
        role={role}
      >
        {closable && <CloseButton />}
        <div className={styles.message}>{props.children}</div>
      </div>
    );
  };

  return fade || autoHidden ? (
    <TransitionWrapper show={isShow} autoExit={autoHidden}>
      <Bar />
    </TransitionWrapper>
  ) : (
    <Bar />
  );
}

export { Notification };
