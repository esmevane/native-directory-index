"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const chalk = require("chalk");
class Logger {
    info(message) {
        winston.info(chalk.blue(message));
    }
    error(message) {
        winston.error(chalk.red(message));
    }
}
exports.default = Logger;
