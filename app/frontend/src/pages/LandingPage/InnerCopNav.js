// External Imports
import React from "react";

import { InnerCopNavCard } from "components/components";

function InnerCopNav({ activeCop, copData, ...props }) {
  return (
    <nav className="inner-cop-nav">
      {copData.map((cop) => {
        const isActive = cop.id == activeCop;

        return (
          <InnerCopNavCard
            key={cop.id}
            isActive={isActive}
            onClick={() => props.onClick(cop.id)}
            addClass="p-1"
          >
            <cop.icon
              fill={isActive ? "white" : "black"}
              stroke={isActive ? "white" : "black"}
              strokeWidth="0.2"
              height="24"
              width="24"
            />
            <span className="title-6">{cop.title}</span>
          </InnerCopNavCard>
        );
      })}
    </nav>
  );
}

InnerCopNav.propTypes = {};

export { InnerCopNav };
