import React from "react";
import PropTypes from "prop-types";

const ProductButton = ({ product, add }) => {
  const handleClick = (event) => {
    const { value } = event.target;
    add(value);
  };

  return (
    <button id="product-button" onClick={handleClick} value={product}>
      {product}
    </button>
  );
};

ProductButton.propTypes = {
  product: PropTypes.string.isRequired,
  add: PropTypes.func,
};

export default ProductButton;
