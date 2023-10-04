import React, { useState, useEffect } from "react";
import products from "../../products/products.json";
import ProductButton from "../../components/ProductButton/ProductButton.jsx";
import StackEditor from "../../components/StackEditor/StackEditor.jsx";
import * as utils from "../../utils/utils.js";
import StackSize from "../../components/StackSize/StackSize.jsx";
import { generateUniqueCode } from "../../utils/stackIDGenerator.js";
import CancelIcon from "@material-ui/icons/Cancel";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import SaveSharpIcon from "@material-ui/icons/SaveSharp";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

function ProductList({ savedStacks, handleSaveStack, handleAddToContainer }) {
	const [stackPosition, setStackPosition] = useState(0);
	const [currentStack, setCurrentStack] = useState(Array(12));
	const [bales, setBales] = useState([]);
	const [searchField, setSearchField] = useState("");

	useEffect(() => {
		(function searchBales(query) {
			if (searchField) {
				const filteredBales = bales.filter((bale) => {
					const isFirstCharSame = bale[0] === query[0];
					return isFirstCharSame ? bale.includes(query) : null;
				});
				setBales(filteredBales);
			} else {
				unfilterBales();
			}
		})(searchField);
	}, [searchField]);

	useEffect(() => {
		unfilterBales();
	}, []);

	useEffect(() => {
		highlightNextPosition();
	}, [currentStack]);

	function unfilterBales() {
		const productCodes = Object.keys(products).sort();
		console.log("ProductCodes: ", productCodes);
		setBales(productCodes);
	}

	function handleSearch(event) {
		const newChar = String(event.target.value).toUpperCase();
		setSearchField(newChar);
	}

	function markPosition(marker) {
		setStackPosition(marker);
	}

	function addToStack(baleCode) {
		if (currentStack.length <= 12) {
			const newStack = [...currentStack];
			newStack[stackPosition] = baleCode;
			setCurrentStack(newStack);
			setSearchField("");
			document.getElementById("search-field").focus();
		}
	}

	function highlightNextPosition() {
		const emptyPosition = utils.findEmptyPosition(currentStack);
		setStackPosition(emptyPosition);
	}

	function handleAddContainer() {
		let isStackFilled = true;
		for (let i = 0; i < currentStack.length; i++) {
			if (currentStack[i] === undefined) {
				isStackFilled = false;
			}
		}

		if (isStackFilled) {
			const newStack = {
				stackId: generateUniqueCode(savedStacks),
				stackContent: currentStack,
			};

			handleAddToContainer(newStack);
			clearStack();
		} else {
			alert("Please fill in the stack");
		}
	}

	function toggleStackSize(size) {
		setCurrentStack(Array(size));
	}

	function handleAddToDB() {
		let isStackFilled = true;
		for (let i = 0; i < currentStack.length; i++) {
			if (currentStack[i] === undefined) {
				isStackFilled = false;
			}
		}
		if (isStackFilled) {
			const date = new Date().toISOString();
			const stackObj = {
				stackId: generateUniqueCode(savedStacks),
				content: currentStack,
				date,
			};
			handleSaveStack(stackObj);
			clearStack();
		} else {
			alert("Please fill in the stack");
		}
	}

	function clearStack() {
		setCurrentStack(Array(currentStack.length));
		setStackPosition(0);
	}

	return (
		<div id="product-list" className="App__view">
			<div id="product-list__search">
				<TextField
					id="search-field"
					label="Search Products"
					variant="filled"
					type="search"
					onChange={handleSearch}
					value={searchField}
					autoFocus={true}
				/>
			</div>
			<div id="product-list__buttons">
				{searchField &&
					bales.map((bale) => {
						return <ProductButton add={addToStack} product={bale} key={bale} />;
					})}
			</div>
			<div id="stack-section">
				<StackSize size={toggleStackSize} />
				<span id="cancel-button">
					<CancelIcon onClick={() => clearStack()} />
				</span>

				<StackEditor
					stack={currentStack}
					position={stackPosition}
					mark={markPosition}
					context="editor"
				/>
				<div id="stack-options--1">
					<button
						className="stack-options__button"
						onClick={handleAddToDB}
						data-testid="save-to-DB">
						<SaveSharpIcon>Save for Later</SaveSharpIcon>
					</button>
				</div>
				<div id="stack-options--2">
					<button
						className="stack-options__button"
						onClick={handleAddContainer}>
						<LocalShippingIcon />
					</button>
				</div>
			</div>
		</div>
	);
}

ProductList.propTypes = {
	savedStacks: PropTypes.object.isRequired,
	handleSaveStackToDB: PropTypes.func,
	handleAddToContainer: PropTypes.func,
};

export default ProductList;
