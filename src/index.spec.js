import { expect } from 'chai'
import { Commands, Config, Logger } from './index'

describe('Root file', () => {
  it('exports Commands', () => {
    expect(Commands).to.be.ok
  })

  it('exports Config', () => {
    expect(Config).to.be.ok
  })

  it('exports Logger', () => {
    expect(Logger).to.be.ok
  })
})
