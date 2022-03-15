import React from 'react'
import ProductList from '../components/ProductList.jsx'
import {render, fireEvent, cleanup} from '@testing-library/react'

const testStacks = {
  '123': ["LMP", "LMP", "LMP"],
  '456': ["BPT", "BPT", "BPT"]
}

afterEach(cleanup)

test('Product selected are added to the stack editor', () => {
  const {getByText,getByTestId, debug} = render(
    <ProductList 
      add={() => console.log('ADD TO CONTAINER')} 
      addStackToDB={() => console.log('ADD STACK TO DB')}
      savedStacks={testStacks}
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

test('Save stack to database', () => {
  const addToDB = jest.fn()
  
  const {getByText, getByTestId, debug} = render(
    <ProductList
    add={() => console.log('ADD TO CONTAINER')} 
    addStackToDB={addToDB}
    savedStacks={testStacks}
    />
    )
  const product = getByText('ATS')
  const saveButton = getByTestId('save-to-DB')

  let i = 12
  while (i > 0) {
    fireEvent.click(product)
    i--
  }
  // debug()
  fireEvent.click(saveButton)

  expect(addToDB).toHaveBeenCalled()
  expect(addToDB).toHaveBeenCalledWith(expect.objectContaining({
    "content": ["ATS", "ATS", "ATS", "ATS", "ATS", "ATS", "ATS", "ATS", "ATS", "ATS", "ATS", "ATS"]
  }))

  
    
  
})

test('Overwrite product in the stack editor', () => {
  const { debug, getByText, getByTestId } = render(
    <ProductList
    add={() => console.log('ADD TO CONTAINER')} 
    addStackToDB={() => console.log('ADD TO DB')}
    savedStacks={testStacks}
    />
  )

  const productOne = getByText("CR")
  const productTwo = getByText("HHR")
  const stackSlot = getByTestId('stack-slot_1')

  fireEvent.click(productOne)
  fireEvent.click(stackSlot)
  fireEvent.click(productTwo)

  expect(stackSlot.innerText).toBe('HHR')

})
