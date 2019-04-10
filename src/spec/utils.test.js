import { saveContainer } from '../utils.js'
import testData2 from '../testData2' 

describe('saveContainer()', () => {
  it('test', () => {
    
    expect(saveContainer(testData2)).toBe(true)
  })
})