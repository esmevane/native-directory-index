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
exports.DESC = 'Stops a backgrounded native-directory-index service';
exports.COMMAND = 'stop';
exports.SUCCESS = 'native-directory-index service stopped.';
exports.FAILURE = 'Unable to stop native-directory-index service.';
class Stop {
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
                yield this.service.stop();
                yield this.logger.info(exports.SUCCESS);
            }
            catch (error) {
                yield this.logger.error(exports.FAILURE);
                yield this.logger.error(JSON.stringify(error));
            }
        });
    }
}
exports.default = Stop;
