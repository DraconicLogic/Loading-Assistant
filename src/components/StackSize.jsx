import React from "react";
import PropTypes from "prop-types";

const StackSize = ({ size }) => {
  return (
    <div id="stack-section__size">
      <button className="stack-section__size__button" onClick={() => size(12)}>
        12
      </button>
      <button className="stack-section__size__button" onClick={() => size(9)}>
        9
      </button>
      <button className="stack-section__size__button" onClick={() => size(6)}>
        6
      </button>
      <button className="stack-section__size__button" onClick={() => size(3)}>
        3
      </button>
      <button className="stack-section__size__button" onClick={() => size(1)}>
        1
      </button>
    </div>
  );
};

StackSize.propTypes = {
  size: PropTypes.func.isRequired,
};

export default StackSize;
