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
