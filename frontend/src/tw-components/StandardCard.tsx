import React from "react";

interface CardProps {
  key: any;
  name: string;
  usedIn: string;
  provider: string;
  imgSrc: string;
  imgContainerStyleClasses: string;
  imgStyleClasses: string;
  learnMoreLink: string;
}

const Card: React.FC<CardProps> = ({
  name,
  usedIn,
  provider,
  imgSrc,
  imgContainerStyleClasses,
  imgStyleClasses,
  learnMoreLink,
}) => {
  return (
    <div className="auto-cols-max rounded-xl shadow-xl p-3 md:p-6 flex flex-row sm:flex-col items-center justify-center md:justify-evenly gap-4">

      {/* Photo Container */}
      <div className={imgContainerStyleClasses}>
        {/* Photo */}
        <img className={imgStyleClasses} src={imgSrc} alt={name} />
      </div>

      {/* Text Content */}
      <div>
        {/* Name, Used In, Provider Rows */}
        <table className="table-fixed text-left text-xs sm:text-sm lg:text-base xl:text-lg">
          <tbody>
            <tr className="pb-1">
              <th className="pr-2">Name:</th>
              <td>{name}</td>
            </tr>
            <tr className="pb-1">
              <th className="pr-2">Used In:</th>
              <td>{usedIn}</td>
         
            </tr>
            <tr className="pb-1">
              <th className="pr-2">Provider:</th>
              <td>{provider}</td>
            </tr>
          </tbody>
        </table>

        {/* Learn More Link */}
        <div className="mt-3 md:mt-6">
          <a href={learnMoreLink} className="text-blue-link underline font-semibold text-sm sm:text-base md:text-lg lx:text-xl">
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
