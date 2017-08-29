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
const index_1 = require("../index");
exports.DESC = 'Reports a local native-directory-index service PID, if any';
exports.COMMAND = 'pid';
exports.FAILURE = 'No native-directory-index service found.';
class Pid {
    constructor(givenOptions = {}) {
        const options = Object.assign({}, index_1.defaults, givenOptions);
        this.logger = options.logger;
        this.service = options.service;
    }
    toCommand() {
        return {
            command: exports.COMMAND,
            desc: exports.DESC,
            builder: () => { },
            handler: () => this.perform()
        };
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pid = yield this.service.pid();
                yield this.logger.info(`${pid}`);
            }
            catch (error) {
                yield this.logger.error(exports.FAILURE);
                yield this.logger.error(JSON.stringify(error));
            }
        });
    }
}
exports.default = Pid;
