import * as utils from "../utils/utils.js"

export async function saveStackLocal(newStack) {
  const savedStacksLocal = JSON.parse(
    localStorage.getItem("stacks")
  ) || []
  savedStacksLocal.push(newStack)
  localStorage.setItem("stacks", JSON.stringify(savedStacksLocal))
  localStorage.setItem("lastEdited", newStack.date)
  return;
}

export function saveUnsentStack(newStack){
  const unsentStacks = JSON.parse(
    localStorage.getItem("unsentStacks") 
  ) || []
  unsentStacks.push(newStack)
  localStorage.setItem("unsentStacks", JSON.stringify(unsentStacks))
  alert(`Stack ${newStack.stackId} failed to upload to cloud.`)
}

export function getUnsentStacks(){
  return (
    JSON.parse(localStorage.getItem("unsentStacks"))
  )
}

export function getStacks(){
  return utils.convertStacksToStateFormat(
    JSON.parse(localStorage.getItem("stacks"))
  )
}

export function getProducts(){
  return JSON.parse(localStorage.getItem("products"))
}

export async function setProducts(products){
  localStorage.setItem("products", JSON.stringify(products))
}

export function cleanupLocalStackIDs(usedCodes){
  // Get stacks from localStorage
  // remove stacks that match stackid in used codes

  console.log("Used Codes: ", usedCodes)
  const currentStacks = JSON.parse(localStorage.getItem("stacks"))

  // Examine cleanedStacks & deletedStack more closely to fully comprehened whats happing
  const cleanedStacks = currentStacks.filter((stack) => {
    return usedCodes.every((usedStackId) => {
      return usedStackId !== stack.stackId
    })
  })

  const deletedStacks = currentStacks.filter((stack) => {
    return usedCodes.some((usedStackId) => {
      return usedStackId === stack.stackId
    })
  })
  console.log("cleanedStacks: ", cleanedStacks)
  console.log("deletedStacks: ",deletedStacks)

  
  localStorage.setItem("stacks",JSON.stringify(cleanedStacks))
  return deletedStacks
}

export function getLastEdited(){
  return localStorage.getItem("lastEdited")
}

export function setLastEdited(lastEdited){
  localStorage.setItem("lastEdited", lastEdited)

}

export function overwriteStacks(newStacks){
  console.log("Stacks to overwrite: ", newStacks)
  const formattedStacks = JSON.stringify(
    utils.convertStacksToStorageFormat(newStacks)
  )
  console.log("Formatted before storage: ", formattedStacks)
  localStorage.setItem("stacks", formattedStacks)

}

export function saveContainer(newContainer){
  const {date} = newContainer
  console.log("newContainer: ", newContainer)
  const savedContainersLocal = JSON.parse(
    localStorage.getItem("containers")
  )
  
  savedContainersLocal[date] = newContainer
  localStorage.setItem("containers", JSON.stringify(savedContainersLocal))
}