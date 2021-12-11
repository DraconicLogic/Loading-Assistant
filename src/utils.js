import * as api from "./api.js"
import * as local from "./local.js"

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
      stackObject[stack.stackId] = {content, date, stackId};
      return stackObject;
    }, {});
}

export function convertStacksToStorageFormat (stateStacks) {
  // state stacks should be one object. properties are objects keyed with stackId

  // convert to array of objects
  return Object.values(stateStacks)
}

export async function syncCheck(){
  
}
