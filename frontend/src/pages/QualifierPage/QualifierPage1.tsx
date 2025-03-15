// External Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

// Internal Imports
import { copDatum, fetchAllCopData } from "api_data/copData";
import Typography from "tw-components/Typography";
import { Button } from "components/components";
import { QualifierNav } from "./QualifierComponents";

function QualifierPage1() {
  const navigate = useNavigate();
  const [copData, setCopData] = useState<copDatum[]>([] as copDatum[]);
  const [selectedCOP, setSelectedCOP] = useState(null);

  useEffect(() => {
    setCopData(fetchAllCopData());
  }, []);

  const handleSelectCOP = (e, cop) => {
    e.stopPropagation();
    setSelectedCOP(cop.id);
  };

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
          const isSelected = selectedCOP === cop.id;

          return (
            <div
              key={cop.id}
              className={clsx(
                "flex min-w-80 flex-col rounded-lg border px-5 py-6 shadow-[0_5px_15px_#00000026] hover:cursor-pointer hover:border-blue-dark",
                isSelected
                  ? "border-blue-dark bg-[#EDF2FF]"
                  : "border-transparent",
              )}
              onClick={(e) => handleSelectCOP(e, cop)}
            >
              <div
                className={clsx(
                  "ml-auto flex size-16 items-center justify-center rounded-full  text-blue-dark",
                  isSelected ? "bg-white" : "bg-[#EFF3FF]",
                )}
              >
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
