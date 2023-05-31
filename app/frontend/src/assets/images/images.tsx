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
import IconCheckMark from "./svgs/icons/icon-checkmark.svg";
import IconDropdownDown from "./svgs/icons/icon-dropdown-down.svg";
import IconDropdownUp from "./svgs/icons/icon-dropdown-up.svg";
import IconEyeClose from "./svgs/icons/icon-eye-close.svg";
import IconEyeOpen from "./svgs/icons/icon-eye-open.svg";
import IconHamburgerMenu from "./svgs/icons/icon-hamburger-menu.svg";
import IconPlus from "./svgs/icons/icon-plus.svg";
import IconSearch from "./svgs/icons/icon-search.svg";
import IconX from "./svgs/icons/icon-x.svg";

import iconArrowDown from "./svgs/icons/icon-arrow-down.svg?url";
import iconArrowLeft from "./svgs/icons/icon-arrow-left.svg?url";
import iconCheckboxY from "./svgs/icons/icon-checkbox-yes.svg?url";
import iconCheckboxN from "./svgs/icons/icon-checkbox-no.svg?url";
import iconCheckMark from "./svgs/icons/icon-checkmark.svg?url";
import iconCheckMarkDark from "./svgs/icons/icon-checkmark-dark.svg?url";
import iconDropdownDown from "./svgs/icons/icon-dropdown-down.svg?url";
import iconDropdownUp from "./svgs/icons/icon-dropdown-up.svg?url";
import iconEyeClose from "./svgs/icons/icon-eye-close.svg?url";
import iconEyeOpen from "./svgs/icons/icon-eye-open.svg?url";
import iconHamburgerMenu from "./svgs/icons/icon-hamburger-menu.svg?url";
import iconPlus from "./svgs/icons/icon-plus.svg?url";
import iconSearch from "./svgs/icons/icon-search.svg?url";
import iconX from "./svgs/icons/icon-x.svg?url";

// Group Background Image
import landingPageFg from "./svgs/landing-page-fg.svg?url";
import landingPageBg from "./svgs/landing-page-bg.svg?url";
import notFoundPageImg from "./svgs/not-found-page.svg?url";

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

// HfLA logo
import logoHfLA from "./svgs/logos/logo-hfla.svg?url";

// Credits Illustrations
import illustrationCreativeTeam from "./pngs/illustrations/creative-team.png";
import illustrationHighFive from "./pngs/illustrations/high-five.png";

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

/// COP Icons
const CopIconData = svgWrapper(CopIconDataP, {
  title: "Data Science Community of Practice Logo",
  desc: "icon representing the scatter plot and line graph",
});

const CopIconEngineering = svgWrapper(CopIconEngineeringP, {
  title: "Engineering Community of Practice Logo",
  desc: "an engineering icon that represents the terminal",
});

const CopIconOps = svgWrapper(CopIconOpsP, {
  title: "Ops Community of Practice Logo",
  desc: "an operations icon that represents a running operation being managed",
});

const CopIconProduct = svgWrapper(CopIconProductP, {
  title: "Product Management Community of Practice Logo",
  desc: "a product icon that represents a team communicating with each other",
});

const CopIconUiux = svgWrapper(CopIconUiuxP, {
  title: "UI/UX Community of Practice Logo",
  desc: "an icon for uiux representing a variety of ideas",
});

// CTJ Logos
const ctjLogoTitle = "Civic Tech Jobs Logo";

const LogoHorizontal = svgWrapper(LogoHorizontalP, {
  title: ctjLogoTitle,
  desc: "civic tech jobs horizontal logo",
});

const LogoHorizontalOnDark = svgWrapper(LogoHorizontalOnDarkP, {
  title: ctjLogoTitle,
  desc: "civic tech jobs logo and icon horizontal - white text on a transparent background",
});

const LogoMark = svgWrapper(LogoMarkP, {
  title: ctjLogoTitle,
  desc: "civic tech jobs logomark",
});

const LogoStacked = svgWrapper(LogoStackedP, {
  title: ctjLogoTitle,
  desc: "civic tech jobs logo and stacked platform name",
});

const LogoStackedOnDark = svgWrapper(LogoStackedOnDarkP, {
  title: ctjLogoTitle,
  desc: "civic tech jobs logo and icon column wise - white text on a transparent background",
});

const LogoType = svgWrapper(LogoTypeP, {
  title: ctjLogoTitle,
  desc: "civic tech jobs - the name of the platform typed out",
});

const LogoVertical = svgWrapper(LogoVerticalP, {
  title: ctjLogoTitle,
  desc: "logo and platform name - vertically aligned",
});

const LogoWordmark = svgWrapper(LogoWordmarkP, {
  title: ctjLogoTitle,
  desc: "platform name and logo with a word play",
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
  IconCheckMark,
  IconDropdownDown,
  IconDropdownUp,
  IconEyeClose,
  IconEyeOpen,
  IconHamburgerMenu,
  IconPlus,
  IconSearch,
  IconX,
  iconArrowDown,
  iconArrowLeft,
  iconCheckboxY,
  iconCheckboxN,
  iconCheckMark,
  iconCheckMarkDark,
  iconDropdownDown,
  iconDropdownUp,
  iconEyeClose,
  iconEyeOpen,
  iconHamburgerMenu,
  iconPlus,
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
  // HfLA logo
  logoHfLA,
  notFoundPageImg,
  // illustrations
  illustrationCreativeTeam,
  illustrationHighFive,
};
