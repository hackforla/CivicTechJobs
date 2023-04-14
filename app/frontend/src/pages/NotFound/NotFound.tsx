import React, { Fragment } from "react";

import { HeaderNav } from "components/components";
import { FooterNav } from "components/components";
import { Button } from "components/components";

import { logoHorizontal, logoStacked, logoHorizontalOnDark, logoStackedOnDark, notFoundPageImg } from "assets/images/images";

function NotFound() {
  return (
    <Fragment>
      <HeaderNav
        logoDesktop={logoHorizontal}
        logoMobile={logoStacked}
        menu={[
          { name: "Hack for LA", link: "/" },
          { name: "How to Join", link: "/qualifier/1" },
          { name: "Projects", link: "/demo" },
        ]}
      />
      <main className="my-6">
        <div className="flex-container align-center" style={{justifyContent: "space-around"}}>
          <div className="col-3">
            <h1 className="mt-0 mb-3">Page not found</h1>
            <p className="mb-3">
              We can’t seem to find the page you’re looking for.
              Try going back to the previous page.
            </p>
            <Button
              length="long"
              size="lg"
              addClass="landing-intro-btn"
              href="https://www.google.com"
            >
              Go Back
            </Button>
          </div>
          <div className="col-3">
            <img src={notFoundPageImg} alt="404 Page Not Found" />
          </div>
        </div>
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
    </Fragment>
  );
}



export { NotFound };