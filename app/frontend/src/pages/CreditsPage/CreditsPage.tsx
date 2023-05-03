// External Imports
import React, { Fragment, useState, useId } from "react";

// Internal Imports
import {
  logoHorizontal,
  logoStacked,
  logoHorizontalOnDark,
  logoStackedOnDark,
} from "assets/images/images";
import { HeaderNav, FooterNav, Button } from "components/components";
import { Card } from "components/Cards/StandardCard";
import { iconData } from "pages/api_data/creditsIconData";
import { illustrationData } from "pages/api_data/creditsIllustrationData";

const CreditsPage = () => {
  const [illustrations, setIllustrations] = useState(illustrationData);
  const [icons, setIcons] = useState(iconData);
  const [activeData, setActiveData] = useState(illustrations);

  function toggleToIcons() {
    setActiveData(icons);
  }

  function toggleToIllustrations() {
    setActiveData(illustrations);
  }
  // console.log(iconData);
  // let cardsData = [{
  //   id: useId(),
  //   image: '',
  //   name: "Team Page",
  //   usedIn: "How to Join",
  //   provider: "Storyset",
  //   link: "",
  // },
  // {
  //   id: useId(),
  //   image: '',
  //   name: "Onboarding",
  //   usedIn: "How to Join",
  //   provider: "Storyset",
  //   link: "",
  // }]
  return (
    <>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "/" },
          { name: "How to Join", link: "/qualifier/1" },
          { name: "Projects", link: "/demo" },
        ]}
      />
      <main>
        <div className="text-center credits-intro-container">
          <div className="text-container text-left">
            <h1 className="credits-intro-title mb-3">Credits</h1>
            <p className="paragraph-1 credits-intro-paragraph">
              Thank you to all of the artists and sponsors who help make our
              projects successful. Check out all of the illustrations and
              iconography we have used on our site.
            </p>
          </div>
        </div>
        <div className="main-container">
          <h3 className="credits-test">Illustrations & Iconography</h3>

          <div>
            <Button
              color="primary"
              size="md"
              length="long"
              onClick={toggleToIllustrations}
              addClass="mr-3"
            >
              Illustrations
            </Button>
            <Button size="md" length="long" onClick={toggleToIcons}>
              Iconography
            </Button>
          </div>

          <div className="grid">
            {activeData.map((cardData) => (
              <Card key={cardData.id} addClass="credit-card">
                <div>
                  <cardData.imgSrc className="credit-card-img" />
                  {/* <p>
                    Name: <span>{cardData.name}</span>
                  </p>
                  <p>
                    Used In: <span>{cardData.usedIn}</span>
                  </p>
                  <p>
                    Provider: <span>{cardData.provider}</span>
                  </p> */}
                  <div className="container mt-3">
                    <div className="column">
                      <div className="label">Name:</div>
                      <div className="label">Used In:</div>
                      <div className="label">Provider:</div>
                    </div>
                    <div className="column">
                      <div className="value">{cardData.name}</div>
                      <div className="value">{cardData.usedIn}</div>
                      <div className="value">{cardData.provider}</div>
                    </div>
                  </div>
                  <a href={cardData.link}>Learn more</a>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="credits-join-us-container"></div>
      </main>
      <FooterNav
        logoDesktop={logoHorizontalOnDark}
        logoMobile={logoStackedOnDark}
        menu={[
          { name: "Credits", link: "/" },
          { name: "Sitemap", link: "/" },
          { name: "Join Us", link: "/" },
        ]}
      />
    </>
  );
};
export { CreditsPage };
