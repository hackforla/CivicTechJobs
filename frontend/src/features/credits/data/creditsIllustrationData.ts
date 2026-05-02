/**
 * Attribution data for illustrations used across the site
 * (credits page).
 *
 * Same shape as `creditsIconData.ts`, but for the larger
 * illustration assets rather than icons. Update this file
 * whenever a new illustration is introduced; the credits page
 * reads from this list to render its illustration grid.
 */

import CreditsPageHighFive from "@/shared/images/credits-page-high-five.svg";
import LandingPageCreativeTeam from "@/shared/images/landing-page-creative-team.svg";
import LoginIllustration from "@/shared/images/login-illustration.svg";
import NotFoundPageImg from "@/shared/images/not-found-page.svg";
import PrivacyPolicyIllustration from "@/shared/images/privacy-policy-illustration.svg";

import type React from "react";

export interface AssetDatum {
  id: number;
  Image: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  usedIn: string;
  provider: string;
  link: string;
}

export const illustrationData: AssetDatum[] = [
  {
    id: 8,
    Image: CreditsPageHighFive,
    name: "High Five",
    usedIn: "Credits",
    provider: "Storyset",
    link: "https://storyset.com/illustration/high-five/pana",
  },
  {
    id: 9,
    Image: LandingPageCreativeTeam,
    name: "Creative Team",
    usedIn: "Landing",
    provider: "Storyset",
    link: "https://storyset.com/illustration/creative-team/pana",
  },
  {
    id: 10,
    Image: LoginIllustration,
    name: "Team Work",
    usedIn: "Login",
    provider: "Storyset",
    link: "https://storyset.com/illustration/team-work/pana",
  },
  {
    id: 11,
    Image: NotFoundPageImg,
    name: "404 Error",
    usedIn: "404 Page",
    provider: "Storyset",
    link: "https://storyset.com/illustration/404-error-with-a-tired-person/pana",
  },
  {
    id: 12,
    Image: PrivacyPolicyIllustration,
    name: "Privacy Policy",
    usedIn: "Privacy",
    provider: "Storyset",
    link: "https://storyset.com/illustration/privacy-policy/pana",
  },
];
