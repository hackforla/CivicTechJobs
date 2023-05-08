// data that will be used for credits page
import {
  illustrationCreativeTeamSvg,
  illustrationDigitalPresentationSvg,
  illustrationHighFiveSvg,
  illustrationOnboardingSvg,
  illustrationSelectSvg,
  illustrationSignUpSvg,
  illustrationTeamPageSvg,
  illustrationTeamSpiritSvg,
  illustrationTeamWorkSvg
} from "assets/images/images";

interface illustrationDatum {
  id: number;
  imgSrc: React.ElementType;
  name: string;
  usedIn: string;
  provider: string;
  link: string;
}

const illustrationData: illustrationDatum[] = [
// const illustrationData = [
  {
    id: 1,
    imgSrc: illustrationTeamPageSvg,
    name: "Team Page",
    usedIn: "How to Join",
    provider: "Storyset",
    link: "https://storyset.com/illustration/team-page/pana",
  },
  {
    id: 2,
    imgSrc: illustrationOnboardingSvg,
    name: "Onboarding",
    usedIn: "How to Join",
    provider: "Storyset",
    link: "https://storyset.com/illustration/onboarding/pana",
  },
  {
    id: 3,
    imgSrc: illustrationDigitalPresentationSvg,
    name: "Digital Presentation",
    usedIn: "How to Join",
    provider: "Storyset",
    link: "",
  },
  {
    id: 4,
    imgSrc: illustrationSelectSvg,
    name: "Select",
    usedIn: "How to Join",
    provider: "Storyset",
    link: "",
  },
  {
    id: 5,
    imgSrc: illustrationTeamSpiritSvg,
    name: "Team Spirit",
    usedIn: "How to Join",
    provider: "Storyset",
    link: "",
  },
  {
    id: 6,
    imgSrc: illustrationSignUpSvg,
    name: "Sign Up",
    usedIn: "How to Join",
    provider: "Storyset",
    link: "",
  },
  {
    id: 7,
    imgSrc: illustrationTeamWorkSvg,
    name: "Team Work",
    usedIn: "Login",
    provider: "Storyset",
    link: "",
  },
  {
    id: 8,
    imgSrc: illustrationHighFiveSvg,
    name: "High Five",
    usedIn: "Credits",
    provider: "Storyset",
    link: "",
  },
  {
    id: 9,
    imgSrc: illustrationCreativeTeamSvg,
    name: "Creative Team",
    usedIn: "Landing",
    provider: "Storyset",
    link: "",
  }
];

export { illustrationData }