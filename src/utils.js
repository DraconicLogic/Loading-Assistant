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
  console.log("getDate() ", currentDate)
  const day = currentDate.getDate()
  const month = (currentDate.getMonth() + 1)
  const year = currentDate.getFullYear()
  return (`${day}-${month}-${year}`)
}

export function accendingOrder (a, b) {
  return (a[1].date.localeCompare(b[1].date))
}

export function descendingOrder (a, b) {
  return -(a[1].date.localeCompare(b[1].date))
}
