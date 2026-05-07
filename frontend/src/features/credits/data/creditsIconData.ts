import type React from "react";

import IconArrowDown from "@/shared/icons/icon-arrow-down.svg";
import IconArrowLeft from "@/shared/icons/icon-arrow-left.svg";
import IconCheckMarkDark from "@/shared/icons/icon-checkmark-dark.svg";
import IconDropdownDown from "@/shared/icons/icon-dropdown-down.svg";
import IconDropdownUp from "@/shared/icons/icon-dropdown-up.svg";
import IconHamburgerMenu from "@/shared/icons/icon-hamburger-menu.svg";
import IconPlus from "@/shared/icons/icon-plus.svg";
import IconSearch from "@/shared/icons/icon-search.svg";
import IconX from "@/shared/icons/icon-x.svg";

export interface AssetDatum {
  id: number;
  Image: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  usedIn: string;
  provider: string;
  link: string;
}

export const iconData: AssetDatum[] = [
  {
    id: 1,
    Image: IconHamburgerMenu,
    name: "Menu line",
    usedIn: "Multiple pages",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 2,
    Image: IconX,
    name: "Cross line",
    usedIn: "Multiple pages",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 3,
    Image: IconArrowDown,
    name: "Arrow down line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 4,
    Image: IconArrowLeft,
    name: "Arrow left line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 5,
    Image: IconDropdownDown,
    name: "Chevron down",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 6,
    Image: IconDropdownUp,
    name: "Chevron up",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 9,
    Image: IconSearch,
    name: "Search line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 11,
    Image: IconCheckMarkDark,
    name: "Check line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
  {
    id: 13,
    Image: IconPlus,
    name: "Plus line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "https://www.majesticons.com/",
  },
];
