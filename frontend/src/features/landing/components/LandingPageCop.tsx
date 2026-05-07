"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/shared/components/Buttons";
import { CircleCard } from "@/shared/components/CircleCard";
import Dialog from "@/shared/components/Dialog";
import Typography from "@/shared/components/Typography";
import { CopCard, InnerCopCard, InnerCopNavCard } from "./LandingPageCopCards";
import {
  type copDatum,
  fetchAllCopData,
  fetchCopDataById,
} from "@/shared/data/copData";

function LandingPageCop() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copData, setCopData] = useState<copDatum[]>([]);
  const [currentDatum, setCurrentDatum] = useState<copDatum | null>(null);

  useEffect(() => {
    setCopData(fetchAllCopData());
  }, []);

  function handleCopData(id: number) {
    const datum = fetchCopDataById(id);
    if (datum) setCurrentDatum(datum);
  }

  return (
    <div className="flex-container align-center justify-center py-5">
      <h2 className="col-12 my-8 text-center text-4xl font-bold leading-normal">
        Communities of Practice (COP)
      </h2>
      <div className="row paragraph-1 mb-5 max-w-[800px] text-center">
        A Community of Practice (CoP) is a group of volunteers who share a
        common interest in a topic and meet regularly to fulfill both individual
        and group goals. We use CoPs to share effective practices and relevant
        domain knowledge to help our members grow.
      </div>
      <div className="m-10 box-border flex flex-wrap justify-evenly">
        {copData.map((cop) => (
          <CircleCard
            key={cop.id}
            size="lg"
            className="m-8"
            onClick={() => {
              handleCopData(cop.id);
              setIsDialogOpen(true);
            }}
            role="button"
          >
            <div className="flex-column">
              <div className="row justify-center pb-6">
                <cop.icon strokeWidth="0.2" height="65" aria-hidden="true" />
              </div>
              <div className="text-center text-blue-dark">
                <Typography.Title4>{cop.title}</Typography.Title4>
              </div>
            </div>
          </CircleCard>
        ))}
      </div>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        className="flex flex-col items-center justify-center"
        ariaLabel="Communities of Practice (COP)"
      >
        <CopCard
          isHidden={false}
          size="lg"
          onClick={() => setIsDialogOpen(false)}
        >
          <div className="flex-container">
            <nav className="flex-column col-3 gap-y-8">
              {copData.map((cop) => {
                const isActive = cop.id === currentDatum?.id;
                return (
                  <InnerCopNavCard
                    key={cop.id}
                    isActive={isActive}
                    onClick={() => handleCopData(cop.id)}
                    className="flex-container align-center justify-center p-2"
                  >
                    <div className="pr-2">
                      <cop.icon
                        fill={isActive ? "white" : "black"}
                        stroke={isActive ? "white" : "black"}
                        strokeWidth="0.2"
                        height="24"
                        width="24"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="title-6">{cop.title}</span>
                  </InnerCopNavCard>
                );
              })}
            </nav>
            <div className="col-9 ml-4">
              <InnerCopCard>
                <div>
                  <div className="title-3 flex-container pb-4 align-bottom">
                    <div className="pr-4">
                      {currentDatum?.icon && (
                        <currentDatum.icon
                          fill="black"
                          stroke="black"
                          strokeWidth="0.2"
                          height="50"
                          width="50"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    {currentDatum?.title} CoP
                  </div>
                  {currentDatum?.description}
                </div>
                <div>
                  <div className="inline-block">
                    <Button size="medium-long" href="/qualifier/1">
                      Join Us
                    </Button>
                  </div>
                </div>
              </InnerCopCard>
            </div>
          </div>
        </CopCard>
      </Dialog>
    </div>
  );
}

export { LandingPageCop };
