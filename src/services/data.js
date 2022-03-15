import * as api from "./api.js"
import * as local from "./local.js"


export async function syncCheck(localStacks){
  console.log("sycnCheck")
  console.log("localStacks: ", localStacks)
  const localLastEdited = local.getLastEdited()
  const remoteStacks = await api.getStacks()
  console.log("waiting for remote stacks: ", remoteStacks)
  console.log("waiting for localLastEditted:", localLastEdited)
  console.log("Compare Dates: ", remoteStacks.lastEdited === localLastEdited)
  const syncObj = {
    syncCmd: null,
    stacks: null,
    lastEdited: null,
    setter: null,
    otherStacks: null,
    otherLastEdited: null,
  }

  if (!localLastEdited) {
    /**
     * This block of code is probably unaccessable now due to changes in architechre <-sp
     *  */ 
    console.log("No local last edited")
    syncObj.syncCmd = "pull"
    syncObj.stacks = remoteStacks.stacks
    syncObj.lastEdited = remoteStacks.lastEdited
    syncObj.otherStacks = localStacks
    syncObj.otherLastEdited = localLastEdited
  } else {
    if (localLastEdited > remoteStacks.lastEdited) {
      console.log("local > remote ")
      syncObj.syncCmd = "push"
      syncObj.stacks = localStacks
      syncObj.lastEdited = localLastEdited
      syncObj.otherStacks = remoteStacks.stacks
      syncObj.otherLastEdited = remoteStacks.lastEdited
    }
    if (localLastEdited < remoteStacks.lastEdited) {
      console.log("local < remote")
      syncObj.syncCmd = "pull"
      syncObj.stacks = remoteStacks.stacks
      syncObj.lastEdited = remoteStacks.lastEdited
      syncObj.otherStacks = localStacks
      syncObj.otherLastEdited = localLastEdited

    }
    if (localLastEdited === remoteStacks.lastEdited) {
      console.log("local === remote")
      syncObj.syncCmd = null 
    }
  }
  return syncObj
}

export async function syncData(syncObj){
  /* 
  */
  const {syncCmd, stacks, setter, lastEdited} = syncObj
  switch (syncCmd) {
    case null: 
      console.log("Data already syncronised")
      break;
    case "push": //Push local to remote
      console.log("Sync push");
      api.overwriteStacks(stacks)
      .then((newStacks) => {
        console.log("newStacks: ", newStacks)
        alert("remote data has been updated")
      })

      break;
    case "pull": //Pull from remote
      console.log("Sync pull")
      setter(stacks)
      local.overwriteStacks(stacks)
      local.setLastEdited(lastEdited)
      alert("local data has been updated")
      break;

    default: alert("Sync has malfuctioned")
  }
}

export function saveState(currentState){
  const savedStates = JSON.parse(localStorage.getItem('savedStates')) || {}
  savedStates[currentState.date] = currentState
  localStorage.setItem("saveStates", JSON.stringify(savedStates))
  return;
}

// TODO: implement synchronise()

// export async function synchronise({
//   savedStacks, 
//   setSavedStacks, 
//   setDataSynced
// }){
//   /**
//    * Setters: setSavedStacks, setDataSynced
//    * Props: savedStacks, 
//    */

//    const syncObj = await syncCheck(savedStacks);
//    syncObj.setter = setSavedStacks
   
//    const { syncCmd } = syncObj;
//    /**
//     * TODO: There needs to be another step here to compare lengths of the two stacks to ensure true syncronitity <- sp?
//     */
//    const transpiler = {
//      pull: "cloud",
//      push: "local",
//    };

//    let message;

//    switch (syncCmd) {
//      default:
//        message = "Data already synchronised";
//        break;
//      case "push":
//        message = `The ${transpiler[syncCmd]} data is ahead. Are you sure you want to ${syncCmd} data ?`;
//        break;
//      case "pull":
//        message = `The ${transpiler[syncCmd]} data is ahead. Are you sure you want to ${syncCmd} data ?`;
//        break;
//    }

//    let confirmation;
//    if (syncCmd) {
//      confirmation = window.confirm(message);
//    } else {
//      window.alert(message);
//    }

//    if (confirmation) {
//      syncData(syncObj);
//    }
//   setDataSynced(true)


// }