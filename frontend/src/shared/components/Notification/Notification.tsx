/**
 * Inline notification bar for status / alert messages.
 *
 * Renders a horizontal bar with a message and an optional close
 * button. `role` controls assistive-tech announcement: `"status"`
 * (polite) for non-urgent updates, `"alert"` (assertive) for
 * errors and required attention.
 *
 * Three dismiss modes:
 * - `closable=true`: shows an X button; clicking hides the bar.
 * - `autoHidden=true`: bar fades out automatically after a delay
 *   (managed by `TransitionWrapper`).
 * - `fade=true`: bar fades on the `show` prop transitioning to
 *   false.
 *
 * If both `fade` and `autoHidden` are off, the bar is always
 * visible (or hidden by `show=false` without animation).
 */

"use client";

import React, { useEffect, useState } from "react";

import { IconButton } from "@/shared/components/Buttons";
import { TransitionWrapper } from "@/shared/components/TransitionWrapper/TransitionWrapper";
import IconX from "@/shared/icons/icon-x.svg";
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
