import React from "react";
import PropTypes from "prop-types";

const ProductButton = ({ product, add }) => {
	const handleClick = (event) => {
		const { value } = event.target;
		add(value);
	};

	function transformText(text) {
		const glossary = {
			PARTYDRESS: "PARTY DRESS",
			SCHUNI: "SCH UNI",
			WHAT: "W/S HAT",
			"L POLO D": "L-POLO-D",
			LEATHER: "LTHER",
			BLANKET: "BLNKT",
		};
		return glossary[text] ? glossary[text] : text;
	}

	return (
		<button className="product-button" onClick={handleClick} value={product}>
			{transformText(product)}
		</button>
	);
};

ProductButton.propTypes = {
	product: PropTypes.string.isRequired,
	add: PropTypes.func,
};

export default ProductButton;
