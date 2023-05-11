// data that will be used for credits page
import {
  // illustrationCreativeTeamSvg,
  // illustrationDigitalPresentationSvg,
  // illustrationHighFiveSvg,
  // illustrationOnboardingSvg,
  // illustrationSelectSvg,
  // illustrationSignUpSvg,
  // illustrationTeamPageSvg,
  // illustrationTeamSpiritSvg,
  // illustrationTeamWorkSvg,
  illustrationCreativeTeam,
  illustrationHighFive
} from "assets/images/images";

interface illustrationDatum {
  id: number;
  imgSrc: string;
  name: string;
  usedIn: string;
  provider: string;
  link: string;
}

const illustrationData: illustrationDatum[] = [
  // {
  //   id: 1,
  //   imgSrc: illustrationTeamPageSvg,
  //   name: "Team Page",
  //   usedIn: "How to Join",
  //   provider: "Storyset",
  //   link: "https://storyset.com/illustration/team-page/pana",
  // },
  // {
  //   id: 2,
  //   imgSrc: illustrationOnboardingSvg,
  //   name: "Onboarding",
  //   usedIn: "How to Join",
  //   provider: "Storyset",
  //   link: "https://storyset.com/illustration/onboarding/pana",
  // },
  // {
  //   id: 3,
  //   imgSrc: illustrationDigitalPresentationSvg,
  //   name: "Digital Presentation",
  //   usedIn: "How to Join",
  //   provider: "Storyset",
  //   link: "https://storyset.com/",
  // },
  // {
  //   id: 4,
  //   imgSrc: illustrationSelectSvg,
  //   name: "Select",
  //   usedIn: "How to Join",
  //   provider: "Storyset",
  //   link: "https://storyset.com/illustration/select/pana",
  // },
  // {
  //   id: 5,
  //   imgSrc: illustrationTeamSpiritSvg,
  //   name: "Team Spirit",
  //   usedIn: "How to Join",
  //   provider: "Storyset",
  //   link: "https://storyset.com/illustration/team-spirit/pana",
  // },
  // {
  //   id: 6,
  //   imgSrc: illustrationSignUpSvg,
  //   name: "Sign Up",
  //   usedIn: "How to Join",
  //   provider: "Storyset",
  //   link: "https://www.freepik.com/free-vector/sign-up-concept-illustration_20602852.htm#query=signup&position=17&from_view=search&track=sph",
  // },
  // {
  //   id: 7,
  //   imgSrc: illustrationTeamWorkSvg,
  //   name: "Team Work",
  //   usedIn: "Login",
  //   provider: "Storyset",
  //   link: "https://storyset.com/illustration/team-work/pana",
  // },
  {
    id: 8,
    imgSrc: illustrationHighFive,
    name: "High Five",
    usedIn: "Credits",
    provider: "Storyset",
    link: "https://storyset.com/illustration/high-five/pana",
  },
  {
    id: 9,
    imgSrc: illustrationCreativeTeam,
    name: "Creative Team",
    usedIn: "Landing",
    provider: "Storyset",
    link: "https://storyset.com/illustration/creative-team/pana",
  },
];

export { illustrationDatum, illustrationData };
