import React from "react";
import PropTypes from "prop-types";
import * as utils from "../../utils/utils.js";

const ProductButton = ({ product, add }) => {
	const handleClick = (event) => {
		const { value } = event.target;
		add(value);
	};

	return (
		<button className="product-button" onClick={handleClick} value={product}>
			{utils.transformText(product)}
		</button>
	);
};

ProductButton.propTypes = {
	product: PropTypes.string.isRequired,
	add: PropTypes.func,
};

export default ProductButton;
