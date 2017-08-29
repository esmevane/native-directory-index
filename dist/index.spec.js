"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("./index");
describe("Project-wide exports", () => {
    it(`exports ${index_1.Cli.name}`, () => chai_1.expect(index_1.Cli).to.be.ok);
    it(`exports ${index_1.Config.name}`, () => chai_1.expect(index_1.Config).to.be.ok);
    it(`exports ${index_1.Logger.name}`, () => chai_1.expect(index_1.Logger).to.be.ok);
    it(`exports ${index_1.Server.name}`, () => chai_1.expect(index_1.Server).to.be.ok);
    it(`exports ${index_1.Service.name}`, () => chai_1.expect(index_1.Service).to.be.ok);
});
