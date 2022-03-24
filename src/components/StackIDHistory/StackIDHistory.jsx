import React from "react";

const StackIDHistory = ({ containerContent }) => {
	console.log("Stack Id History props: ", containerContent);
	const reversedUsedCodes = [...containerContent].reverse();
	return (
		<ul id="stackid-history">
			{reversedUsedCodes.map(({ stackId }, index) => {
				return (
					<li id={`stackid-history__${index}`} key={index}>
						{stackId}
					</li>
				);
			})}
		</ul>
	);
};

export default StackIDHistory;
