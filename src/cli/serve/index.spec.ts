import { expect } from 'chai'
import { SpyLogger, SpyService } from '../../spec-helper'
import Serve from './index'

describe('Serve', () => {
  describe('#perform', () => {
    const logger = new SpyLogger()
    const service = new SpyService()
    const action = new Serve({ logger, service })
    const failure = 'Unable to start native-directory-index service.'
    const success = 'native-directory-index service started.'

    it('calls serve on the service', () => {
      return action
        .perform()
        .then(() => expect(service.wasCalled('serve')).to.be.true)
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
      const cli = new Serve({ logger, service })

      service.serve = async () => {
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
