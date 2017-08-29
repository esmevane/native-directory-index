"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const config_1 = require("./config");
describe("Config", () => {
    describe("port", () => {
        it("has a default port", () => {
            const config = new config_1.default();
            chai_1.expect(config.port).to.eql(9500);
        });
        it("allows an arbitrary port", () => {
            const port = 9000;
            const config = new config_1.default({ port });
            chai_1.expect(config.port).to.eql(port);
        });
    });
    describe("environment", () => {
        it("has a default environment", () => {
            const config = new config_1.default();
            chai_1.expect(config.environment).to.eql("development");
        });
        it("allows an arbitrary environment", () => {
            const environment = "testing";
            const config = new config_1.default({ environment });
            chai_1.expect(config.environment).to.eql(environment);
        });
    });
});
