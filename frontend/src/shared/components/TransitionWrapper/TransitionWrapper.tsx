/**
 * Mount / unmount wrapper used by Notification.
 *
 * Replaces the legacy `react-transition-group` usage from the
 * pre-rewrite app. `react-transition-group` doesn't support
 * React 19, and the fade timing it carried wasn't load-bearing
 * for any behavior - just a visual effect. A CSS-only transition
 * to replace the missing fade is a follow-up; flagging as a bug
 * to track.
 *
 * `autoExit` causes the wrapper to unmount itself 500ms after
 * mount (used for toast-like notifications that should disappear
 * on their own). `show=false` always unmounts immediately.
 * `onExited` fires when the wrapper unmounts via either path.
 */

"use client";

import React, { useEffect, useState } from "react";

interface TransitionWrapperProps extends React.PropsWithChildren {
  autoExit?: boolean;
  onExited?: () => void;
  show?: boolean;
}

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
