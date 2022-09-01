// @ts-nocheck
import React, { useId } from "react";

// COP Icons
import CopIconDataP from "./svgs/communities-of-practice/cop-icon-datascience.svg";
import CopIconEngineeringP from "./svgs/communities-of-practice/cop-icon-engineering.svg";
import CopIconOpsP from "./svgs/communities-of-practice/cop-icon-ops.svg";
import CopIconProductP from "./svgs/communities-of-practice/cop-icon-product.svg";
import CopIconUiuxP from "./svgs/communities-of-practice/cop-icon-uiux.svg";

import copIconData from "./svgs/communities-of-practice/cop-icon-datascience.svg?url";
import copIconEngineering from "./svgs/communities-of-practice/cop-icon-engineering.svg?url";
import copIconOps from "./svgs/communities-of-practice/cop-icon-ops.svg?url";
import copIconProduct from "./svgs/communities-of-practice/cop-icon-product.svg?url";
import copIconUiux from "./svgs/communities-of-practice/cop-icon-uiux.svg?url";

// Icons
import IconArrowDown from "./svgs/icons/icon-arrow-down.svg";
import IconArrowLeft from "./svgs/icons/icon-arrow-left.svg";
import IconCheckboxY from "./svgs/icons/icon-checkbox-yes.svg";
import IconCheckboxN from "./svgs/icons/icon-checkbox-no.svg";
import IconDropdownDown from "./svgs/icons/icon-dropdown-down.svg";
import IconDropdownUp from "./svgs/icons/icon-dropdown-up.svg";
import IconEyeClose from "./svgs/icons/icon-eye-close.svg";
import IconEyeOpen from "./svgs/icons/icon-eye-open.svg";
import IconHamburgerMenu from "./svgs/icons/icon-hamburger-menu.svg";
import IconSearch from "./svgs/icons/icon-search.svg";
import IconX from "./svgs/icons/icon-x.svg";

import iconArrowDown from "./svgs/icons/icon-arrow-down.svg?url";
import iconArrowLeft from "./svgs/icons/icon-arrow-left.svg?url";
import iconCheckboxY from "./svgs/icons/icon-checkbox-yes.svg?url";
import iconCheckboxN from "./svgs/icons/icon-checkbox-no.svg?url";
import iconDropdownDown from "./svgs/icons/icon-dropdown-down.svg?url";
import iconDropdownUp from "./svgs/icons/icon-dropdown-up.svg?url";
import iconEyeClose from "./svgs/icons/icon-eye-close.svg?url";
import iconEyeOpen from "./svgs/icons/icon-eye-open.svg?url";
import iconHamburgerMenu from "./svgs/icons/icon-hamburger-menu.svg?url";
import iconSearch from "./svgs/icons/icon-search.svg?url";
import iconX from "./svgs/icons/icon-x.svg?url";

// Group Background Image
import landingPageFg from "./svgs/landing-page-fg.svg?url";
import landingPageBg from "./svgs/landing-page-bg.svg?url";

// CTJ Logos
import LogoHorizontalP from "./svgs/logos/logo-horizontal.svg";
import LogoHorizontalOnDarkP from "./svgs/logos/logo-horizontal-on-dark.svg";
import LogoMarkP from "./svgs/logos/logo-logomark.svg";
import LogoStackedP from "./svgs/logos/logo-stacked.svg";
import LogoStackedOnDarkP from "./svgs/logos/logo-stacked-on-dark.svg";
import LogoTypeP from "./svgs/logos/logo-logotype.svg";
import LogoVerticalP from "./svgs/logos/logo-vertical.svg";
import LogoWordmarkP from "./svgs/logos/logo-wordmark.svg";

import logoHorizontal from "./svgs/logos/logo-horizontal.svg?url";
import logoHorizontalOnDark from "./svgs/logos/logo-horizontal-on-dark.svg?url";
import logoMark from "./svgs/logos/logo-logomark.svg?url";
import logoStacked from "./svgs/logos/logo-stacked.svg?url";
import logoStackedOnDark from "./svgs/logos/logo-stacked-on-dark.svg?url";
import logoType from "./svgs/logos/logo-logotype.svg?url";
import logoVertical from "./svgs/logos/logo-vertical.svg?url";
import logoWordmark from "./svgs/logos/logo-wordmark.svg?url";

interface defaultProps {
  [attribute: string]: string;
}

function svgWrapper(
  Svg: React.ElementType,
  defaultProps: defaultProps
): React.ElementType {
  return (props) => {
    const titleId = useId();
    const descId = useId();

    if ("title" in defaultProps) {
      defaultProps["titleId"] = titleId;
    }

    if ("desc" in defaultProps) {
      defaultProps["descId"] = descId;
    }

    return <Svg {...defaultProps} {...props}></Svg>;
  };
}

// COP Icons
const CopIconData = svgWrapper(CopIconDataP, {
  title: "Data Science Community of Practice Logo",
  desc: "placeholder",
});

const CopIconEngineering = svgWrapper(CopIconEngineeringP, {
  title: "Engineering Community of Practice Logo",
});

const CopIconOps = svgWrapper(CopIconOpsP, {
  title: "Ops Community of Practice Logo",
});

const CopIconProduct = svgWrapper(CopIconProductP, {
  title: "Product Management Community of Practice Logo",
});

const CopIconUiux = svgWrapper(CopIconUiuxP, {
  title: "UI/UX Community of Practice Logo",
});

// CTJ Logos
const ctjLogoTitle = "Civic Tech Jobs Logo";

const LogoHorizontal = svgWrapper(LogoHorizontalP, {
  title: ctjLogoTitle,
});

const LogoHorizontalOnDark = svgWrapper(LogoHorizontalOnDarkP, {
  title: ctjLogoTitle,
});

const LogoMark = svgWrapper(LogoMarkP, {
  title: ctjLogoTitle,
});

const LogoStacked = svgWrapper(LogoStackedP, {
  title: ctjLogoTitle,
});

const LogoStackedOnDark = svgWrapper(LogoStackedOnDarkP, {
  title: ctjLogoTitle,
});

const LogoType = svgWrapper(LogoTypeP, {
  title: ctjLogoTitle,
});

const LogoVertical = svgWrapper(LogoVerticalP, {
  title: ctjLogoTitle,
});

const LogoWordmark = svgWrapper(LogoWordmarkP, {
  title: ctjLogoTitle,
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
  IconArrowDown,
  IconArrowLeft,
  IconCheckboxY,
  IconCheckboxN,
  IconDropdownDown,
  IconDropdownUp,
  IconEyeClose,
  IconEyeOpen,
  IconHamburgerMenu,
  IconSearch,
  IconX,
  iconArrowDown,
  iconArrowLeft,
  iconCheckboxY,
  iconCheckboxN,
  iconDropdownDown,
  iconDropdownUp,
  iconEyeClose,
  iconEyeOpen,
  iconHamburgerMenu,
  iconSearch,
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
