import { landingPageFg } from "assets/images/images";

interface creditsDatum {
  name: string;
  provider: string;
  url: string;
  src: any;
}

const illustrations = [
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
];

const iconography = [
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "High Five",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
  {
    name: "Creative Team",
    provider: "Storyset",
    url: "https://www.google.com",
    src: landingPageFg,
  },
];

// Note: Key is assumed to be the exact casing to be shown in the Chip components and lowercase when used in scss.
interface creditsData {
  [key: string]: creditsDatum[];
}

const credits: creditsData = {
  Illustrations: illustrations,
  Iconography: iconography,
};

export { credits, creditsDatum };
