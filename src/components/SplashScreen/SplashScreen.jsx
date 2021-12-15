import React, { useState, useEffect } from "react";
import * as api from "../../api.js";
import * as utils from "../../utils.js";
import * as local from "../../local.js";
import logo from "../../assets/kinrich-logo-200.png";
import footer from "../../assets/kinrich-footer-250.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UsbOutlined } from "@material-ui/icons";

const SplashScreen = (props) => {
	const { setters, savedStacks } = props;
	const { setSavedStacks, setDate, setProducts } = setters;

	useEffect(() => {
		(async function startup() {
			console.log("Running Startup...");
			const date = utils.getDate();
			const products = await loadProducts();
			const stacks = await loadStackData();
			setDate(date);
			setProducts(products);
			setSavedStacks(stacks);
			// utils.syncData(stacks)
		})();
	}, [setDate, setProducts, setSavedStacks]);

	const [started, setStarted] = useState(false);

	function handleStart(event) {
		setStarted(true);
	}

	function loadProducts() {
		let products;
		if (local.getProducts()) {
			products = local.getProducts();
		} else {
			api.getProducts().then((productsFromDB) => {
				products = productsFromDB;
				local.setProducts(productsFromDB);
			});
		}
		return products ? products : alert("products failed to load");
	}

	function loadStackData() {
		// let stacks;
		// if (local.getStacks()) {
		// 	stacks = local.getStacks();
		// } else {
		// 	api.getStacks().then((stacksFromDB) => {
		// 		stacks = stacksFromDB;
		// 	});
		// }
		// return stacks ? stacks : {};
		const localStacks = local.getStacks();

		return localStacks ? localStacks : {};
	}

	const display = (
		<div id="splash" className={started ? "fade-out" : null}>
			<div id="splash-center">
				<img id="splash-center__kinrich-logo" src={logo} alt="Kinrich Logo" />
				<h1 id="App-title">Loading Assistant</h1>
			</div>
			<div id="splash-bottom">
				<div id="splash-bottom__buttons">
					<button onClick={handleStart} value="new">
						Start New Container
					</button>
					{/* <button
                disabled={savedContainer ? false : true}
                onClick={startApp}
                value="continue"
              >
                Continue Container
              </button> */}
				</div>
				<div id="splash-bottom__information">
					{/* <p
					//  hidden={savedContainer ? false : true}
					>
						There seems to be Container loading in progress.
					</p> */}
					<div
					// hidden={!loading}
					>
						<br />
						{/* <CircularProgress /> */}

						<p>
							{savedStacks ? Object.keys(savedStacks).length : null} Stacks
							Retrieved
						</p>
					</div>
				</div>
				<span id="splash-bottom__version">Ver 2.0.0</span>
				<img
					id="splash-bottom__kinrich-footer"
					src={footer}
					alt="Kinrich Logo Footer"
				/>
			</div>
		</div>
	);

	return started ? props.children : display;
};

export default SplashScreen;
