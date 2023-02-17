// External Imports
import React, { Fragment, useState } from "react";

// Internal Imports
import { Chip, Card } from "components/components";
import { credits, creditsDatum } from "./creditsData";
import { combineClasses } from "components/Utility/utils";

function CreditsCards() {
  const [currentType, setCurrentType] = useState<null | string>(
    "Illustrations"
  );

  return (
    <Fragment>
      <div>
        {Object.keys(credits).map((creditsType: string, index) => {
          return (
            <Chip
              key={index}
              addClass="mr-5"
              checked={creditsType == currentType}
              value={creditsType}
              onClick={(active, value) => {
                active ? setCurrentType(value) : setCurrentType(null);
              }}
            />
          );
        })}
      </div>
      <div
        className={combineClasses(
          "credits-cards",
          `credits-cards-${currentType?.toLowerCase()}`
        )}
      >
        {(currentType ? credits[currentType] : []).map(
          (data: creditsDatum, index) => {
            return <CreditsCard key={index} data={data} />;
          }
        )}
      </div>
    </Fragment>
  );
}

interface CreditsCardProps {
  data: creditsDatum;
}

function CreditsCard({ data }: CreditsCardProps) {
  function Image({ creditSrc }: { creditSrc: any }) {
    return (
      <div className="credits-card-circle flex-container align-center mb-3">
        <img src={creditSrc} width="100%" alt="" />
      </div>
    );
  }

  interface TextProps {
    categoryKey: string;
    categoryValue: string;
  }

  function Text({ categoryKey, categoryValue }: TextProps) {
    return (
      <div className="row">
        <div className="col-5">
          <span className="title-6">{categoryKey}:</span>
        </div>
        <div className="col-7">
          <span>{categoryValue}</span>
        </div>
      </div>
    );
  }

  return (
    <Card addClass="credits-card p-5 my-5">
      <Image creditSrc={data.src} />
      <div className="my-4">
        <Text categoryKey="Name" categoryValue={data.name} />
        <Text categoryKey="Provider" categoryValue={data.provider} />
      </div>
      <a
        href={data.url}
        className="credits-card-links mb-5"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </a>
    </Card>
  );
}

export { CreditsCards };
