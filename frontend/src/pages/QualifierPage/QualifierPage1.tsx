// External Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Internal Imports
import { copDatum, fetchAllCopData } from "api_data/copData";
import Typography from "tw-components/Typography";
import { Button } from "components/components";
import { QualifierNav } from "./QualifierComponents";

function QualifierPage1() {
  const navigate = useNavigate();
  const [copData, setCopData] = useState<copDatum[]>([] as copDatum[]);

  useEffect(() => {
    setCopData(fetchAllCopData());
  }, []);

  return (
    <>
      <Typography.Title3 className="mt-8 text-charcoal">
        What type of Practice Area are you looking for?
      </Typography.Title3>
      <Typography.Paragraph3 className="my-5 text-grey-dark">
        Select one practice area
      </Typography.Paragraph3>

      <div className="flex min-w-fit flex-wrap gap-10">
        {copData.map((cop) => {
          return (
            <div
              key={cop.id}
              className="flex min-w-80 flex-col rounded-lg px-5 py-6 shadow-lg"
            >
              <div className="ml-auto flex size-16 items-center justify-center rounded-full bg-[#EFF3FF] text-blue-dark">
                <cop.icon strokeWidth="0.2" height="25" aria-hidden="true" />
              </div>
              <Typography.Title5 className="mt-10 text-charcoal">
                {cop.title}
              </Typography.Title5>
              <Typography.Paragraph5 className="mt-2 text-grey-dark">
                {cop.subtitle}
              </Typography.Paragraph5>
            </div>
          );
        })}
      </div>

      <QualifierNav addClass="justify-right">
        <Button
          size="lg"
          length="long"
          color="primary"
          onClick={() => {
            navigate("../2", { relative: "path" });
          }}
        >
          Next
        </Button>
      </QualifierNav>
    </>
  );
}

export { QualifierPage1 };
