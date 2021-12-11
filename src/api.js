import axios from 'axios'
import * as utils from "./utils.js"
const {REACT_APP_API_URL} = process.env

export async function saveStackDB(newStack){
  const url = `${REACT_APP_API_URL}/stacks`
  return axios.post(url,{newStack})
  .then((savedStack) => {
    return savedStack.data.createdStack
  })
  .catch((error) => {
    console.log("Save Stack DB error")
    console.error(error)})
}

export async function getStacks(){
  const url = `${REACT_APP_API_URL}/stacks`
  const requestConfig = {
    headers: {"Access-Control-Allow-Origin": "http://localhost:3000"},
  }
  return axios.get(url, requestConfig)
    .then((stacks) => {
      return utils.convertStacksToStateFormat(
        stacks.data.stacks
      )
    })
    .catch((error) => console.error(error))
}

export async function saveContainerToDB(newContainer){
  const url = `${REACT_APP_API_URL}/containers`
  return axios.post(url, {newContainer})
  .then((savedContainer) => {
    return savedContainer.data
  })
  .catch((error) => console.error(error))
}

export async function cleanupStackIDs(usedCodes){
   const url = `${REACT_APP_API_URL}/stacks`
   const requestConfig = {
     data: {usedCodes}
   }
   return axios.delete(url, requestConfig)
    .then((deleteReport) => {
      return deleteReport
    })
    .catch((error) => console.error(error))
}

export async function getProducts() {
  const url = `${REACT_APP_API_URL}/products`
  const requestConfig = {
    headers: {"Access-Control-Allow-Origin": "http://localhost:3000"},
  }
  console.log("api.getProducts called")
  return await axios.get(url, requestConfig)
    .then((products) => {
      console.log("products from api: ", products)
      return products.data.products
    })
    .catch((error) => console.error(error))
  
}

export async function getLastEdited(){
  // TODO: Request last edited date and return
}