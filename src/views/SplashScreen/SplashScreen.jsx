import React, { useState } from "react";
import * as sync from "../../services/data";
import logo from "../../assets/kinrich-logo-200.png";
import footer from "../../assets/kinrich-footer-250.png";
// import CircularProgress from "@material-ui/core/CircularProgress";

const SplashScreen = (props) => {
	const { savedStacks, initialStartup, stacksSetter, dataSyncedSetter } = props;
	const [started, setStarted] = useState(false);

	function handleStart(event) {
		setStarted(true);
	}

	async function handleSync() {
		const syncObj = await sync.syncCheck(savedStacks);
		syncObj.setter = stacksSetter;
		console.log("handleSync() await syncObj: ", syncObj);
		const { syncCmd } = syncObj;
		/**
		 * TODO: There needs to be another step here to compare lengths of the two stacks to ensure true syncronitity <- sp?
		 */
		const transpiler = {
			pull: "cloud",
			push: "local",
		};

		let message;

		switch (syncCmd) {
			default:
				message = "Data already synchronised";
				break;
			case "push":
				message = `The ${transpiler[syncCmd]} data is ahead. Are you sure you want to ${syncCmd} data ?`;
				break;
			case "pull":
				message = `The ${transpiler[syncCmd]} data is ahead. Are you sure you want to ${syncCmd} data ?`;
				break;
		}
		console.log("SYNC OBJECT", syncObj);
		let confirmation;
		if (syncCmd) {
			confirmation = window.confirm(message);
		} else {
			window.alert(message);
		}

		if (confirmation) {
			sync.syncData(syncObj);
		}
		dataSyncedSetter(true);
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
					<button disabled={!initialStartup} onClick={handleSync}>
						Sync
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
