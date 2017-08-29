import { expect } from 'chai'
import { SpyServer } from '../spec-helper'
import { write, unlink, stat } from './filePromises'
import Config from '../config'
import Service from './index'

describe(Service.name, () => {
  describe('#pid', () => {
    const server = new SpyServer()
    const service = new Service({ server })

    describe('if the pidfile exists', () => {
      it('returns the contents', () => {
        const pid = 12345

        return write(service.pidfile, pid)
          .then(() => service.pid())
          .then((subject: any) => expect(subject).to.eql(pid))
          .then(() => unlink(service.pidfile))
      })
    })

    describe('otherwise', () => {
      it('it throws an ENOENT error', () => {
        return service
          .pid()
          .catch((subject: any) => expect(subject.code).to.eql('ENOENT'))
      })
    })
  })

  describe('#pidfile', () => {
    const server = new SpyServer()
    const environment = 'service'
    const config = new Config({ environment })
    const service = new Service({ config, server })

    it('defaults to /tmp/native-directory-index-<Config.environment>.pid', () => {
      expect(service.pidfile).to.eql(
        `/tmp/native-directory-index-${environment}.pid`
      )
    })
  })

  describe('#serve', () => {
    const server = new SpyServer()
    const service = new Service({ server })

    it('starts the server', () => {
      service.serve()

      expect(server.started).to.be.true
    })
  })

  describe('#stop', () => {
    let wasKilled: number | boolean = false

    const id = 12345
    const kill = (id: number) => (wasKilled = id)
    const server = new SpyServer()
    const service = new Service({ server, kill })

    describe('if there is no pidfile', () => {
      it("doesn't do anything", () => {
        return service
          .stop()
          .catch(_error => {})
          .then(() => expect(wasKilled).to.be.false)
      })

      it('returns an ENOENT error', () => {
        return service
          .stop()
          .catch((subject: any) => expect(subject.code).to.eql('ENOENT'))
      })
    })

    describe('if there is a pidfile', () => {
      it('kills the pidfile ID', () => {
        return write(service.pidfile, id)
          .then(() => service.stop())
          .then(() => expect(wasKilled).to.eql(id))
      })

      it('removes the pidfile', () => {
        return write(service.pidfile, id)
          .then(() => service.stop())
          .then(() => service.pid())
          .then(() => {
            throw new Error(
              "We shouldn't see this error if the pidfile is missing"
            )
          })
          .catch((subject: any) => expect(subject.code).to.eql('ENOENT'))
      })
    })
  })

  describe('#start', () => {
    let spawnedParams: any[]
    let wasUnreferenced: boolean = false

    const spawn = (...params: any[]) => {
      spawnedParams = params

      return { unref: () => (wasUnreferenced = true) }
    }

    const server = new SpyServer()
    const service = new Service({ server, spawn })

    afterEach(() => unlink(service.pidfile))

    describe('if the pidfile exists', () => {
      it("doesn't start the server", () => {
        const pid = 12345

        return write(service.pidfile, pid)
          .then(() => service.start())
          .then(() => expect(server.started).to.be.false)
      })
    })

    describe('otherwise', () => {
      it('creates a pidfile', () => {
        return service
          .start()
          .then(() => stat(service.pidfile))
          .then(stat => expect(stat).to.be.ok)
      })

      it('it calls service.spawn with the right arguments', () => {
        const [executable, fileName] = process.argv
        const expectation = [
          executable,
          [fileName, 'serve'],
          { detached: true, stdio: 'ignore' }
        ]

        return service
          .start()
          .then(() => expect(spawnedParams).to.eql(expectation))
          .then(() => (server.started = false))
      })

      it('it unreferences the spawned server', () => {
        return service.start().then(() => expect(wasUnreferenced).to.be.true)
      })
    })
  })
})
