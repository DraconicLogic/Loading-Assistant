import React from 'react'
import StoredBales from '../components/StoredBales.jsx'
import {render, fireEvent} from '@testing-library/react'




describe('StoredBales Functionality', () => {
  const testStacks = {
    '123': ["LMP", "LMP", "LMP"],
    '456': ["BPT", "BPT", "BPT"]
  }

  it('Automatically displays stacks when Stack ID fields are filled', () => {
    
    const {getByTestId} = render(
      <StoredBales 
      stacks={testStacks} 
      add={() => console.log('ADDED')}
      saveUsedCode={() => console.log('SAVED')}
      />
    )
  
    const stackID_1 = getByTestId('stackID_1')
    const stackID_2 = getByTestId('stackID_2')
    const stackID_3 = getByTestId('stackID_3')

    fireEvent.change(stackID_1, {target: {value: '1'}})
    fireEvent.change(stackID_2, {target: {value: '2'}})
    fireEvent.change(stackID_3, {target: {value: '3'}}) 

    const stackSlot1 = getByTestId('stack-slot_1').innerHTML

    const stackSlot2 = getByTestId('stack-slot_2').innerHTML
    const stackSlot3 = getByTestId('stack-slot_3').innerHTML
    
    expect(stackSlot1).toBe('LMP')
    expect(stackSlot2).toBe('LMP')
    expect(stackSlot3).toBe('LMP')
  })
  it('Calls add function with recalled stack',() => {
    const addFunc = jest.fn()

    const {getByTestId} = render(
      <StoredBales
        stacks={testStacks}
        add={addFunc}
        saveUsedCode={() => console.log('SAVED')}
      />
    )

    const stackID_1 = getByTestId('stackID_1')
    const stackID_2 = getByTestId('stackID_2')
    const stackID_3 = getByTestId('stackID_3')
    const addButton = getByTestId('add-to-container')

    fireEvent.change(stackID_1, {target: {value: '4'}})
    fireEvent.change(stackID_2, {target: {value: '5'}})
    fireEvent.change(stackID_3, {target: {value: '6'}}) 
    fireEvent.click(addButton)

    expect(addFunc).toHaveBeenCalled()
    expect(addFunc).toHaveBeenCalledWith(testStacks[456])
  
  })
})   