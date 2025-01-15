import React, { useId } from "react";

// COP Icons
import CopIconDataP from "./svgs/communities-of-practice/cop-icon-datascience.svg?react";
import CopIconEngineeringP from "./svgs/communities-of-practice/cop-icon-engineering.svg?react";
import CopIconOpsP from "./svgs/communities-of-practice/cop-icon-ops.svg?react";
import CopIconProductP from "./svgs/communities-of-practice/cop-icon-product.svg?react";
import CopIconUiuxP from "./svgs/communities-of-practice/cop-icon-uiux.svg?react";

import copIconData from "./svgs/communities-of-practice/cop-icon-datascience.svg?url";
import copIconEngineering from "./svgs/communities-of-practice/cop-icon-engineering.svg?url";
import copIconOps from "./svgs/communities-of-practice/cop-icon-ops.svg?url";
import copIconProduct from "./svgs/communities-of-practice/cop-icon-product.svg?url";
import copIconUiux from "./svgs/communities-of-practice/cop-icon-uiux.svg?url";

// Icons
import IconArrowDown from "./svgs/icons/icon-arrow-down.svg?react";
import IconArrowLeft from "./svgs/icons/icon-arrow-left.svg?react";
import IconCheckboxY from "./svgs/icons/icon-checkbox-yes.svg?react";
import IconCheckboxN from "./svgs/icons/icon-checkbox-no.svg?react";
import IconCheckMark from "./svgs/icons/icon-checkmark.svg?react";
import IconDropdownDown from "./svgs/icons/icon-dropdown-down.svg?react";
import IconDropdownUp from "./svgs/icons/icon-dropdown-up.svg?react";
import IconEyeClose from "./svgs/icons/icon-eye-close.svg?react";
import IconEyeOpen from "./svgs/icons/icon-eye-open.svg?react";
import IconHamburgerMenu from "./svgs/icons/icon-hamburger-menu.svg?react";
import IconPlus from "./svgs/icons/icon-plus.svg?react";
import IconSearch from "./svgs/icons/icon-search.svg?react";
import IconX from "./svgs/icons/icon-x.svg?react";
import IconChevronLeft from "./svgs/icons/icon-chevron-left.svg?react";
import IconChevronRight from "./svgs/icons/icon-chevron-right.svg?react";

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
import notFoundPageImg from "./svgs/not-found-page.svg?url";

// CTJ Logos
import LogoHorizontalP from "./svgs/logos/logo-horizontal.svg?react";
import LogoHorizontalOnDarkP from "./svgs/logos/logo-horizontal-on-dark.svg?react";
import LogoMarkP from "./svgs/logos/logo-logomark.svg?react";
import LogoStackedP from "./svgs/logos/logo-stacked.svg?react";
import LogoStackedOnDarkP from "./svgs/logos/logo-stacked-on-dark.svg?react";
import LogoTypeP from "./svgs/logos/logo-logotype.svg?react";
import LogoVerticalP from "./svgs/logos/logo-vertical.svg?react";
import LogoWordmarkP from "./svgs/logos/logo-wordmark.svg?react";

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

interface defaultProps {
  [attribute: string]: string;
}

function svgWrapper(
  Svg: React.ComponentType,
  defaultProps: defaultProps,
): React.ComponentType {
  const Wrapper = (props) => {
    const titleid = useId();
    const descid = useId();

    if ("title" in defaultProps) {
      defaultProps["titleid"] = titleid;
    }

    if ("desc" in defaultProps) {
      defaultProps["descid"] = descid;
    }

    return <Svg {...defaultProps} {...props}></Svg>;
  };

  Wrapper.displayName = `SvgWrapper(${Svg.displayName || Svg.name || "SvgComponent"})`;

  return Wrapper;
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
  IconChevronLeft,
  IconChevronRight,
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
};

export { default as loginTanBg } from "./svgs/login-tan-bg.svg?url";
export { default as dotsSvg } from "./svgs/dots.svg?url";
export { default as loginIllustration } from "./svgs/login-illustration.svg?url";
export { default as privacyPageBg } from "./svgs/privacy-policy-bg-top.svg?url";
export { default as privacyPolicyIllustration } from "./svgs/privacy-policy-illustration.svg?url";
export { default as creditsPageBgTop } from "./svgs/credits-page-bg-top.svg?url";
export { default as creditsPageBgBottom } from "./svgs/credits-page-bg-bottom.svg?url";
export { default as creditsPageHighFive } from "./svgs/credits-page-high-five.svg?url";
export { default as landingPageCreativeTeam } from "./svgs/landing-page-creative-team.svg?url";
export { default as LandingPageBg } from "./svgs/landing-page-bg.svg?url";
export { default as LandingPageFg } from "./svgs/landing-page-fg.svg?url";
export { default as iconArrowDown } from "./svgs/icons/icon-arrow-down.svg?url";
