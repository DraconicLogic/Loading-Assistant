import axios from 'axios'
const {REACT_APP_API_URL} = process.env

export function saveStackToDB(newStack){
  const url = `${REACT_APP_API_URL}/stacks`
  return axios.post(url,{newStack})
  .then((savedStack) => {
    return savedStack.data.createdStack
  })
  .catch((error) => console.error(error))
}

export function getStacks(){
  const url = `${REACT_APP_API_URL}/stacks`
  const requestConfig = {
    headers: {"Access-Control-Allow-Origin": "http://localhost:3000"},
  }
  return axios.get(url, requestConfig)
    .then((stacks) => {
      return stacks.data.stacks
    })
    .catch((error) => console.error(error))
}

export function saveContainerToDB(newContainer){
  const url = `${REACT_APP_API_URL}/containers`
  return axios.post(url, {newContainer})
  .then((savedContainer) => {
    return savedContainer.data
  })
  .catch((error) => console.error(error))
}

export function cleanupStackIDs(usedCodes){
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

export function getProducts() {
  const url = `${REACT_APP_API_URL}/products`
  const requestConfig = {
    headers: {"Access-Control-Allow-Origin": "http://localhost:3000"},
  }
  return axios.get(url, requestConfig)
    .then((products) => {
      return products.data.products
    })
    .catch((error) => console.error(error))
  
}