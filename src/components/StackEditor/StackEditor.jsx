import React, { Component } from "react";
import PropTypes from "prop-types";
import * as utils from "../../utils/utils.js";

class StackEditor extends Component {
	render() {
		const { stack, position, context } = this.props;
		const stackStyle = {
			height: "100%",
			width: "100%",
			fontSize: "xx-small",
		};

		const editorStyle = {
			fontSize: "100%",
			fontWeight: "bolder",
		};

		const fillStack = [];
		for (let i = 0; i < stack.length; i++) {
			fillStack.push("");
		}
		return (
			<div
				className="stack-editor"
				style={context === "preview" ? stackStyle : null}
				data-testid="stack">
				{fillStack.map((bale, index) => {
					return (
						<div
							style={context === "preview" ? stackStyle : editorStyle}
							className={
								position === index
									? "stack-editor__bale--selected"
									: "stack-editor__bale"
							}
							id={`stack-editor__bale-${index + 1}`}
							onClick={() => this.handleClick(index)}
							key={index}
							data-testid={`stack-slot_${index + 1}`}>
							{stack[index] ? utils.transformText(stack[index]) : null}
						</div>
					);
				})}
			</div>
		);
	}

	handleClick = (stackPosition) => {
		const { context, mark } = this.props;
		if (context === "editor") mark(stackPosition);
	};
}

StackEditor.propTypes = {
	stack: PropTypes.array.isRequired,
	position: PropTypes.number,
	context: PropTypes.string,
	mark: PropTypes.func,
};

export default StackEditor;
