import { combineClasses } from "../Utility/utils";

import React from "react";
import { Card } from "./StandardCard";

interface InnerCopCardProps extends React.PropsWithChildren {
  addClass?: string;
}

function InnerCopCard(props: InnerCopCardProps) {
  return (
    <Card addClass={combineClasses("inner-cop-card", props.addClass)}>
      <div className="inner-cop-card-content">{props.children}</div>
    </Card>
  );
}

export { InnerCopCard };
