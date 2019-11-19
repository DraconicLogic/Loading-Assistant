export function generateCode() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const newCode = {
    firstDigit: getRandomInt(10),
    secondDigit: getRandomInt(10),
    thirdDigit: getRandomInt(10)
  }
  const formatedCode = (`${newCode.firstDigit}${newCode.secondDigit}${newCode.thirdDigit}`)
  return formatedCode
}

export function generateUniqueCode(currentCodes) {
  let uniqueCode = null;
  while (uniqueCode === null) {
    const newCode = generateCode()
    if (!currentCodes[newCode]) {
      uniqueCode = newCode
    }
  }
  return uniqueCode
}


