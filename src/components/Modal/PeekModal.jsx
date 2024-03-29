import React, { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { accendingOrder, descendingOrder } from "../../utils/utils.js";

const PeekModal = ({ savedStacks, togglePeek }) => {
	const [dateSortAccending, setDateSortAccending] = useState(false);

	const handleClose = (event) => {
		togglePeek();
	};

	const sortByDate = (stacks, order) => {
		const sorted = Object.entries(stacks).sort(order);
		return sorted;
	};
	const handleDateSort = (event) => {
		console.log("Handling Date Sort: ", event);
		setDateSortAccending(!dateSortAccending);
	};

	const displayStacks = (stacks) => {
		let sortedStacks;
		if (dateSortAccending) {
			sortedStacks = sortByDate(savedStacks, accendingOrder);
		} else {
			sortedStacks = sortByDate(savedStacks, descendingOrder);
		}

		return sortedStacks;
	};

	return (
		<div className="model">
			<div id="peek-modal__content">
				<AppBar position="sticky">
					<Toolbar>
						<Button variant="outlined" onClick={handleDateSort}>
							Date{" "}
							{dateSortAccending ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
						</Button>
						<span style={{ float: "right" }}>
							<CancelIcon onClick={handleClose} />
						</span>
					</Toolbar>
				</AppBar>
				{Object.keys(savedStacks).length > 0 ? (
					<div id="peek-modal__content__stacks">
						{displayStacks(savedStacks).map((savedStack, index) => {
							return (
								<p key={index}>
									<span
										style={{
											fontSize: "x-small",
											display: "flow-root",
										}}>
										{dayjs(savedStack[1].date).format("H:mm - DD/MM/YYYY")}
									</span>
									<span style={{ fontWeight: "bold" }}>{savedStack[0]}</span> :{" "}
									{savedStack[1].content.map((product, index) => {
										return (
											<span key={index}>
												{product}
												{", "}
											</span>
										);
									})}
								</p>
							);
						})}
					</div>
				) : null}
			</div>
		</div>
	);
};

PeekModal.propTypes = {
	storedStack: PropTypes.object,
	togglePeek: PropTypes.func,
};

export default PeekModal;
