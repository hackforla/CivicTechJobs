// data that will be used for credits page
import {
  illustrationTeamPageSvg,
  illustrationOnboardingSvg
} from "assets/images/images";

type UrlString = string;
type UrlObject = URL;
type Url = UrlString | UrlObject;

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
    imgSrc: illustrationOnboardingSvg,
    name: "Onboarding",
    usedIn: "How to Join",
    provider: "Storyset",
    link: "",
  }
];

export { illustrationData }