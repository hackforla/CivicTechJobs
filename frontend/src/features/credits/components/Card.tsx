/**
 * Single attribution card for the credits page.
 *
 * Renders an SVG image (illustration or icon) above a small
 * metadata table (Name, Used In, Provider) with a "Learn more"
 * link. The container and image-class props let the parent
 * (`CreditsPage`) swap layout between illustration and icon
 * presentations without forking the component.
 */

import React from "react";

import styles from "./Card.module.css";

interface CardProps {
  name: string;
  usedIn: string;
  provider: string;
  Image: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  imgContainerStyleClasses: string;
  imgStyleClasses: string;
  learnMoreLink: string;
}

const Card: React.FC<CardProps> = ({
  name,
  usedIn,
  provider,
  Image,
  imgContainerStyleClasses,
  imgStyleClasses,
  learnMoreLink,
}) => {
  return (
    <div className={styles.card}>
      <div className={imgContainerStyleClasses}>
        <Image className={imgStyleClasses} aria-label={name} />
      </div>

      <div>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>Used In:</th>
              <td>{usedIn}</td>
            </tr>
            <tr>
              <th>Provider:</th>
              <td>{provider}</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.learnMoreWrap}>
          <a href={learnMoreLink} className={styles.learnMore}>
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
