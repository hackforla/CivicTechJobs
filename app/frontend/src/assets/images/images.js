import React from "react";

// COP Icons
import CopIconDataP from "./svgs/cop-icon-datascience.svg";
import CopIconEngineeringP from "./svgs/cop-icon-engineering.svg";
import CopIconOpsP from "./svgs/cop-icon-ops.svg";
import CopIconProductP from "./svgs/cop-icon-product.svg";
import CopIconUiuxP from "./svgs/cop-icon-uiux.svg";

import copIconData from "./svgs/cop-icon-datascience.svg?url";
import copIconEngineering from "./svgs/cop-icon-engineering.svg?url";
import copIconOps from "./svgs/cop-icon-ops.svg?url";
import copIconProduct from "./svgs/cop-icon-product.svg?url";
import copIconUiux from "./svgs/cop-icon-uiux.svg?url";

// Icons
import IconDownArrow from "./svgs/icon-down-arrow.svg";
import IconHamburgerMenu from "./svgs/icon-hamburger-menu.svg";
import IconX from "./svgs/icon-x.svg";

import iconDownArrow from "./svgs/icon-down-arrow.svg?url";
import iconHamburgerMenu from "./svgs/icon-hamburger-menu.svg?url";
import iconX from "./svgs/icon-x.svg?url";

// Group Background Image
import landingPageFg from "./svgs/landing-page-fg.svg?url";
import landingPageBg from "./svgs/landing-page-bg.svg?url";

// CTJ Logos
import LogoHorizontalP from "./svgs/logo-horizontal.svg";
import LogoHorizontalOnDarkP from "./svgs/logo-horizontal-on-dark.svg";
import LogoMarkP from "./svgs/logo-logomark.svg";
import LogoStackedP from "./svgs/logo-stacked.svg";
import LogoStackedOnDarkP from "./svgs/logo-stacked-on-dark.svg";
import LogoTypeP from "./svgs/logo-logotype.svg";
import LogoVerticalP from "./svgs/logo-vertical.svg";
import LogoWordmarkP from "./svgs/logo-wordmark.svg";

import logoHorizontal from "./svgs/logo-horizontal.svg?url";
import logoHorizontalOnDark from "./svgs/logo-horizontal-on-dark.svg?url";
import logoMark from "./svgs/logo-logomark.svg?url";
import logoStacked from "./svgs/logo-stacked.svg?url";
import logoStackedOnDark from "./svgs/logo-stacked-on-dark.svg?url";
import logoType from "./svgs/logo-logotype.svg?url";
import logoVertical from "./svgs/logo-vertical.svg?url";
import logoWordmark from "./svgs/logo-wordmark.svg?url";

/**
 * A wrapper that pre-adds certain attributes to svgs that does not need to be customized
 * @param {*} Svg an svg component as rendered by svgr
 * @param {*} defaultProps an object containing the attributes to add
 * @returns a wrapped component
 */
function svgWrapper(Svg, defaultProps) {
  return (props) => {
    return <Svg {...defaultProps} {...props}></Svg>;
  };
}

// COP Icons
const CopIconData = svgWrapper(CopIconDataP, {
  title: "Data Science Community of Practice Logo",
  titleId: "data-cop-logo",
});

const CopIconEngineering = svgWrapper(CopIconEngineeringP, {
  title: "Engineering Community of Practice Logo",
  titleId: "eng-cop-logo",
});

const CopIconOps = svgWrapper(CopIconOpsP, {
  title: "Ops Community of Practice Logo",
  titleId: "ops-cop-logo",
});

const CopIconProduct = svgWrapper(CopIconProductP, {
  title: "Product Management Community of Practice Logo",
  titleId: "prod-cop-logo",
});

const CopIconUiux = svgWrapper(CopIconUiuxP, {
  title: "UI/UX Community of Practice Logo",
  titleId: "uiux-cop-logo",
});

// CTJ Logos
const ctjLogoTitle = "Civic Tech Jobs Logo";

const LogoHorizontal = svgWrapper(LogoHorizontalP, {
  title: ctjLogoTitle,
  titleId: "ctj-logo-horizontal",
});

const LogoHorizontalOnDark = svgWrapper(LogoHorizontalOnDarkP, {
  title: ctjLogoTitle,
  titleId: "ctj-logo-horizontal-dark",
});

const LogoMark = svgWrapper(LogoMarkP, {
  title: ctjLogoTitle,
  titleId: "ctj-logo-mark",
});

const LogoStacked = svgWrapper(LogoStackedP, {
  title: ctjLogoTitle,
  titleId: "ctj-logo-stacked",
});

const LogoStackedOnDark = svgWrapper(LogoStackedOnDarkP, {
  title: ctjLogoTitle,
  titleId: "ctj-logo-stacked-dark",
});

const LogoType = svgWrapper(LogoTypeP, {
  title: ctjLogoTitle,
  titleId: "ctj-logo-type",
});

const LogoVertical = svgWrapper(LogoVerticalP, {
  title: ctjLogoTitle,
  titleId: "ctj-logo-vertical",
});

const LogoWordmark = svgWrapper(LogoWordmarkP, {
  title: ctjLogoTitle,
  titleId: "ctj-logo-workmark",
});

export {
  // COP Icons
  CopIconData,
  CopIconEngineering,
  CopIconOps,
  CopIconProduct,
  CopIconUiux,
  copIconData,
  copIconEngineering,
  copIconOps,
  copIconProduct,
  copIconUiux,
  // Icons
  IconDownArrow,
  IconHamburgerMenu,
  IconX,
  iconDownArrow,
  iconHamburgerMenu,
  iconX,
  // CTJ Logos
  LogoHorizontal,
  LogoHorizontalOnDark,
  LogoMark,
  LogoStacked,
  LogoStackedOnDark,
  LogoType,
  LogoVertical,
  LogoWordmark,
  logoHorizontal,
  logoHorizontalOnDark,
  logoMark,
  logoStacked,
  logoStackedOnDark,
  logoType,
  logoVertical,
  logoWordmark,
  // Group Background Image
  landingPageFg,
  landingPageBg,
};
