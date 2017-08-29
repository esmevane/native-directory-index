"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = {
    environment: "development",
    port: 9500
};
class Config {
    constructor(givenOptions = {}) {
        const options = Object.assign({}, exports.defaults, givenOptions);
        this.environment = options.environment;
        this.port = options.port;
    }
}
exports.default = Config;
