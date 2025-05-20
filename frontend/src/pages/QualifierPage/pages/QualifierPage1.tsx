// External Imports
import React from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

// Internal Imports
import { copDatum } from "api_data/copData";
import Typography from "tw-components/Typography";
import { Button } from "tw-components";
import { QualifierNav } from "../components/QualifierNav";
import { IconCheckMark } from "assets/images/images";
import { useQualifiersContext } from "context/QualifiersContext";

function QualifierPage1() {
  const navigate = useNavigate();
  const { copData, qualifiers, updateQualifiers } = useQualifiersContext();

  const handleSelectCOP = (
    e: React.MouseEvent<HTMLDivElement>,
    cop: copDatum,
  ) => {
    e.stopPropagation();

    const newQualifiers = {
      ...qualifiers,
      selectedCOP: cop.title,
    };
    updateQualifiers(newQualifiers);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-between px-5 pb-10">
        <Typography.Title2 className="mt-8 text-charcoal">
          What type of Practice Area are you looking for?
        </Typography.Title2>
        <Typography.Paragraph3 className="my-5 text-grey-dark">
          Select one practice area
        </Typography.Paragraph3>
        {/* COP Cards */}
        <div className="w-4/5">
          <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {copData.map((cop) => {
              const isSelected = qualifiers.selectedCOP === cop.title;

              return (
                <div
                  key={cop.id}
                  className={clsx(
                    "flex min-w-60 flex-col rounded-lg border px-5 py-6 shadow-[0_5px_15px_#00000026] hover:cursor-pointer hover:border-blue-dark",
                    isSelected
                      ? "border-blue-dark bg-[#EDF2FF]"
                      : "border-transparent",
                  )}
                  onClick={(e) => handleSelectCOP(e, cop)}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className={clsx(
                      "ml-auto flex size-12 items-center justify-center rounded-full  text-blue-dark",
                      isSelected ? "bg-white" : "bg-[#EFF3FF]",
                    )}
                  >
                    <cop.icon
                      strokeWidth="0.2"
                      height="25"
                      aria-hidden="true"
                    />
                  </div>
                  <Typography.Title3 className="mt-10 text-charcoal">
                    {cop.title}
                  </Typography.Title3>
                  <Typography.Paragraph5 className="mt-2 text-grey-dark">
                    {cop.subtitle}
                  </Typography.Paragraph5>
                </div>
              );
            })}
          </div>
          <QualifierNav
            className={`mt-20 justify-between ${
              !qualifiers.selectedCOP && "hidden"
            }`}
          >
            <div className="ml-4 flex items-center">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-dark">
                <IconCheckMark height="12" width="12" aria-hidden="true" />
              </div>
              <Typography.Paragraph3 className="ml-2 font-bold text-charcoal">
                Practice Area: Complete
              </Typography.Paragraph3>
            </div>
            <Button
              size="medium"
              onClick={() => {
                navigate("../2", { relative: "path" });
              }}
            >
              Continue
            </Button>
          </QualifierNav>
        </div>
      </div>
    </>
  );
}

export { QualifierPage1 };
