// External Imports
import React, { Fragment, useState } from "react";

// Internal Imports
import {
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
  logoHfLA,
} from "assets/images/images";
import { HeaderNav, FooterNav, Chip } from "components/components";
import { Card } from "components/Cards/StandardCard";
import { iconData } from "pages/api_data/creditsIconData";
import { illustrationData } from "pages/api_data/creditsIllustrationData";

const CreditsPage = () => {
  const [activeData, setActiveData] = useState(illustrationData);
  const [activeChip, setActiveChip] = useState("illustrations");
  const [imgSize, setImgSize] = useState("");

  const handleClickChipIllustration = () => {
    setActiveChip("illustrations");
    setActiveData(illustrationData);
    setImgSize("");
  };

  const handleClickChipIcon = () => {
    setActiveData(iconData);
    setActiveChip("icons");
    setImgSize("28px");
  };

  return (
    <>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "https://www.hackforla.org/" },
          {
            name: "How to Join",
            link: "https://www.hackforla.org/getting-started",
          },
          { name: "Projects", link: "https://www.hackforla.org/projects/" },
        ]}
      />
      <main>
        <section className="credits-body-container">
          <div className="credits-main-container">
            <div className="credits-text-container">
              <h1 className="credits-intro-title mt-0 mb-3">Credits</h1>
              <p className="paragraph-1 credits-intro-paragraph">
                Thank you to all of the artists and sponsors who help make our
                projects successful. Check out all of the illustrations and
                iconography we have used on our site.
              </p>
            </div>

            <div className="pt-5 mt-5">
              <h2>Illustrations & Iconography</h2>
              <div>
                <Chip
                  variant="single"
                  addClass={"mr-3 px-3"}
                  checked={activeChip === "illustrations" && true}
                  onClick={handleClickChipIllustration}
                  value="Illustrations"
                />
                <Chip
                  variant="single"
                  addClass="px-3"
                  checked={activeChip === "icons" && true}
                  onClick={handleClickChipIcon}
                  value="Icongraphy"
                />
              </div>
            </div>

            <div className="flex-container justify-start gap-5 mt-5 credits-card-container">
              {activeData.map((cardData) => (
                <Card key={cardData.id} addClass="col-4 credits-card">
                  <div>
                    <div
                      className={`credits-image-frame flex-container justify-center align-center ${
                        activeChip === "illustrations"
                          ? "credits-illustration-bg"
                          : "credits-icon-bg"
                      }`}
                    >
                      <img
                        src={cardData.imgSrc}
                        style={{ width: imgSize }}
                        alt={`${cardData.name}`}
                      />
                    </div>
                    <div className="flex-container mt-3 mb-5">
                      <div className="flex-column mr-2">
                        <div className="title-6">Name:</div>
                        <div className="title-6">Used In:</div>
                        <div className="title-6">Provider:</div>
                      </div>
                      <div className="flex-column">
                        <div className="paragraph-3">{cardData.name}</div>
                        <div className="paragraph-3">{cardData.usedIn}</div>
                        <div className="paragraph-3">{cardData.provider}</div>
                      </div>
                    </div>
                    <a className="links" href={cardData.link}>
                      Learn more
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="credits-join-us-section">
          <div className="credits-join-us-content-container flex-container justify-center align-center">
            <img
              className="flex-column mr-3"
              src={logoHfLA}
              alt="Hack for LA logo"
            />
            <div className="flex-column credits-join-us-text">
              <h3>Join us!</h3>
              <p>
                Civic Tech Jobs is one of the many projects at{" "}
                <a className="links" href="https://www.hackforla.org/">
                  Hack for LA
                </a>
                , <br></br>Code for America's Los Angeles chapter.
              </p>
            </div>
          </div>
        </section>
      </main>
      <FooterNav
        logoDesktop={logoHorizontalOnDark}
        logoMobile={logoStackedOnDark}
        menu={[
          { name: "Credits", link: "/credits" },
          { name: "Sitemap", link: "/" },
          { name: "Join Us", link: "/" },
        ]}
      />
    </>
  );
};
export { CreditsPage };
