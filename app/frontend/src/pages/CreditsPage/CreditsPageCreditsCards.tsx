// External Imports
import React, { Fragment, useState } from "react";

// Internal Imports
import { Chip, Card } from "components/components";
import { credits, creditsDatum } from "./creditsData";

function CreditsCards() {
  const [currentType, setCurrentType] = useState<null | string>(null);

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
      <div className="credits-cards">
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
        <div className="col-6">
          <span className="title-6">{categoryKey}:</span>
        </div>
        <div className="col-6">
          <span>{categoryValue}</span>
        </div>
      </div>
    );
  }

  return (
    <Card addClass="credits-card p-5 my-5">
      <Image creditSrc={data.src} />
      <Text categoryKey="Name" categoryValue={data.name} />
      <Text categoryKey="Used In" categoryValue="Credits Page" />
      <Text categoryKey="Provider" categoryValue={data.provider} />
      <a
        href={data.url}
        className="credits-card-links mt-4 mb-5"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more
      </a>
    </Card>
  );
}

export { CreditsCards };
