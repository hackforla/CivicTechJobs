// External Imports
import React from "react";

//Internal Imports
import "./_PrivacyPolicy.css";
import { privacyPolicyIllustration } from "assets/images/images";
import { privacyPageBg } from "assets/images/images";

const PrivacyPolicyPage = () => {
  //Tailwind Classes - unsure of best practice
  const domainName = "localhost:8000";

  return (
    <div className="flex flex-col justify-between" role="main">
      <div
        className="bg-no-repeat bg-bottom pb-24 bg-cover"
        style={{ backgroundImage: `url(${privacyPageBg})` }}
      >
        <div className="flex justify-center">
          <div className="w-4/5 mb-4">
            <div className="flex flex-row items-end">
              <div className="space-y-8">
                <h1 className="my-6 text-4xl font-bold text-grey-dark py-8">
                  Privacy Policy
                </h1>
                <p className="text-grey-dark">
                  We respect your privacy and recognize that we must maintain
                  and use your information responsibly.
                </p>
                <p className="text-grey-dark">
                  <a href="/" className="hyperlink">
                    civictechjobs.org
                  </a>{" "}
                  is an informational website managed by Hack for LA which is a
                  project of Code for America Labs, Inc. ("Code for America",
                  "we", "us", "our"). This Privacy Policy describes how we
                  collect, use, and protect your personal information on this
                  website. By submitting your personal information on our
                  websites, you agree to the terms in this Privacy Policy. If
                  you do not agree with these terms, please do not use our
                  websites.
                </p>
              </div>
              <img
                src={privacyPolicyIllustration}
                alt="Privacy Policiy Pana Illustration"
                className="float-right w-52 ml-24 hidden lg:block"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-12">
        <div className="w-4/5 mb-4 space-y-6">
          <h2 className="h2">Overview</h2>
          <ul className="bullets space-y-4">
            <li>
              We may collect information from you when you visit and take
              actions on our website. We use this information to provide the
              services you've requested.
            </li>
            <li>
              We utilize cookies (such as those stored by Google Analytics) to
              provide a better experiencce and improve our review tool website
              for your use.
            </li>
            <li>
              We will not knowingly disclose or sell your personal information
              to any third party, except as provided in this privacy policy.
            </li>
            <li>
              Protecting your personal information is extremely important to us,
              and we take all reasonable measures to do so.
            </li>
          </ul>
          <h2 className="h2">The personal information we collect</h2>
          <p className="p">
            Visiting{" "}
            <a href="/" className="hyperlink">
              civictechjobs.org
            </a>
          </p>
          <ul className="bullets">
            <li>
              We may automatically collect and store data about your visit to{" "}
              {domainName}
              <ul className="bullets">
                <li>Domain from which you access the Internet</li>
                <li>
                  Operating system on your computer and information about the
                  browser you used when visiting the site
                </li>
                <li>Date and time of your visit</li>
                <li>Pages you visited</li>
                <li>
                  Address of the website that connects you to the Site (such as
                  google.com or bing.com)
                </li>
                <li>The queries you make on our site </li>
              </ul>
            </li>
            <li>
              None of the information we collect about you when you visit{" "}
              {domainName} is personally identifiable.
            </li>
            <li>
              We use this non personally identifiable information to understand
              how the {domainName} website is used, to improve the website, and
              to monitor usage for security purposes.
            </li>
            <li>
              We will not collect personal information from you without your
              knowledge and consent, except in a few limited circumstances as
              described in this policy.
            </li>
          </ul>
          <h2 className="h2">E-mail Addresses</h2>
          <p className="p">
            E-mail addresses obtained through the web site will not be sold or
            given to private companies for marketing purposes. The information
            collected is subject to the access and confidentiality provisions of
            the Public Records Act, other applicable sections of the California
            code as well as federal laws. E-mail or other information requests
            sent to the City web site may be maintained in order to respond to
            the request, forward that request to the appropriate agency within
            the City, communicate updates to the City page that may be of
            interest to citizens, or to provide the City or Hack for LA with
            valuable customer feedback to assist in improving the site.
            Individuals can cancel any communications regarding new service
            updates at any time.
          </p>
          <h2 className="h2">Google Analytics</h2>
          <ul className="bullets">
            <li>
              We use Google Analytics to understand how visitors use our site
              and to gather aggregate performance metrics.
            </li>
            <li>
              We’ve set up Google Analytics so that it doesn’t collect your full
              IP address.
            </li>
            <li>
              We don’t collect any personally identifiable information using
              Google Analytics, and we do not combine the information collected
              through Google Analytics with any personally identifiable
              information.
            </li>
            <li>
              Google Analytics places a cookie on your web browser to identify
              you as a unique user. This cookie cannot be used by anyone but
              Google. Google's ability to use and share information collected by
              Google Analytics about your visits to this site is restricted by
              the{" "}
              <a
                href="http://www.google.com/analytics/terms/us.html"
                className="hyperlink"
              >
                Google Analytics Terms of Use
              </a>{" "}
              and the{" "}
              <a
                href="http://www.google.com/policies/privacy/"
                className="hyperlink"
              >
                Google Privacy Policy
              </a>
              .
            </li>
          </ul>
          <p className="p">
            To provide website visitors the ability to prevent their data from
            being used by Google Analytics, Google has developed the Google
            Analytics opt-out browser add-on for the Google Analytics JavaScript
            (ga.js, analytics.js, dc.js). This add-on instructs the Google
            Analytics JavaScript (ga.js, analytics.js, and dc.js) running on
            websites to prohibit sending information to Google Analytics.
            However, the Google Analytics opt-out browser add-on does not
            prevent data from being sent to the City’s site.
          </p>
          <p className="p">
            Visit{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout/"
              className="hyperlink"
            >
              https://tools.google.com/dlpage/gaoptout/
            </a>{" "}
            for more info on how to opt out.
          </p>
          <h2 className="h2">Cookies and other tracking technologies</h2>
          <ul className="bullets">
            <li>
              Cookies are small text files that websites place on the computers
              and mobile devices of people who visit those websites. Pixel tags
              (also called web beacons) are small blocks of code placed on
              websites and emails.
            </li>
            <li>
              We use cookies and other technologies like pixel tags to remember
              your preferences, enhance your online experience, and to gather
              data on how you use our Sites to improve the way we promote our
              content, programs, and events.
            </li>
            <li>
              Your use of our Sites indicates your consent to such use of
              Cookies.
            </li>
          </ul>
          <h3 className="h3">Third party service providers</h3>
          <p className="p">
            We use third-party service providers to track and analyze
            statistical usage and volume information from our Site users. These
            third-party service providers use persistent Cookies to help us to
            improve the user experience, manage the content on our Sites, and
            analyze how users navigate and use the Sites.
            <br></br> Third-party service providers we may use include{" "}
            <a href="https://analytics.google.com/" className="hyperlink">
              Google Analytics
            </a>
            ,{" "}
            <a href="https://mixpanel.com/" className="hyperlink">
              Mixpanel
            </a>
            ,{" "}
            <a href="https://www.hotjar.com/" className="hyperlink">
              Hotjar
            </a>
            .
          </p>
          <h3 className="h3">How to opt-out of the use of cookies</h3>
          <p className="p">
            Most browsers are initially set up to accept HTTP cookies. If you
            want to restrict or block the cookies that are set by our Site, or
            any other site, you can do so through your browser setting. The
            ‘Help’ function in your browser should explain how. Alternatively,
            you can visit{" "}
            <a href="http://www.aboutcookies.org" className="hyperlink">
              www.aboutcookies.org
            </a>
            , which contains comprehensive information on how to do this on a
            wide variety of browsers. You will find general information about
            cookies and details on how to delete cookies from your machine.
          </p>
          <h2 className="h2">As required by law and similar disclosures</h2>
          <ul className="bullets">
            <li>
              We may access, preserve, and disclose your information if we
              believe doing so is required or appropriate to:
              <ul className="bullets">
                <li>
                  comply with law enforcement requests and legal process, such
                  as a court order or subpoena;
                </li>
                <li>respond to your requests; or</li>
                <li>
                  protect your, our, or others’ rights, property, or safety.
                </li>
              </ul>
            </li>
            <li>
              For the avoidance of doubt, the disclosure of your information may
              occur if you post any objectionable content on or through the
              Site.
            </li>
          </ul>
          <h2 className="h2">Consent</h2>
          <ul className="bullets">
            <li>
              We may also disclose information from you or about you or your
              devices with your permission.
            </li>
          </ul>
          <h2 className="h2">Children's Privacy</h2>
          <ul className="bullets">
            <li>
              We do not knowingly collect, maintain, or use personal information
              from children under 13 years of age, and no part of our Site is
              directed to children.
            </li>
            <li>
              If you learn that a child has provided us with personal
              information in violation of this Privacy Policy, then you may
              alert us at{" "}
              <a
                href="mailto:privacy@hackforla.org?subject=HfLA%20TDM%20Calculator"
                className="hyperlink"
              >
                privacy@hackforla.org
              </a>{" "}
              and reference “Child Privacy Report" in the subject line.
            </li>
          </ul>
          <h2 className="h2">Security</h2>
          <ul className="bullets">
            <li>
              {domainName} utilizes Amazon Web Servcies (AWS). AWS operates
              "secure data networks" protected by industry standard firewalls
              and password protection systems. Only authorized individuals have
              access to the information provided by our users.
            </li>
            <li>
              We make reasonable efforts to protect your information by using
              physical and electronic safeguards designed to improve the
              security of the information we maintain. However, as our Services
              are hosted electronically, we make no guarantees as to the
              security or privacy of your information.
            </li>
          </ul>
          <h2 className="h2">Right to be forgotten and rectification</h2>
          <ul className="bullets">
            <li>
              You may request that we make corrections to any personal data that
              is stored on our internal databases at any time. You may request
              that incomplete data be completed or that incorrect data be
              corrected. Requests can be submitted to{" "}
              <a
                href="mailto:privacy@HackforLa.org?subject=HfLA%20TDM%20Calculator%20-%20Public%20Website"
                className="hyperlink"
              >
                privacy@HackforLA.org
              </a>{" "}
              and reference “{domainName} Public Website” in the subject line.
            </li>
          </ul>
          <h2 className="h2">Changes</h2>
          <p className="p">
            This {domainName} Privacy Policy is subject to change from time to
            time in response to, or as a result of changes in federal, state,
            and/or local law. Please check this page frequently for updates as
            your continued use of this site after any changes in this Privacy
            Policy will constitute your acceptance of the changes.
          </p>
          <h2 className="h2">Effective Date</h2>
          <p className="p">
            This version of the policy is effective October 1, 2020.
          </p>
          <h2 className="h2">Questions</h2>
          <p className="p">
            If you have any questions, comments, concerns, or complaints related
            to our Review Tool websites, please contact us by email at{" "}
            <a href="mailto:privacy@hackforla.org" className="hyperlink">
              privacy@hackforla.org
            </a>
            , or by mail at:
          </p>
          <p className="p">
            Code for America <br></br>Ref: Hack for LA, {domainName}
            <br></br>155 9th Street
            <br></br>San Francisco, CA 94103
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
