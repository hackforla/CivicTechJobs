"use client";

import React, { useState, useEffect, useRef } from "react";

import { cn } from "@/shared/lib/utils";

import styles from "./Dialog.module.css";

interface DialogProps extends React.PropsWithChildren {
  className?: string;
  ariaLabel: string;
  onClose: () => void;
  open: boolean;
}

function Dialog({ open = false, ...props }: DialogProps) {
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const windowRef = useRef(null);
  const nodeRef = useRef(null);

  // Adjust padding on body when scrollbar is hidden so that page content does not jump
  useEffect(() => {
    if (isBackdropOpen) {
      const scrollWidth = Math.abs(
        window.innerWidth - document.documentElement.clientWidth,
      );
      document.body.style.paddingRight = `${scrollWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("padding-right");
      document.body.style.overflow = "auto";
    }
  }, [isBackdropOpen]);

  useEffect(() => {
    if (open) {
      setIsBackdropOpen(true);
    } else {
      setIsBackdropOpen(false);
    }
  }, [open]);

  function handleClose(e: React.MouseEvent) {
    if (e.target === windowRef.current) {
      props.onClose();
    }
  }

  return (
    <div
      className={cn(
        styles.backdrop,
        isBackdropOpen ? styles.backdropOpen : styles.backdropClosed,
        props.className,
      )}
      ref={windowRef}
      onClick={handleClose}
      role="presentation"
    >
      <div
        className={cn(
          styles.window,
          open ? styles.windowOpen : styles.windowClosed,
          props.className,
        )}
        role="dialog"
        aria-label={props.ariaLabel}
        tabIndex={-1}
        ref={nodeRef}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Dialog;
