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
const child_process_1 = require("child_process");
const path_1 = require("path");
const filePromises_1 = require("./filePromises");
const config_1 = require("../config");
const server_1 = require("../server");
const config = new config_1.default();
const server = new server_1.default({ config });
const { kill } = process;
exports.defaults = { config, server, spawn: child_process_1.spawn, kill };
class Service {
    constructor(givenOptions = {}) {
        this.SERVE_METHOD = 'serve';
        const options = Object.assign({}, exports.defaults, givenOptions);
        this.config = options.config;
        this.kill = options.kill;
        this.server = options.server;
        this.spawn = options.spawn;
    }
    get pidfile() {
        return path_1.resolve('/tmp', `native-directory-index-${this.config.environment}.pid`);
    }
    pid() {
        return __awaiter(this, void 0, void 0, function* () {
            const contents = yield filePromises_1.read(this.pidfile, 'utf-8');
            return parseInt(contents);
        });
    }
    serve() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.start();
            return this.server;
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const [executable, fileName] = process.argv;
            const options = { detached: true, stdio: 'ignore' };
            try {
                yield this.pid();
            }
            catch (error) {
                const server = this.spawn(executable, [fileName, this.SERVE_METHOD], options);
                server.unref();
                yield filePromises_1.write(this.pidfile, server.pid);
            }
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            const pid = yield this.pid();
            this.kill(pid);
            yield filePromises_1.unlink(this.pidfile).catch(() => { });
        });
    }
}
exports.default = Service;
