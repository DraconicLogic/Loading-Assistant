import axios from 'axios'
const {REACT_APP_API_URL} = process.env
// const nnennaAPI = 'https://nnenna-textiles-api.appspot.com/api'

export function saveStackToDB(newStack){
  const url = `${REACT_APP_API_URL}/stacks`
  return axios.post(url,{newStack})
  .then((savedStack) => {
    console.log(savedStack)
    return savedStack.data.createdStack
  })
  .catch((error) => console.error(error))
}

export function getStacks(){
  const url = `${REACT_APP_API_URL}/stacks`
  return axios.get(url)
    .then((stacks) => {
      console.log(stacks)
      return stacks.data.stacks
    })
    .catch((error) => console.error(error))
}

export function saveContainerToDB(newContainer){
  console.log("PAYLOAD TO SEND TO API: ",newContainer)
  const url = `${REACT_APP_API_URL}/containers`
  return axios.post(url, {newContainer})
  .then((savedContainer) => {
    console.log(savedContainer)
    return savedContainer.data
  })
  .catch((error) => console.error(error))
}