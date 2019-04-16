import React, { useState } from 'react'

const ContainerSealForm = ({update, containerDetails}) => {
  const { containerNumber, sealNumber } = containerDetails
  const [container, setContainerNumber] = useState('')
  const [seal, setSealNumber] = useState('')

  console.log(update)
  const handleForm = (event) => {
    const { value, name } = event.target
    if (name === 'container') setContainerNumber(value)
    if (name === 'seal') setSealNumber(value)
  }

  const handleSubmit = (event) => {
    console.log('HANDLE SUMBIT')
    console.log(event.target.value)
    const { value } = event.target
    //TODO: Once Saved we appear to be locked out form editing the seal and container numbers. FIX PLEASE
    const details = {
      containerNumber: value === 'Edit' ? '' : container,
      sealNumber: value === 'Edit' ? '' : seal
    }
    update(details)
  }

  return (
    <div>
        <label htmlFor="container">Container Number</label>
        <input type="text" name="container" disabled={containerNumber ? true : false} onChange={handleForm}></input>

        <label htmlFor="seal">Seal Number</label>
        <input type="text" disabled={sealNumber ? true : false} name="seal" onChange={handleForm}></input>

        <button onClick={handleSubmit}>{containerNumber && sealNumber ? 'Edit' : 'Save'}</button>
      </div>
  )
}

export default ContainerSealForm;
