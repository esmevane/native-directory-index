import { expect } from 'chai'
import { SpyLogger, SpyService } from '../../spec-helper'
import Stop from './index'

describe('Stop', () => {
  describe('#perform', () => {
    const logger = new SpyLogger()
    const service = new SpyService()
    const action = new Stop({ logger, service })
    const failure = 'Unable to stop native-directory-index service.'
    const success = 'native-directory-index service stopped.'

    it('calls stop on the service', () => {
      return action
        .perform()
        .then(() => expect(service.wasCalled('stop')).to.be.true)
    })

    context('when successful', () => {
      it('logs a confirmation', () => {
        return action
          .perform()
          .then(() => expect(logger.printedInfo(success)).to.be.true)
      })

      it("doesn't log an error message", () => {
        return action
          .perform()
          .then(() => expect(logger.printedError(failure)).to.be.false)
      })
    })

    context('when it encounters an error', () => {
      const service = new SpyService()
      const cli = new Stop({ logger, service })

      service.stop = async () => {
        throw new Error('Uh oh!')
      }

      it('logs an error message', () => {
        return cli
          .perform()
          .then(() => expect(logger.printedError(failure)).to.be.true)
      })

      it("doesn't log an info message", () => {
        return cli
          .perform()
          .then(() => expect(logger.printedInfo(failure)).to.be.false)
      })
    })
  })
})
