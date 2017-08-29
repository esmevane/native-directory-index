"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const spec_helper_1 = require("../../spec-helper");
const index_1 = require("./index");
describe('Stop', () => {
    describe('#perform', () => {
        const logger = new spec_helper_1.SpyLogger();
        const service = new spec_helper_1.SpyService();
        const action = new index_1.default({ logger, service });
        const failure = 'Unable to stop native-directory-index service.';
        const success = 'native-directory-index service stopped.';
        it('calls stop on the service', () => {
            return action
                .perform()
                .then(() => chai_1.expect(service.wasCalled('stop')).to.be.true);
        });
        context('when successful', () => {
            it('logs a confirmation', () => {
                return action
                    .perform()
                    .then(() => chai_1.expect(logger.printedInfo(success)).to.be.true);
            });
            it("doesn't log an error message", () => {
                return action
                    .perform()
                    .then(() => chai_1.expect(logger.printedError(failure)).to.be.false);
            });
        });
        context('when it encounters an error', () => {
            const service = new spec_helper_1.SpyService();
            const cli = new index_1.default({ logger, service });
            service.stop = () => __awaiter(this, void 0, void 0, function* () {
                throw new Error('Uh oh!');
            });
            it('logs an error message', () => {
                return cli
                    .perform()
                    .then(() => chai_1.expect(logger.printedError(failure)).to.be.true);
            });
            it("doesn't log an info message", () => {
                return cli
                    .perform()
                    .then(() => chai_1.expect(logger.printedInfo(failure)).to.be.false);
            });
        });
    });
});
