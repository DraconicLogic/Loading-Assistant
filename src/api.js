import axios from 'axios'
import {getDate} from './utils.js'
const nnennaAPI = 'http://localhost:4000/api'

export function saveStackToDB(stack){
  const stackObj = {
    content: stack,
    date: getDate()
  }
  console.log("PAYLOAD TO SEND TO API: ",stackObj)
  const url = `${nnennaAPI}/stacks`
  console.log('SENDING POST REQUEST', url)
  
  return axios.post(url,stackObj)
  .then((savedStack) => {
    console.log(savedStack)
    return savedStack
  })
  .catch((error) => console.error(error))
}