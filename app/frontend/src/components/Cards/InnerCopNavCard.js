import { combineClasses } from "../Utility/utils";

function InnerCopNavCard({ isActive = false, ...props }) {
  const Tag = "href" in props ? "a" : "button"; // conditionally rendered tagss

  return (
    <Tag
      className={combineClasses(
        "card",
        "inner-cop-nav-card",
        isActive ? "active" : undefined,
        props.addClass
      )}
      onClick={props.onClick}
    >
      {props.children}
    </Tag>
  );
}

InnerCopNavCard.propTypes = {
  addClass: PropTypes.string,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export { InnerCopNavCard };
