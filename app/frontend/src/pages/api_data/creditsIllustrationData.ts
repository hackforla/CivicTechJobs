// data that will be used for credits page
import { useId } from "react";
import {
  illustrationTeamPage,
  illustrationOnboarding
} from "assets/images/images";

type UrlString = string;
type UrlObject = URL;
type Url = UrlString | UrlObject;

interface illustrationDatum {
  id: string;
  image: SVGAElement;
  name: string;
  usedIn: string;
  provider: string;
  link: Url;
}

const illustrationData: illustrationDatum[] = [
// const illustrationData = [
  {
    id: useId(),
    image: illustrationTeamPage,
    name: "Team Page",
    usedIn: "How to Join",
    provider: "Storyset",
    link: "",
  },
  {
    id: useId(),
    image: illustrationOnboarding,
    name: "Onboarding",
    usedIn: "How to Join",
    provider: "Storyset",
    link: "",
  }
];

export { illustrationData }