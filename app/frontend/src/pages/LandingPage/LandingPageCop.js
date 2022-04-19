import React, { useState, useEffect } from "react";

import {
  Button,
  CircleCard,
  CopCard,
  Dialog,
  InnerCopCard,
  InnerCopNavCard,
} from "components/components";
import { fetchAllCopData, fetchCopDataById } from "./copData";

function LandingPageCop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copData, setCopData] = useState([]);
  const [currentDatum, setCurrentDatum] = useState({});

  useEffect(() => {
    setCopData(fetchAllCopData());
  }, []);

  function handleCopData(id) {
    const copDatum = fetchCopDataById(id);
    setCurrentDatum(copDatum);
  }

  return (
    <div className="flex-container align-center justify-center my-5">
      <div className="title-2 col-12 text-center my-4">
        Communities of Practice (COP)
      </div>
      <div className="row paragraph-1 text-center mb-5 landing-cop-description">
        A Community of Practice (CoP) is a group of volunteers who share a
        common interest in a topic and meet regularly to fulfill both individual
        and group goals. We use CoPs to share effective practices and relevant
        domain knowledge to help our members grow.
      </div>
      <div className="row m-5 landing-cop-circle-container">
        {copData.map((cop) => {
          return (
            <CircleCard
              key={cop.id}
              size="lg"
              addClass="m-4"
              onClick={() => {
                handleCopData(cop.id);
                setIsModalOpen(true);
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="pb-3 row justify-center">
                  <cop.icon strokeWidth="0.2" height="65" />
                </div>
                <div className="title-4 landing-cop-circle-title text-center">
                  {cop.title}
                </div>
              </div>
            </CircleCard>
          );
        })}
      </div>
      <Dialog open={isModalOpen}>
        <CopCard hidden={false} size="lg" onClick={() => setIsModalOpen(false)}>
          <div className="flex-container">
            <div className="col-3">
              <nav className="landing-inner-cop-nav">
                {copData.map((cop) => {
                  const isActive = cop.id == currentDatum.id;
                  return (
                    <InnerCopNavCard
                      key={cop.id}
                      isActive={isActive}
                      onClick={() => handleCopData(cop.id)}
                      addClass="landing-inner-cop-nav-card justify-center align-center p-1"
                    >
                      <div className="flex-container justify-center pr-1">
                        <cop.icon
                          fill={isActive ? "white" : "black"}
                          stroke={isActive ? "white" : "black"}
                          strokeWidth="0.2"
                          height="24"
                          width="24"
                        />
                      </div>
                      <span className="title-6 landing-cop-nav-title">
                        {cop.title}
                      </span>
                    </InnerCopNavCard>
                  );
                })}
              </nav>
            </div>
            <div className="col-9 ml-2">
              <InnerCopCard>
                <div className="landing-inner-cop-card-content flex-container">
                  <div>
                    <div className="title-3 flex-container pb-4 align-bottom">
                      <div className="pr-2">
                        {currentDatum.icon && (
                          <currentDatum.icon
                            fill="black"
                            stroke="black"
                            strokeWidth="0.2"
                            height="50"
                            width="50"
                          />
                        )}
                      </div>
                      {currentDatum.title} CoP
                    </div>
                    {currentDatum.description}
                  </div>
                  <div>
                    <Button color="primary" size="md" length="long">
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
