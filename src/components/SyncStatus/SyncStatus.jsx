import React from "react";
import SyncIcon from "@material-ui/icons/Sync";
import SyncProblemIcon from "@material-ui/icons/SyncProblem";
import DoneIcon from "@material-ui/icons/Done";

const SyncStatus = ({ synced }) => {
	console.log("SyncStatus: ", synced);
	// TODO: Can we animate the Sync Icon so that it spins.
	function iconSwitch(syncStatus) {
		console.log("iconSwitch params: ", syncStatus);
		switch (syncStatus) {
			case true:
				return <DoneIcon />;
			case false:
				return <SyncProblemIcon />;
			default:
				return <SyncIcon />;
		}
	}

	return iconSwitch(synced);
};

export default SyncStatus;
