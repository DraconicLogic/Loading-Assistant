import axios from 'axios'
const nnennaAPI = 'https://nnenna-textiles-api.appspot.com/api'

export function saveStackToDB(stack){
 
  console.log("PAYLOAD TO SEND TO API: ",stack)
  const url = `${nnennaAPI}/stacks`
  console.log('SENDING POST REQUEST', url)
  
  return axios.post(url,stack)
  .then((savedStack) => {
    console.log(savedStack)
    return savedStack.data
  })
  .catch((error) => console.error(error))
}

export function getStacks(){
  const url = `${nnennaAPI}/stacks`
  return axios.get(url)
    .then((stacks) => {
      console.log(stacks)
      return stacks.data
    })
    .catch((error) => console.error(error))
}

export function saveContainerToDB(container){
  console.log("PAYLOAD TO SEND TO API: ",container)
  const url = `${nnennaAPI}/containers`
  return axios.post(url, container)
  .then((savedContainer) => {
    console.log(savedContainer)
    return savedContainer.data
  })
  .catch((error) => console.error(error))
}