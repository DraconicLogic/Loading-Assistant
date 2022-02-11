import * as api from "./api.js"

export async function syncCheck(){
  const syncObj = {
    syncCmd: null,
    stacks: null,
    setter: null
  }
  if (localStorage.getItem("lastEdited")) {
    const remoteStacks = await api.getStacks()

  }
  return syncObj
}

export function syncData(syncObj){
  /* 
    
  
  
  */
  switch (syncObj.syncCmd) {
    case 0: break;
    case 1: 

    default: alert("Sync has malfuctioned")
  }
}