import React from 'react';

const ProductButton = (props) => {
  const { product } =  props
  return (
    <button id="product-button">{product}</button>
  );
};

export default ProductButton;