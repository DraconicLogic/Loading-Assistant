import * as utils from "./utils.js"

export async function saveStackLocal(newStack) {
  const savedStacksLocal = JSON.parse(localStorage.getItem("stacks")) || []
  savedStacksLocal.push(newStack)
  localStorage.setItem("stacks", JSON.stringify(savedStacksLocal))
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