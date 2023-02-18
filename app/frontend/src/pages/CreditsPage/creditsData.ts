import {
  iconArrowDown,
  iconArrowLeft,
  iconCheckMark,
  iconHamburgerMenu,
  iconPlus,
  iconSearch,
  iconX,
  landingPageFg,
} from "assets/images/images";

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
    name: "Menu Line",
    provider: "Majesticons",
    url: "https://www.google.com",
    src: iconHamburgerMenu,
  },
  {
    name: "Cross line",
    provider: "Majesticons",
    url: "https://www.google.com",
    src: iconX,
  },
  {
    name: "Arrow down line",
    provider: "Majesticons",
    url: "https://www.google.com",
    src: iconArrowDown,
  },
  {
    name: "Arrow left line",
    provider: "Majesticons",
    url: "https://www.google.com",
    src: iconArrowLeft,
  },
  {
    name: "Search line",
    provider: "Majesticons",
    url: "https://www.google.com",
    src: iconSearch,
  },
  {
    name: "Check line",
    provider: "Majesticons",
    url: "https://www.google.com",
    src: iconCheckMark,
  },
  {
    name: "Plus line",
    provider: "Majesticons",
    url: "https://www.google.com",
    src: iconPlus,
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
