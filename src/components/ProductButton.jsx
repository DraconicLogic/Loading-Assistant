import React from 'react';

const ProductButton = ({ product, selector, selected }) => {
  return (
    <button id={selected === product ? "product-button--selected" : "product-button"} onClick={selector} value={product} >{product}</button>
  );
};

export default ProductButton;