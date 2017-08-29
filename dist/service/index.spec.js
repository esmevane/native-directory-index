"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const spec_helper_1 = require("../spec-helper");
const filePromises_1 = require("./filePromises");
const config_1 = require("../config");
const index_1 = require("./index");
describe(index_1.default.name, () => {
    describe('#pid', () => {
        const server = new spec_helper_1.SpyServer();
        const service = new index_1.default({ server });
        describe('if the pidfile exists', () => {
            it('returns the contents', () => {
                const pid = 12345;
                return filePromises_1.write(service.pidfile, pid)
                    .then(() => service.pid())
                    .then((subject) => chai_1.expect(subject).to.eql(pid))
                    .then(() => filePromises_1.unlink(service.pidfile));
            });
        });
        describe('otherwise', () => {
            it('it throws an ENOENT error', () => {
                return service
                    .pid()
                    .catch((subject) => chai_1.expect(subject.code).to.eql('ENOENT'));
            });
        });
    });
    describe('#pidfile', () => {
        const server = new spec_helper_1.SpyServer();
        const environment = 'service';
        const config = new config_1.default({ environment });
        const service = new index_1.default({ config, server });
        it('defaults to /tmp/native-directory-index-<Config.environment>.pid', () => {
            chai_1.expect(service.pidfile).to.eql(`/tmp/native-directory-index-${environment}.pid`);
        });
    });
    describe('#serve', () => {
        const server = new spec_helper_1.SpyServer();
        const service = new index_1.default({ server });
        it('starts the server', () => {
            service.serve();
            chai_1.expect(server.started).to.be.true;
        });
    });
    describe('#stop', () => {
        let wasKilled = false;
        const id = 12345;
        const kill = (id) => (wasKilled = id);
        const server = new spec_helper_1.SpyServer();
        const service = new index_1.default({ server, kill });
        describe('if there is no pidfile', () => {
            it("doesn't do anything", () => {
                return service
                    .stop()
                    .catch(_error => { })
                    .then(() => chai_1.expect(wasKilled).to.be.false);
            });
            it('returns an ENOENT error', () => {
                return service
                    .stop()
                    .catch((subject) => chai_1.expect(subject.code).to.eql('ENOENT'));
            });
        });
        describe('if there is a pidfile', () => {
            it('kills the pidfile ID', () => {
                return filePromises_1.write(service.pidfile, id)
                    .then(() => service.stop())
                    .then(() => chai_1.expect(wasKilled).to.eql(id));
            });
            it('removes the pidfile', () => {
                return filePromises_1.write(service.pidfile, id)
                    .then(() => service.stop())
                    .then(() => service.pid())
                    .then(() => {
                    throw new Error("We shouldn't see this error if the pidfile is missing");
                })
                    .catch((subject) => chai_1.expect(subject.code).to.eql('ENOENT'));
            });
        });
    });
    describe('#start', () => {
        let spawnedParams;
        let wasUnreferenced = false;
        const spawn = (...params) => {
            spawnedParams = params;
            return { unref: () => (wasUnreferenced = true) };
        };
        const server = new spec_helper_1.SpyServer();
        const service = new index_1.default({ server, spawn });
        afterEach(() => filePromises_1.unlink(service.pidfile));
        describe('if the pidfile exists', () => {
            it("doesn't start the server", () => {
                const pid = 12345;
                return filePromises_1.write(service.pidfile, pid)
                    .then(() => service.start())
                    .then(() => chai_1.expect(server.started).to.be.false);
            });
        });
        describe('otherwise', () => {
            it('creates a pidfile', () => {
                return service
                    .start()
                    .then(() => filePromises_1.stat(service.pidfile))
                    .then(stat => chai_1.expect(stat).to.be.ok);
            });
            it('it calls service.spawn with the right arguments', () => {
                const [executable, fileName] = process.argv;
                const expectation = [
                    executable,
                    [fileName, 'serve'],
                    { detached: true, stdio: 'ignore' }
                ];
                return service
                    .start()
                    .then(() => chai_1.expect(spawnedParams).to.eql(expectation))
                    .then(() => (server.started = false));
            });
            it('it unreferences the spawned server', () => {
                return service.start().then(() => chai_1.expect(wasUnreferenced).to.be.true);
            });
        });
    });
});
