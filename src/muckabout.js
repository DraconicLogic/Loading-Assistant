const products = require('./products.json')

console.log(Object.keys(products).length, "Number of all products")

const smallBales = Object.values(products).filter((product) => {
  if (product.baleSize === 'small') {
    return product
  }
})
console.log(smallBales.length, 'Number of small bales')



const currentSmallBales = smallBales.filter((bale) => {
  const depreciated = new Set (['TOY', 'BELT', 'JUMP', 'CCR', 'FLEECE', 'VC', 'LHB'])
  if (!depreciated.has(bale.code)) return bale
})
console.log(currentSmallBales.length, 'Number of bales still in use')


const uncommonBales = currentSmallBales.filter((bale) => {
  const uncommon = new Set(['BRA', 'LCND', 'NYCL', 'LSW', 'CORD', 'LEATHER', 'LDS','LDD', 'CANO', 'PYJ', 'ZIP', 'NYHHR', 'JUMP', 'ALS', 'BCSH', 'MSUIT', 'HAT', 'LSUIT', 'SLIP', 'NET', 'LWCB', 'MBS', 'GRD', 'SS', 'SC', 'PD', 'BLANKET', 'SSH', 'FTMAT', 'NHHR', 'LLJ'])
  if (uncommon.has(bale.code)) return bale
})
 console.log(uncommonBales.length, 'Number of uncommon bales')

 const commonBales = currentSmallBales.filter((bale) => {
  const uncommon = new Set(['BRA', 'LCND', 'NYCL', 'LSW', 'CORD', 'LEATHER', 'LDS','LDD', 'CANO', 'PYJ', 'ZIP', 'NYHHR', 'JUMP', 'ALS', 'BCSH', 'MSUIT', 'HAT', 'LSUIT', 'SLIP', 'NET', 'LWCB', 'MBS', 'GRD', 'SS', 'SC', 'PD', 'BLANKET', 'SSH', 'FTMAT', 'NHHR', 'LLJ'])
  if (!uncommon.has(bale.code)) return bale
})
 console.log(commonBales.length, 'Number of common bales')


const smallBaleKeys = smallBales.map((bale) => bale.code)

const sortedBales = smallBaleKeys.sort((a, b) => {
    return a.localeCompare(b)
  })
console.log(sortedBales[35])

const ak = sortedBales.filter((bale) => {
  bale.start
})

