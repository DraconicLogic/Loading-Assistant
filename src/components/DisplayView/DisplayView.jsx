import React, { useState, Fragment } from "react";
import ProductListTab from "../AppTab/AppTab.jsx";
import ProductList from "../../views/ProductList/ProductList.jsx";
import StoredBales from "../../views/StoredBales/StoredBales.jsx";
import ContainerOverview from "../../views/ContainerOverview/ContainerOverview.jsx";
import PeekModal from "../Modal/PeekModal.jsx";
import Menu from "../Menu/Menu.jsx";

const DisplayView = ({
	handleAddToContainer,
	handleSaveStack,
	savedStacks,
	containerContent,
	containerNumber,
	sealNumber,
	updateContainerAndSeal,
	handleSaveContainer,
	handleRemoveFromContainer,
}) => {
	const [view, setView] = useState(0);
	const [peekStatus, setPeekStatus] = useState(false);
	const [menuStatus, setMenuStatus] = useState(false);

	function togglePeek() {
		setPeekStatus(!peekStatus);
	}

	function toggleMenu() {
		setMenuStatus(!menuStatus);
	}

	let screen;
	switch (view) {
		case 0:
			screen = (
				<ProductList
					handleAddToContainer={handleAddToContainer}
					handleSaveStack={handleSaveStack}
					savedStacks={savedStacks}
				/>
			);
			break;
		case 1:
			screen = (
				<StoredBales
					stacks={savedStacks}
					add={handleAddToContainer}
					containerContent={containerContent}
				/>
			);
			break;
		case 2:
			screen = (
				<ContainerOverview
					containerDetails={{ containerContent, containerNumber, sealNumber }}
					update={updateContainerAndSeal}
					finish={handleSaveContainer}
					remove={handleRemoveFromContainer}
				/>
			);
			break;
		default:
			screen = <h1>500 - Something's gone horribly wrong</h1>;
	}
	return (
		<Fragment>
			<Menu
				peekState={{ peekStatus, setPeekStatus }}
				menuState={{ menuStatus, setMenuStatus }}
			/>
			<ProductListTab setView={setView} toggleMenu={toggleMenu} />
			{peekStatus && (
				<PeekModal savedStacks={savedStacks} togglePeek={togglePeek} />
			)}
			{screen}
		</Fragment>
	);
};

export default DisplayView;
