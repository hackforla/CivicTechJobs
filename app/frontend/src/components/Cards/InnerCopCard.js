import { combineClasses } from "../Utility/utils";

function InnerCopCard(props) {
  return (
    <div className={combineClasses("card", "inner-cop-card", props.addClass)}>
      <div className="inner-cop-card-content">{props.children}</div>
    </div>
  );
}

InnerCopCard.propTypes = {
  addClass: PropTypes.string,
};

export default InnerCopCard;
