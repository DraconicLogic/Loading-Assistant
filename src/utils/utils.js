import * as api from "../services/api.js"
import dayjs from "dayjs";

export function findEmptyPosition (array) {
  let emptyPosition;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === undefined) {
      emptyPosition = i;
      break;
    }
  }
  return emptyPosition
}

export function getDate () {
  return new Date().toISOString()
}

export function formatDate(date) {
  return dayjs(date).format("DD/MM/YYYY")
}

export function accendingOrder (a, b) {
  return (a[1].date.localeCompare(b[1].date))
}

export function descendingOrder (a, b) {
  return -(a[1].date.localeCompare(b[1].date))
}

export function convertStacksToStateFormat (stackArray) {
  // stackArray should be an array of objects(stacks)
    return stackArray.reduce((stackObject, stack) => {
      const {content, date, stackId} = stack
      stackObject[stack.stackId] = {stackId, date, content};
      return stackObject;
    }, {});
}

export function convertStacksToStorageFormat (stateStacks) {
  // state stacks should be one object. properties are objects keyed with stackId

  // convert to array of objects
  return Object.values(stateStacks)
}

export function getLatest(stacks){
  return Object.values(stacks).reduce((latest, currentStack) => {
    console.log("Latest: ", latest)
    console.log("Current Stacks: ", currentStack)
    if (currentStack.date > latest.date) {
      latest = currentStack
    }
    return latest
  })
}

export async function syncData(localStacks){
  const remoteStacks = await api.getStacks()
  if (Object.values(localStacks).length) {
    const latestRemote = getLatest(remoteStacks)
    const latestLocal = getLatest(localStacks)
    switch (true) {
      case (latestLocal > latestRemote):
        console.log("Local is latest. Push to remote");
        return 1;
      case (latestRemote > latestLocal):
        console.log("Remote is latest. Pull from remote");
        return 2;
      case (latestLocal === latestRemote):
      console.log("Both equal probably. Take no action")
      return 3
      default: console.log("Somethings gone wrong.")
        return 3;
    }
  } else {
    console.log("Local Stacks: ", localStacks)
    console.log("There's no Stacks in local. Pull from remote")
    return 3
  }
}
  
export function listIDs(loadedStacks){
  // If this function is only used in StoredBales view this function should be just a helper of that component.

  if (loadedStacks.length > 0) {
    return loadedStacks.map(({stackId}) => stackId)
  }
  // Might be better to return a new Set
}

export function transformText(text) {
  const glossary = {
    PARTYDRESS: "PARTY DRESS",
    SCHUNI: "SCH UNI",
    WHAT: "W/S HAT",
    LEATHER: "LTHER",
    BLANKET: "BLNKT",
  };
  return glossary[text] ? glossary[text] : text;
}