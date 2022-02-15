import * as api from "./api.js"
import * as utils from "./utils.js"

export async function syncCheck(localStacks){
  const localLastEdited = localStorage.getItem("lastEdited")
  const remoteStacks = await api.getStacks()
  const syncObj = {
    syncCmd: null,
    stacks: null,
    setter: null
  }
  if (!localLastEdited) {
    syncObj.syncCmd = 2
    syncObj.stacks = remoteStacks.stacks
  } else {
    if (localLastEdited > remoteStacks.lastEdited) {
      syncObj.syncCmd = 1
      syncObj.stacks = localStacks
    }
    if (localLastEdited < remoteStacks.lastEdited) {
      syncObj.syncCmd = 2
    syncObj.stacks = remoteStacks.stacks
    }
    if (localLastEdited === remoteStacks.lastEdited) {
      syncObj.syncCmd = 0 
    }
  }
  return syncObj
}

export async function syncData(syncObj){
  /* 
  */
  
  switch (syncObj.syncCmd) {
    case 0: break;
    case 1: //Push local to remote
    case 2: //Pull from remote

    default: alert("Sync has malfuctioned")
  }
}