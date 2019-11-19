import axios from 'axios'
import {getDate} from './utils.js'
const nnennaAPI = 'http://localhost:4000/api'

export function saveStackToDB(stack){
 
  console.log("PAYLOAD TO SEND TO API: ",stack)
  const url = `${nnennaAPI}/stacks`
  console.log('SENDING POST REQUEST', url)
  
  return axios.post(url,stack)
  .then((savedStack) => {
    console.log(savedStack)
    return savedStack
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