// Eternal Imports
import React, { useState, useEffect } from "react";

// Internal Imports
import { iconX } from "../../assets/images/images";
import { combineClasses } from "../Utility/utils";
import "./_transition.scss";
import "./_closeButton.scss";
import "../Basics/_alignment.scss";
import { CSSTransition } from "react-transition-group";
import { Wrapper } from "./Wrapper";
// Type declaration for props
interface NotificationBarProps {
  content: string;
  nimation: any;
}

function NotificationBar_Auto({ content, Animation }: NotificationBarProps) {
  const [showBar, setShowBar] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowBar(false), 2 * 1000);
  }, [showBar]);

  return (
    <>
      {showBar ? (
        <Wrapper wrapper={(children) => <Animation>{children}</Animation>}>
          <>
            <div className={combineClasses("bar", "slide-in")}>
              <button
                onClick={() => setShowBar(false)}
                onKeyDown={() => null}
                className="close"
              >
                <img src={iconX} height={"10px"} width={"10px"} alt="close" />
              </button>
              <p className={combineClasses("text-center")}>{content}</p>
            </div>
          </>
        </Wrapper>
      ) : null}
    </>
  );
}

export { NotificationBar_Auto };
