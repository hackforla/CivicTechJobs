// data that will be used for credits page
import {
  iconArrowDown,
  iconArrowLeft,
  iconCheckMarkDark,
  iconDropdownDown,
  iconDropdownUp,
  iconHamburgerMenu,
  iconPlus,
  iconSearch,
  iconX,
  iconFilter,
  iconClipboard,
  iconCarouselDots,
  iconChevronLeft,
  iconChevronRight,
  iconMinus,
} from "assets/images/images";

interface iconDatum {
  id: number;
  imgSrc: string;
  name: string;
  usedIn: string;
  provider: string;
  link: string;
}

const iconData: iconDatum[] = [
  {
    id: 1,
    imgSrc: iconHamburgerMenu,
    name: "Menu line",
    usedIn: "Multiple pages",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 2,
    imgSrc: iconX,
    name: "Cross line",
    usedIn: "Multiple pages",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 3,
    imgSrc: iconArrowDown,
    name: "Arrow down line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 4,
    imgSrc: iconArrowLeft,
    name: "Arrow left line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 5,
    imgSrc: iconDropdownDown,
    name: "Chevron down",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 6,
    imgSrc: iconDropdownUp,
    name: "Chevron up",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 7,
    imgSrc: iconChevronLeft,
    name: "Chevron left",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 8,
    imgSrc: iconChevronRight,
    name: "Chevron right",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 9,
    imgSrc: iconSearch,
    name: "Search line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 10,
    imgSrc: iconCarouselDots,
    name: "Carousel dot",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 11,
    imgSrc: iconCheckMarkDark,
    name: "Check line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 12,
    imgSrc: iconMinus,
    name: "Minus line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 13,
    imgSrc: iconPlus,
    name: "Plus line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 14,
    imgSrc: iconClipboard,
    name: "Clipboard check",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 15,
    imgSrc: iconFilter,
    name: "Filter line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
];

export { iconDatum, iconData };
