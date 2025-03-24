// External Imports
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

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
      className={clsx(
        "fixed inset-0 h-screen w-full overflow-auto z-50 bg-[rgba(0,0,0,0.4)] transition-opacity duration-[400ms] ease-in-out",
        !isBackdropOpen && "opacity-0 pointer-events-none",
        isBackdropOpen && "opacity-100",
        props.className
      )}
      ref={windowRef}
      onClick={handleClose}
      role="presentation"
    >
      <div
        className={clsx(
          "fixed inset-0 flex items-start justify-center",
          open 
            ? "animate-slide-down" 
            : "animate-slide-up",
          props.className
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
