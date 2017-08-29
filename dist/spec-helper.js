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
const contains = (list, item) => list.indexOf(item) > -1;
class SpyServer {
    constructor(started = false) {
        this.started = started;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () { this.started = true; });
    }
}
exports.SpyServer = SpyServer;
class SpyLogger {
    constructor() {
        this.infoOutput = [];
        this.errorOutput = [];
    }
    printedError(message) { return contains(this.errorOutput, message); }
    printedInfo(message) { return contains(this.infoOutput, message); }
    info(message) { this.infoOutput.push(message); }
    error(message) { this.errorOutput.push(message); }
}
exports.SpyLogger = SpyLogger;
class SpyService {
    constructor() {
        this.triggers = [];
    }
    wasCalled(method) { return contains(this.triggers, method); }
    start() {
        return __awaiter(this, void 0, void 0, function* () { this.triggers.push("start"); });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () { this.triggers.push("stop"); });
    }
    pid() {
        return __awaiter(this, void 0, void 0, function* () {
            this.triggers.push("pid");
            return undefined;
        });
    }
    serve() {
        return __awaiter(this, void 0, void 0, function* () {
            this.triggers.push("serve");
            return { start: () => __awaiter(this, void 0, void 0, function* () { }) };
        });
    }
}
exports.SpyService = SpyService;
