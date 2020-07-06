import React from 'react'
import ContainerOverview from '../components/ContainerOverview.jsx'
import {render, fireEvent, cleanup} from '@testing-library/react'

const testStacks = {
  '123': ["LMP", "LMP", "LMP"],
  '456': ["BPT", "BPT", "BPT"]
}

const testContainerContent = [
  {"stackContent":["AC","AC","AC","AC","AC","AC","AC","AC","AC","AC","AC","AC"]},{"stackContent":["FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT","FT MAT"]},
  {"stackContent":["ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS","ATS"]},
  {"stackContent":["NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR","NYHHR"]}
]

afterEach(cleanup)

test('Product selected are added to the stack editor', () => {
  const {getByText,getByTestId, debug} = render(
    <ContainerOverview 
      containerDetails={{
        containerContent:testContainerContent
      }} 
      update={() => console.log('UPDATE CONTAINER AND SEAL NUMBERS')}
      finish={() => console.log('FINISH CONTAINER')}
    />
  )
  
  // const stackEditor = getByTestId('stack')
  const product = getByText('AC')
  const stackSlot = getByTestId('stack-slot_1')
  
  fireEvent.click(product)
  console.log('STACK SLOT: ', stackSlot.innerHTML)
  console.log('STACK SLOT: ', stackSlot.innerText)

  expect(stackSlot.innerHTML).toBe('AC')
  
})