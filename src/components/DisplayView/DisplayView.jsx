import React, { useState, Fragment } from "react";
import ProductListTab from "../AppTab/AppTab.jsx";
import ProductList from "../../views/ProductList/ProductList.jsx";
import StoredBales from "../../views/StoredBales/StoredBales.jsx";
import ContainerOverview from "../../views/ContainerOverview/ContainerOverview.jsx";

const DisplayView = ({
	addToContainer,
	addStack,
	savedStacks,
	usedCodes,
	saveUsedCode,
	containerContent,
	containerNumber,
	sealNumber,
	updateContainerAndSeal,
	addContainerToDB,
	removeFromContainer,
	toggleMenu,
}) => {
	const [view, setView] = useState(0);

	let screen;
	switch (view) {
		case 0:
			screen = (
				<ProductList
					addToContainer={addToContainer}
					addStack={addStack}
					savedStacks={savedStacks}
				/>
			);
			break;
		case 1:
			screen = (
				<StoredBales
					stacks={savedStacks}
					add={addToContainer}
					saveUsedCode={saveUsedCode}
					usedCodes={usedCodes}
				/>
			);
			break;
		case 2:
			screen = (
				<ContainerOverview
					containerDetails={{ containerContent, containerNumber, sealNumber }}
					update={updateContainerAndSeal}
					finish={addContainerToDB}
					remove={removeFromContainer}
				/>
			);
			break;
		default:
			screen = <h1>500 - Something's gone horribly wrong</h1>;
	}
	return (
		<Fragment>
			<ProductListTab setView={setView} toggleMenu={toggleMenu} />
			{screen};
		</Fragment>
	);
};

export default DisplayView;
