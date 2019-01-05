import React from 'react';

const ProductButton = (props) => {
  const { product, selector, selected } =  props
  return (
    <button id={selected === product ? "product-button--selected" : "product-button"} onClick={selector} value={product}>{product}</button>
  );
};

export default ProductButton;