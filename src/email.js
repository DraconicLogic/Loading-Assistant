import emailjs from 'emailjs-com'
emailjs.init('user_wSKw4SLwUafUPs7wLvYEm')

function sendEmailToBoss(container){
  'SENDING EMAIL'
  const { date, sealNumber, containerNumber, containerContent } = container
  const flatContainer = containerContent
    .reduce((flattened, stackObj) => {
      flattened.push(stackObj.content);
      return flattened;
    }, [])
    .flat(1);
  
  const containerObject = flatContainer.reduce((obj, product) => {
    if (!obj[product]) obj[product] = 1
    else obj[product] += 1
    return obj
  },{})

  const tally = Object.entries(containerObject)
  console.log("Container Object",containerObject)
  const templateParams = {
    date,
    sealNumber,
    containerNumber,
    baleNumber: flatContainer.length,
    estimatedWeight: '20000kg', 
    content: [...tally]
  }
   
  emailjs.send('nnennaBoss','container_complete', templateParams)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => console.error(error))
}


export default sendEmailToBoss 