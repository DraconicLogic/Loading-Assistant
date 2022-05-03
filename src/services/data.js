import * as api from "./api.js"
import * as local from "./local.js"
import * as loaders from "../utils/loaders.js"



export async function syncCheck(localStacks){
  console.log("sycnCheck")
  console.log("localStacks: ", localStacks)
  const localLastEdited = local.getLastEdited()
  const remoteStacks = await api.getStacks()
  //TODO: Guard clause here. If api call fails end function.
  if (!remoteStacks) return;
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

export function syncMsg(syncCmd){
  let message;
  const transpiler = {
    pull: "cloud",
    push: "local",
  };

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
  return message;
}

export function saveStackData (newStack) {
  local.saveStackLocal(newStack)
  console.info(`Stack ${newStack.stackId} saved locally`)

  api.saveStackDB(newStack)
  .then((stack) => {    
    alert(`Stack ${stack.stackId} has been uploaded to the DB`)
    handleUnsent()
  }).catch((error) => {
    console.error(error)
    local.saveUnsentStack(newStack)
  })
}

export async function saveContainerData(newContainer){
  // 1. Save Container Locally
  // 2. Save Container on cloud
  // 3. Remove loaded stacks from cloud stack collection 
  // 4. Remove loaded stacks from local stack collection
  // 5. Remove loaded stack from state
  local.saveContainer(newContainer)
  return api.saveContainerToDB(newContainer)
  .then((savedContainer) => {
    console.log("savedContainer: ", savedContainer)
    return savedContainer
  })
  .catch((error) => console.error(error))
  // TODO: handle if createdContainer fail to send to remote database
  
}
 
export async function cleanupStackIDs(usedCodes){
  const localDeletedStacks = local.cleanupLocalStackIDs(usedCodes)
  console.log("local deleted Stacks: ", localDeletedStacks)
  return api.cleanupStackIDs(usedCodes)
  .then((deleteReport) => {
    console.log("deleteReport: ", deleteReport)
    return deleteReport
  })
  .catch((error) => {
    console.log("Cleanup StackId error")
    console.error(error)
  })
}

export async function startUp(){
  await loaders.initializeLocalStorage()
	const date = loaders.loadDate();
	const stacks = await loaders.loadStackData();
 
  return {
    date,
    stacks
  }
}

function handleUnsent(){
  const unsentStacks = local.getUnsentStacks()
  if(unsentStacks) {
    const resendFailures = unsentStacks.reduce((failures, unsent) => {
      api.saveStackDB(unsent)
      .then(({stackId}) => {
        console.log(`Stack ${stackId} resent succesfully`)
      })
      .catch(() => {
        console.log(`Stack ${unsent.stackId} upload failed`)
        failures.push(unsent)
      })
      return failures
    }, [])

    if (resendFailures.length > 0) {
      resendFailures.forEach((failure) => {
        local.saveUnsentStack(failure)
      })
    } else {
      localStorage.removeItem("unsentStacks")
    }
  } else {
    console.info("No Unsent stacks to upload")
  }
}

// TODO: implement synchronise()

// export async function synchronise(localStacks){
//   /**
//    * Get stacks from remote. If no
//    */
//   const remoteStacks = await api.getStacks()
//   if (!remoteStacks) {
//     // return error here
//     console.log("Need to return error here")
//     return;
//   }
//   const syncObj = await syncCheck(
//     {localStacks, remoteStacks}
//   )


// }