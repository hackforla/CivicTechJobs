// External Imports
import React, { Fragment } from "react";
import { useNavigate } from 'react-router-dom';

// Internal Imports
import { HeaderNav } from "components/components";
import { Button } from "components/components";
import { logoHorizontal, logoStacked, notFoundPageImg } from "assets/images/images";

function NotFoundPage() {
  const navigate = useNavigate();
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
      <main>
        <div className="not-found-container flex-container justify-between align-center gap-3">
          <div className="not-found-box">
            <h1 className="not-found-title mt-0 mb-3">Page not found</h1>
            <p className="not-found-paragraph mb-3">
              We can’t seem to find the page you’re looking for.
              Try going back to the previous page.
            </p>
            <Button
              length="long"
              size="lg"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
          <div>
            <img src={notFoundPageImg} alt="" />
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export { NotFoundPage };