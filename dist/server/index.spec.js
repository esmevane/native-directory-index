"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("./index");
describe(index_1.default.name, () => {
    it("is exported", () => chai_1.expect(index_1.default).to.be.ok);
});
