// External Imports
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

// Internal Imports
import { combineClasses } from "../Utility/utils";

interface DialogProps extends React.PropsWithChildren {
  addClass?: string;
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
    if (open) setIsBackdropOpen(true);
  });

  function handleClose(e: React.MouseEvent) {
    if (e.target === windowRef.current) {
      props.onClose();
    }
  }

  return (
    <div
      className={combineClasses(
        "dialog-backdrop",
        !isBackdropOpen && "hidden",
        props.addClass,
      )}
      ref={windowRef}
      onClick={handleClose}
      role="presentation"
    >
      <CSSTransition
        in={open}
        classNames="dialog"
        timeout={400}
        unmountOnExit
        onEnter={() => setIsBackdropOpen(true)}
        onExited={() => {
          setIsBackdropOpen(false);
        }}
        nodeRef={nodeRef}
      >
        <div
          className={combineClasses(props.addClass)}
          role="dialog"
          aria-label={props.ariaLabel}
          tabIndex={-1}
          ref={nodeRef}
        >
          {props.children}
        </div>
      </CSSTransition>
    </div>
  );
}

export { Dialog };
