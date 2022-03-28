import React from "react";
import StackEditor from "../StackEditor/StackEditor.jsx";
import PropTypes from "prop-types";

const ResponseModal = ({ response, close }) => {
	const handleClose = () => {
		close();
	};

	return (
		<div className="model">
			<div id="response-modal__content">
				<span id="response-modal__close" onClick={handleClose}>
					{/* TODO: Use MUI to style this element */}
					<h1>X</h1>
				</span>
				<p>
					Here is the ID for the stack. Please make sure you write it clearly on
					the bale
				</p>
				<h1>{response.stackId ? response.stackId : null}</h1>
				<StackEditor stack={response.content} context="preview" />
			</div>
		</div>
	);
};

ResponseModal.propTypes = {
	response: PropTypes.shape({
		stackId: PropTypes.string.isRequired,
		content: PropTypes.array.isRequired,
		date: PropTypes.string,
	}),
	close: PropTypes.func,
};

export default ResponseModal;
