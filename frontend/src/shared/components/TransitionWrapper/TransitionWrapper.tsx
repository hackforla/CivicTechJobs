"use client";

import React, { useEffect, useState } from "react";

interface TransitionWrapperProps extends React.PropsWithChildren {
  autoExit?: boolean;
  onExited?: () => void;
  show?: boolean;
}

// Mount/unmount wrapper that replaces the legacy `react-transition-group`
// usage. `react-transition-group` does not support React 19, and the
// fade timing this carries was never load-bearing for behavior - PR2
// will reintroduce a CSS-only transition once styling moves to CSS
// Modules.
function TransitionWrapper({
  autoExit = false,
  onExited,
  show = true,
  children,
}: TransitionWrapperProps) {
  const [mounted, setMounted] = useState(show);

  useEffect(() => {
    if (show) {
      setMounted(true);
      return;
    }
    setMounted(false);
    onExited?.();
  }, [show, onExited]);

  useEffect(() => {
    if (!autoExit || !mounted) return;
    const id = window.setTimeout(() => {
      setMounted(false);
      onExited?.();
    }, 500);
    return () => window.clearTimeout(id);
  }, [autoExit, mounted, onExited]);

  if (!mounted) return null;
  return <div>{children}</div>;
}

export { TransitionWrapper };
