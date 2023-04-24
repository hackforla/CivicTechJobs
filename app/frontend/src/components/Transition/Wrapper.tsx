// External exports
import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

interface TransitionWrapper extends React.PropsWithChildren {
  autoExit?: boolean;
  onExited?: () => any;
  show?: boolean;
}

const TransitionWrapper = ({
  autoExit = false,
  show = true,
  ...props
}: TransitionWrapper) => {
  const [isNotificationOnDOM, setIsNotificationOnDOM] = useState(show);
  const nodeRef = useRef(null);
  const autoHiddenTimeout = 500;

  useEffect(() => {
    setIsNotificationOnDOM(show);
  }, [show]);

  return (
    <CSSTransition
      in={isNotificationOnDOM}
      nodeRef={nodeRef}
      classNames="fade"
      timeout={1000}
      unmountOnExit
      appear
      onEntered={() => {
        if (autoExit) {
          window.setTimeout(() => {
            setIsNotificationOnDOM(false);
          }, autoHiddenTimeout);
        }
      }}
      onExited={() => {
        if (props.onExited) {
          props.onExited();
        }
      }}
    >
      <div ref={nodeRef}>{props.children}</div>
    </CSSTransition>
  );
};

export { TransitionWrapper };
