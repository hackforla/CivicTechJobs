// data that will be used for credits page
import { useId } from "react";
import {
  icongraphyMenu,
  icongraphyCross,
  icongraphyArrowDown
} from "assets/images/images";

type UrlString = string;
type UrlObject = URL;
type Url = UrlString | UrlObject;

interface iconDatum {
  id: string;
  image: SVGAElement;
  name: string;
  usedIn: string;
  provider: string;
  link: Url;
}

const iconData: iconDatum[] = [
// const iconData = [
  {
    id: useId(),
    image: icongraphyMenu,
    name: "Menu line",
    usedIn: "Multiple pages",
    provider: "Majesticons",
    link: "",
  },
  {
    id: useId(),
    image: icongraphyCross,
    name: "Cross line",
    usedIn: "Multiple pages",
    provider: "Majesticons",
    link: "",
  },
  {
    id: useId(),
    image: icongraphyArrowDown,
    name: "Arrow down line",
    usedIn: "How to Join",
    provider: "Majesticons",
    link: "",
  }
];

export {iconData}