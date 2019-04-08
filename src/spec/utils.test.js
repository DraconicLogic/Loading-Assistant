import { checkForCurrent } from '../utils.js'


describe('checkForCurrent()', () => {
  it('returns true if current.json is present', () => {
    console.log(checkForCurrent())
    expect(checkForCurrent()).toBe(true)
  })
})