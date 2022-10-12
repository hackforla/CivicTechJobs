// External Imports
import React, { Fragment, useEffect, useState } from "react";

// Internal Imports
import { Button, Chip } from "components/components";
import { QualifierNav, QualifierTitle } from "./QualifierComponents";
import { fetchAllCopData, copDatum } from "pages/api_data/copData";

interface QualifierPageRolesProps {
  setPage: (num: number) => void;
}

function QualifierPageRoles({ setPage }: QualifierPageRolesProps) {
  const [data, setData] = useState<copDatum[]>([] as copDatum[]);

  useEffect(() => {
    setData(fetchAllCopData());
  }, []);

  return (
    <Fragment>
      <QualifierTitle title="What type of role are you looking for?">
        Select as many roles as you'd like to find opportunities in.
      </QualifierTitle>
      <div style={{ maxWidth: "1088px" }}>
        {data.map((datum, index) => {
          return (
            <Fragment>
              <CopRoles key={index} copDatum={datum} />
              {index < data.length - 1 && <hr className="qroles-border"></hr>}
            </Fragment>
          );
        })}
      </div>
      <QualifierNav addClass="justify-right">
        <Button
          size="lg"
          length="long"
          color="primary"
          onClick={() => setPage(2)}
        >
          Next
        </Button>
      </QualifierNav>
    </Fragment>
  );
}

interface CopRolesProps {
  copDatum: copDatum;
}

function CopRoles({ copDatum }: CopRolesProps) {
  return (
    <div className="flex-container py-3">
      <div className="row fill align-center pb-3 justify-between">
        <div>
          <copDatum.icon
            fill="black"
            strokeWidth="0.2"
            height="21"
            aria-hidden="true"
          />
          <span className="title-4 pl-1">{copDatum.title}</span>
        </div>
        <div>select all</div>
      </div>
      <div>
        {copDatum.roles.map((role, index) => {
          return (
            <Chip
              addClass="mr-3 mb-2"
              key={index}
              value={role}
              onChange={(active, value) => {
                console.log(
                  `${value} was ${active ? "selected" : "deselected"}`
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export { QualifierPageRoles };
