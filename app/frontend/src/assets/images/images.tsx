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
// import creditsPageBgTop from "./svgs/credits-page-bg-top.svg";
import creditsPageBgBottom from "./svgs/credits-page-bg-bottom.svg";

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
import illustrationCreativeTeam from "./svgs/credits/illustrations/creative-team.svg";
import illustrationDigitalPresentation from "./svgs/credits/illustrations/digital-presentation.svg";
import illustrationHighFive from "./svgs/credits/illustrations/high-five.svg";
import illustrationOnboarding from "./svgs/credits/illustrations/onboarding.svg";
import illustrationSelect from "./svgs/credits/illustrations/select.svg";
import illustrationSignUp from "./svgs/credits/illustrations/sign-up.svg";
import illustrationTeamPage from "./svgs/credits/illustrations/team-page.svg";
import illustrationTeamSpirit from "./svgs/credits/illustrations/team-spirit.svg";
import illustrationTeamWork from "./svgs/credits/illustrations/team-work.svg";

// Credits Icons
import icongraphyCross from "./svgs/credits/icons/cross.svg";
import icongraphyArrowDown from "./svgs/credits/icons/arrow-down.svg";
import icongraphyArrowLeft from "./svgs/credits/icons/arrow-left.svg";
import icongraphyCarousel from "./svgs/credits/icons/carousel.svg";
import icongraphyCheck from "./svgs/credits/icons/check.svg";
import icongraphyChevronDown from "./svgs/credits/icons/chevron-down.svg";
import icongraphyChevronLeft from "./svgs/credits/icons/chevron-left.svg";
import icongraphyChevronRight from "./svgs/credits/icons/chevron-right.svg";
import icongraphyChevronUp from "./svgs/credits/icons/chevron-up.svg";
import icongraphyClipboard from "./svgs/credits/icons/clipboard.svg";
import icongraphyCross from "./svgs/credits/icons/cross.svg";
import icongraphyFilter from "./svgs/credits/icons/filter.svg";
import icongraphyMenu from "./svgs/credits/icons/menu.svg";
import icongraphyMinus from "./svgs/credits/icons/minus.svg";
import icongraphyPlus from "./svgs/credits/icons/plus.svg";
import icongraphySearch from "./svgs/credits/icons/search.svg";

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

// Credits Page Icons
const iconArrowDownSvg = svgWrapper(icongraphyArrowDown, {
  title: "Arrow Down Icon",
  desc: "",
});
const iconArrowLeftSvg = svgWrapper(icongraphyArrowLeft, {
  title: "Arrow Left Icon",
  desc: "",
});
const iconCarouselSvg = svgWrapper(icongraphyCarousel, {
  title: "Carousel Icon",
  desc: "",
});
const iconCheckSvg = svgWrapper(icongraphyCheck, {
  title: "Check Icon",
  desc: "",
});
const iconChevronDownSvg = svgWrapper(icongraphyChevronDown, {
  title: "Chevron Down Icon",
  desc: "",
});
const iconChevronLeftSvg = svgWrapper(icongraphyChevronLeft, {
  title: "Chevron Left Icon",
  desc: "",
});
const iconChevronRightSvg = svgWrapper(icongraphyChevronRight, {
  title: "Chevron Right Icon",
  desc: "",
});
const iconChevronUpSvg = svgWrapper(icongraphyChevronUp, {
  title: "Chevron Up Icon",
  desc: "",
});
const iconClipboardSvg = svgWrapper(icongraphyClipboard, {
  title: "Clipboard Icon",
  desc: "",
});
const iconCrossSvg = svgWrapper(icongraphyCross, {
  title: "Cross Icon",
  desc: "",
});
const iconFilterSvg = svgWrapper(icongraphyFilter, {
  title: "Filter Icon",
  desc: "",
});
const iconMenuSvg = svgWrapper(icongraphyMenu, {
  title: "Menu Icon",
  desc: "",
});
const iconMinusSvg = svgWrapper(icongraphyMinus, {
  title: "Minus Icon",
  desc: "",
});
const iconPlusSvg = svgWrapper(icongraphyPlus, {
  title: "Plus Icon",
  desc: "",
});
const iconSearchSvg = svgWrapper(icongraphySearch, {
  title: "Search Icon",
  desc: "",
});

// Credits Page Illustrations
const illustrationCreativeTeamSvg = svgWrapper(illustrationCreativeTeam, {
  title: "Creative Team Illustration",
  desc: "",
});
const illustrationDigitalPresentationSvg = svgWrapper(
  illustrationDigitalPresentation,
  {
    title: "Digital Presentation Illustration",
    desc: "",
  }
);
const illustrationHighFiveSvg = svgWrapper(illustrationHighFive, {
  title: "High Five Illustration",
  desc: "",
});
const illustrationOnboardingSvg = svgWrapper(illustrationOnboarding, {
  title: "Onboarding Illustration",
  desc: "",
});
const illustrationSelectSvg = svgWrapper(illustrationSelect, {
  title: "Select Illustration",
  desc: "",
});
const illustrationSignUpSvg = svgWrapper(illustrationSignUp, {
  title: "Sign Up Illustration",
  desc: "",
});
const illustrationTeamPageSvg = svgWrapper(illustrationTeamPage, {
  title: "Team Page Illustration",
  desc: "",
});
const illustrationTeamSpiritSvg = svgWrapper(illustrationTeamSpirit, {
  title: "Team Spirit Illustration",
  desc: "",
});
const illustrationTeamWorkSvg = svgWrapper(illustrationTeamWork, {
  title: "Teamwork Illustration",
  desc: "",
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
  // Credits Page Illustrations
  illustrationTeamPage,
  illustrationOnboarding,
  // Credits Page Icons
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
  iconSearchSvg,
  // Credits Page Illustrations,
  illustrationCreativeTeamSvg,
  illustrationDigitalPresentationSvg,
  illustrationHighFiveSvg,
  illustrationOnboardingSvg,
  illustrationSelectSvg,
  illustrationSignUpSvg,
  illustrationTeamPageSvg,
  illustrationTeamSpiritSvg,
  illustrationTeamWorkSvg,
};
