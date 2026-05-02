/**
 * Modal dialog primitive with backdrop and scroll-lock behavior.
 *
 * Rendered as `<div role="dialog">` inside a backdrop wrapper; the
 * caller controls visibility via the `open` prop and provides an
 * `onClose` handler that fires when the backdrop is clicked.
 *
 * On open, the component locks the document body's scroll and
 * pads `body` to compensate for the scrollbar's width so that
 * page content doesn't shift horizontally as the scrollbar
 * appears / disappears. On close, both styles are reset.
 *
 * Note: this isn't a fully accessible dialog (no focus trap, no
 * `Escape` close, no return-focus on close). For strict-WCAG
 * usage, consider migrating to a library primitive like Radix's
 * Dialog or Headless UI's Dialog.
 */

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
