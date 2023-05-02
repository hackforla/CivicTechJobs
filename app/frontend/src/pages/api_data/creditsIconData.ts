// data that will be used for credits page
import { useId } from "react";
import {
  iconMenuSvg,
  iconCrossSvg,
  iconArrowDownSvg
} from "assets/images/images";

type UrlString = string;
type UrlObject = URL;
type Url = UrlString | UrlObject;

interface iconDatum {
  id: number;
  imgSrc: React.ElementType;
  name: string;
  usedIn: string;
  provider: string;
  link: Url;
}

const iconData: iconDatum[] = [
// const iconData = [
  {
    id: 1,
    imgSrc: iconMenuSvg,
    name: "Menu line",
    usedIn: "Multiple pages",
    provider: "Majesticons",
    link: "",
  },
  {
    id: 2,
    imgSrc: iconCrossSvg,
    name: "Cross line",
    usedIn: "Multiple pages",
    provider: "Majesticons",
    link: "",
  },
  {
    id: 3,
    imgSrc: iconArrowDownSvg,
    name: "Arrow down line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "",
  }
];

export {iconData}