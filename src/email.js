import emailjs from 'emailjs-com'
emailjs.init('user_wSKw4SLwUafUPs7wLvYEm')

function sendEmailToBoss(container){
  'SENDING EMAIL'
  const { date, sealNumber, containerNumber, containerContent } = container
  const templateParams = {
    date,
    sealNumber,
    containerNumber,
    baleNumber: containerContent.length,
    estimatedWeight: '20000kg'
  }
   
  emailjs.send('nnennaBoss','container_complete', templateParams)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => console.error(error))
}


export default sendEmailToBoss 