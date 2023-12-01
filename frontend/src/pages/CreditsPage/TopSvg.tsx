import React from "react";
import { FC, SVGProps } from "react";

const TopSvg: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 1440 520"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className=""
  >
    <g clip-path="url(#clip0_6412_58802)">
      <path
        opacity="0.5"
        d="M644 374.717C999.77 437.091 1245.5 429.53 1441 355L1441 785L-3.75918e-05 785L-3.45772e-06 394.552C-3.45772e-06 394.552 426.5 336.584 644 374.717Z"
        fill="url(#paint0_linear_6412_58802)"
      />
      <path
        d="M915.783 410.283C449.407 347.909 127.28 355.47 -129 430V0H1760V390.448C1760 390.448 1200.9 448.416 915.783 410.283Z"
        fill="#FFE0B9"
      />
      <path
        opacity="0.5"
        d="M797 410.283C441.23 347.909 195.5 355.47 0 430V0H1441V390.448C1441 390.448 1014.5 448.416 797 410.283Z"
        fill="#FFEFDB"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_6412_58802"
        x1="720.5"
        y1="355"
        x2="720.5"
        y2="785"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFEFDB" />
        <stop offset="0.339691" stop-color="#FFEFDB" stop-opacity="0" />
      </linearGradient>
      <clipPath id="clip0_6412_58802">
        <rect width="1440" height="520" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default TopSvg;
