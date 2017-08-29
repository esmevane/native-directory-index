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
const http_1 = require("http");
const express = require("express");
const controllers_1 = require("./controllers");
const routes_1 = require("./routes");
const config_1 = require("../config");
const defaults = {
    config: new config_1.default()
};
class Server {
    constructor(givenOptions = {}) {
        const options = Object.assign({}, defaults, givenOptions);
        this.config = options.config;
    }
    get port() {
        return this.config.port;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = this.createApp();
            const server = this.createServer(app);
            app.get("/health", controllers_1.json(routes_1.health));
            app.get("/echo/:value*?", controllers_1.json(routes_1.echo, (request) => [request.params.value]));
            server.listen(this.port, () => console.log(`Listening on ${this.port}`));
        });
    }
    createApp() {
        return express();
    }
    createServer(app) {
        return http_1.createServer(app);
    }
}
exports.default = Server;
