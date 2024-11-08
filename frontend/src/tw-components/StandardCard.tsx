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
    <div className="flex auto-cols-max flex-row items-center justify-center gap-4 rounded-xl p-3 shadow-md sm:flex-col md:justify-evenly md:p-6">
      <div className={imgContainerStyleClasses}>
        <img className={imgStyleClasses} src={imgSrc} alt={name} />
      </div>

      <div>
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

        <div className="mt-3 md:mt-6">
          <a
            href={learnMoreLink}
            className="font-semibold lx:text-xl text-sm text-blue-link underline sm:text-base md:text-lg"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
