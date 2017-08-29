"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const service_1 = require("../service");
const pid_1 = require("./pid");
const serve_1 = require("./serve");
const start_1 = require("./start");
const stop_1 = require("./stop");
exports.defaults = {
    service: new service_1.default(),
    logger: new logger_1.default()
};
class Cli {
    constructor(givenOptions = {}) {
        const options = Object.assign({}, exports.defaults, givenOptions);
        const { logger, service } = options;
        this.logger = logger;
        this.service = service;
        this.actions = {
            pid: new pid_1.default({ logger, service }).toCommand(),
            serve: new serve_1.default({ logger, service }).toCommand(),
            start: new start_1.default({ logger, service }).toCommand(),
            stop: new stop_1.default({ logger, service }).toCommand()
        };
    }
}
exports.default = Cli;
