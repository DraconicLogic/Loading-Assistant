import React, { useState, useEffect } from "react";
import * as data from "../../services/data";
import * as sync from "../../services/data";
// import * as utils from "../../utils/utils.js";
import logo from "../../assets/kinrich-logo-200.png";
import footer from "../../assets/kinrich-footer-250.png";
// import CircularProgress from "@material-ui/core/CircularProgress";

const SplashScreen = (props) => {
	const {
		savedStacks,
		initialStartup,
		stacksSetter,
		dataSyncedSetter,
		containerContentState,
	} = props;

	const [started, setStarted] = useState(false);
	const [unfinishedContainers, setUnfinishedContainers] = useState(null);

	function handleStart(event) {
		setStarted(true);
	}

	function handleRestoreState(previousContent) {
		containerContentState.setContainerContent(previousContent);
		handleStart();
	}

	function displayUnfinishedContainers(containers) {
		if (containers) {
			const containersArray = Object.entries(containers);
			return containersArray.map((container) => {
				const date = container[0];
				const containerContent = container[1].containerContent;
				console.log("Unfinished ContainerContent: ", containerContent);
				return (
					<div>
						{date} - {containerContent.length} straps
						<button onClick={() => handleRestoreState(containerContent)}>
							Continue
						</button>
						<button>Clear</button>
					</div>
				);
			});
		}
	}

	useEffect(() => {
		(function retrieveUnfinishedContainers() {
			console.info("Checking for unfinished...");
			const loadedStates = data.loadState();
			console.log("loadedStates: ", loadedStates);
			setUnfinishedContainers(loadedStates);
		})();
	}, []);

	async function handleSync() {
		const syncObj = await sync.syncCheck(savedStacks);
		if (syncObj.netError) {
			window.alert("Cannot synchronise right now");
			return;
		}
		console.log("syncObj: ", syncObj);
		syncObj.setter = stacksSetter;
		const { syncCmd } = syncObj;
		/**
		 * TODO: There needs to be another step here to compare lengths of the two stacks to ensure true syncronitity <- sp?
		 */

		const message = sync.syncMsg(syncCmd);

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

	// const recoveredStateDates = Object.entries(recoveredState);

	const display = (
		<div id="splash" className={started ? "fade-out" : null}>
			{unfinishedContainers && (
				<div id="splash-top">
					Unfinished Containers
					{displayUnfinishedContainers(unfinishedContainers)}
				</div>
			)}
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
