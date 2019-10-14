
// Wo;; probably remove this
// import {db, options} from './config.js'

export function findEmptyPosition (array) {
  let emptyPosition;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === undefined) {
      emptyPosition = i;
      break;
    }
  }
  return emptyPosition
}

export function getDate () {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = (currentDate.getMonth() + 1)
  const year = currentDate.getFullYear()
  return (`${day}-${month}-${year}`)
}


// TODO: This function needs rewriting. Will probably send a request to api
// export function saveContainer (container) {
//   const { containerOverview, ...data } = container
//   return fetch((db.url + db.binRoute), {...options, body: JSON.stringify(data), name: (data.date)})
//     .then((res) => {
//       const { data } = res.json()
//       console.log(res.json())
//       console.log(res)
//       console.log(data)
//       return data
//     })
//     .catch((err) => {
//       console.error(err)
//     })
// }