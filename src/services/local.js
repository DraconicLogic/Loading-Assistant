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

export async function cleanupLocalStackIDs(usedCodes){
  const currentStacks = JSON.parse(localStorage.getItem("stacks"))
  const cleanedStacks = currentStacks.filter((stack) => (
    !usedCodes.some(stack.stackId)
  ))
  const deletedStacks = currentStacks.filter((stack) => (
    usedCodes.some(stack.stackId)
  ))
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
  const savedContainersLocal = JSON.parse(
    localStorage.getItem("containers")
  )
  
  savedContainersLocal.push(newContainer)
}