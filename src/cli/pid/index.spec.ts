import { expect } from 'chai'
import { SpyLogger, SpyService } from '../../spec-helper'
import Pid from './index'

describe('Pid', () => {
  describe('#perform', () => {
    const logger = new SpyLogger()
    const service = new SpyService()
    const action = new Pid({ logger, service })
    const failure = 'No native-directory-index service found.'

    it('calls pid on the service', () => {
      return action
        .perform()
        .then(() => expect(service.wasCalled('pid')).to.be.true)
    })

    context('when successful', () => {
      const service = new SpyService()
      const action = new Pid({ logger, service })

      service.pid = async () => 1

      it('logs a confirmation', () => {
        return action
          .perform()
          .then(() => expect(logger.printedInfo('1')).to.be.true)
      })

      it("doesn't log an error message", () => {
        return action
          .perform()
          .then(() => expect(logger.printedError(failure)).to.be.false)
      })
    })

    context('when it encounters an error', () => {
      const logger = new SpyLogger()
      const service = new SpyService()
      const action = new Pid({ logger, service })

      service.pid = async () => {
        throw new Error('Uh oh!')
      }

      it('logs an error message', () => {
        return action
          .perform()
          .then(() => expect(logger.printedError(failure)).to.be.true)
      })

      it("doesn't log an info message", () => {
        return action
          .perform()
          .then(() => expect(logger.printedInfo('1')).to.be.false)
      })
    })
  })
})
