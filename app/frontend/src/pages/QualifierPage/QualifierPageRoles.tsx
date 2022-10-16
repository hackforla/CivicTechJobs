// External Imports
import React, { Fragment, useEffect, useState } from "react";

// Internal Imports
import { Button, Chip } from "components/components";
import { QualifierNav, QualifierTitle } from "./QualifierComponents";
import { fetchAllCopData, copDatum } from "pages/api_data/copData";
import { onKey } from "components/Utility/utils";

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
      <div className="flex-center-x">
        {data.map((datum, index) => {
          return (
            <Fragment key={index}>
              <CopRoles copDatum={datum} />
              {index < data.length - 1 && (
                <hr className="row col-8 qroles-border"></hr>
              )}
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
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isRoleChecked, setIsRoleChecked] = useState<boolean[]>(
    Array(copDatum.roles.length).fill(false)
  );

  function handleSelectAll() {
    const copy = isRoleChecked.map((_) => !isAllSelected);
    setIsRoleChecked(copy);
    setIsAllSelected(!isAllSelected);
  }

  return (
    <div className="row fill flex-center-x my-1">
      <div className="col-7">
        <div className="row align-center my-2">
          <copDatum.icon
            fill="black"
            strokeWidth="0.2"
            height="21"
            aria-hidden="true"
          />
          <span className="title-4 ml-1">{copDatum.title}</span>
        </div>
        <div>
          {copDatum.roles.map((role, index) => {
            return (
              <Chip
                key={index}
                addClass="mr-2 mb-2"
                isActive={isRoleChecked[index]}
                value={role}
                onChange={(active, value) => {
                  const copy = [...isRoleChecked];
                  copy[index] = active;
                  setIsRoleChecked(copy);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="col-1 text-right">
        <span
          className="links"
          tabIndex={0}
          role="button"
          aria-pressed={isAllSelected}
          onClick={handleSelectAll}
          onKeyDown={(e) => onKey(handleSelectAll, "Enter")(e)}
        >
          {isAllSelected ? "Deselect All" : "Select all"}
        </span>
      </div>
    </div>
  );
}

export { QualifierPageRoles };
