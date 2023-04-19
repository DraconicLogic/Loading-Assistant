import React, { useState } from "react";
import products from "../../products/products.json";
import PropTypes from "prop-types";
import SyncStatus from "../SyncStatus/SyncStatus.jsx";
import { Popover } from "@material-ui/core";
import * as utils from "../../utils/utils.js";

const StatusBar = ({ content, date, synced }) => {
	const [extraInfo, setExtraInfo] = useState(false);

	const flattenedContent = content
		.reduce((flattened, stackObj) => {
			flattened.push(stackObj.stackContent);
			return flattened;
		}, [])
		.flat(1);

	const rowNumber = Math.floor(content.length / 6);
	const totalBales = flattenedContent.length;

	const netWeight = flattenedContent.reduce((weight, item) => {
		return (weight += products[item].size);
	}, 0);

	const overWeightStyle = {
		color: "red",
	};

	const nearMaxWeightStyle = {
		color: "orangered",
	};

	const numberInRow = content.length % 6;

	const toggleExtraInfo = () => {
		setExtraInfo(!extraInfo);
	};

	return (
		<div id="status-bar">
			<span className="status-bar__item">
				Row: {rowNumber + 1}
				<br /> {numberInRow}/6{" "}
			</span>
			<span className="status-bar__item">Bales: {totalBales}</span>
			<span
				onClick={toggleExtraInfo}
				className="status-bar__item"
				id="status-bar__weight"
				style={
					netWeight > 26500
						? overWeightStyle
						: netWeight >= 26000 && netWeight <= 26500
						? nearMaxWeightStyle
						: null
				}>
				Weight: {netWeight}kg
			</span>
			<Popover
				open={extraInfo}
				anchorEl={document.getElementById("status-bar__weight")}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				onClose={toggleExtraInfo}>
				Space Remaining: {26500 - netWeight}kg
			</Popover>
			<span className="status-bar__item">
				<SyncStatus synced={synced} />
			</span>
			<span className="status-bar__item">
				{/* extract dayjs function and define in utils */}
				Date: {utils.formatDate(date)}
			</span>
		</div>
	);
};

StatusBar.propTypes = {
	content: PropTypes.arrayOf(PropTypes.object),
	date: PropTypes.string,
};

export default StatusBar;
