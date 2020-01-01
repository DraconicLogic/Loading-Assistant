import React from "react";

const ProductButton = ({ product, add }) => {
  const handleClick = event => {
    const { value } = event.target;
    add(value);
  };

  return (
    <button id="product-button" onClick={handleClick} value={product}>
      {product}
    </button>
  );
};

export default ProductButton;
