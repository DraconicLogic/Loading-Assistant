import axios from 'axios'
import * as utils from "../utils/utils.js"
const {REACT_APP_API_URL} = process.env

const stacksUrl = `${REACT_APP_API_URL}/stacks`
const containersUrl = `${REACT_APP_API_URL}/containers`
const productsUrl = `${REACT_APP_API_URL}/products`

export async function saveStackDB(newStack){
  return axios.post(stacksUrl,{newStack})
  .then((savedStack) => {
    return savedStack.data.createdStack
  })
  .catch((error) => {
    console.log("Save Stack DB error")
    console.log(typeof error)
    console.error(error)})
    
}

export async function getStacks(){
  const requestConfig = {
    headers: {"Access-Control-Allow-Origin": "http://localhost:3000"},
  }
  return axios.get(stacksUrl, requestConfig)
    .then((response) => {
      console.log("Stacks from remote DB: ",response)
      const {stacks, lastEdited} = response.data
      return {
        stacks: utils.convertStacksToStateFormat(
        stacks
        ),
        lastEdited
      }
    })
    .catch((error) => {
      console.log("GET STACKS ERROR") 
      console.log(error) 
      console.error(error)
      alert("There probably an error with the network here")
    })
}

export async function saveContainerToDB(newContainer){
  return axios.post(containersUrl, {newContainer})
  .then((savedContainer) => {
    return savedContainer.data.createdContainer
  })
  .catch((error) => console.error(error))
}

export async function cleanupStackIDs(usedCodes){
   const requestConfig = {
     data: {usedCodes}
   }
   return axios.delete(stacksUrl, requestConfig)
    .then((deleteReport) => {
      console.log("api delete report: ", deleteReport)
      return deleteReport
    })
    .catch((error) => console.error(error))
}

export async function getProducts() {
  const requestConfig = {
    headers: {"Access-Control-Allow-Origin": "http://localhost:3000"},
  }
  console.log("api.getProducts called")
  return await axios.get(productsUrl, requestConfig)
    .then((products) => {
      console.log("products from api: ", products)
      return products.data.products
    })
    .catch((error) => console.error(error))
  
}

export async function overwriteStacks(payload){
  const body = {
    newStacks: utils.convertStacksToStorageFormat(payload)
  }
  return axios.put(stacksUrl, body)
  .then(({data}) => {
    console.log("Created Stacks after overwrite: ",
    data)
    return utils.convertStacksToStateFormat(data.createdStacks)
  })
}
