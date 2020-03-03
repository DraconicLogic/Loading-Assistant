import react from 'react'
import StoredBales from '../components/StoredBales.jsx'
import {render} from '@testing-library/react'


describe('StoredBales Component', () => {
  it('Automatically displays stacks when Stack ID fields are filled', () => {
    const addFunc = () => console.log('Add to container')
    const saveFunc = () => console.log('Collect Stack ID')
    const testStacks = {'123': ['AC','AC','AC','AC','AC','AC','AC','AC','AC','AC','AC','AC']}
    render(
      // <StoredBales stacks={testStacks} />
    )
  })
})   