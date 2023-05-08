// data that will be used for credits page
import {
  iconArrowDownSvg,
  iconArrowLeftSvg,
  iconCarouselSvg,
  iconCheckSvg,
  iconChevronDownSvg,
  iconChevronLeftSvg,
  iconChevronRightSvg,
  iconChevronUpSvg,
  iconClipboardSvg,
  iconCrossSvg,
  iconFilterSvg,
  iconMenuSvg,
  iconMinusSvg,
  iconPlusSvg,
  iconSearchSvg
} from "assets/images/images";

interface iconDatum {
  id: number;
  imgSrc: React.ElementType;
  name: string;
  usedIn: string;
  provider: string;
  link: string;
}

const iconData: iconDatum[] = [
  {
    id: 1,
    imgSrc: iconMenuSvg,
    name: "Menu line",
    usedIn: "Multiple pages",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 2,
    imgSrc: iconCrossSvg,
    name: "Cross line",
    usedIn: "Multiple pages",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 3,
    imgSrc: iconArrowDownSvg,
    name: "Arrow down line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 4,
    imgSrc: iconArrowLeftSvg,
    name: "Arrow left line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 5,
    imgSrc: iconChevronDownSvg,
    name: "Chevron down",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 6,
    imgSrc: iconChevronUpSvg,
    name: "Chevron up",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 7,
    imgSrc: iconChevronLeftSvg,
    name: "Chevron left",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 8,
    imgSrc: iconChevronRightSvg,
    name: "Chevron right",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 9,
    imgSrc: iconSearchSvg,
    name: "Search line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 10,
    imgSrc: iconCarouselSvg,
    name: "Carousel dot",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 11,
    imgSrc: iconCheckSvg,
    name: "Check line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 12,
    imgSrc: iconMinusSvg,
    name: "Minus line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 13,
    imgSrc: iconPlusSvg,
    name: "Plus line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 14,
    imgSrc: iconClipboardSvg,
    name: "Clipboard check",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 15,
    imgSrc: iconFilterSvg,
    name: "Filter line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  }
];

export {iconDatum, iconData}