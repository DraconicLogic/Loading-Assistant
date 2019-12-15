import React from "react";

const ProductButton = ({ product, add, selected }) => {
  const handleClick = event => {
    const { value } = event.target;
    add(value);
  };

  return (
    <button
      id={selected === product ? "product-button--selected" : "product-button"}
      onClick={handleClick}
      value={product}
    >
      {product}
    </button>
  );
};

export default ProductButton;
