"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const callbackToPromise_1 = require("./callbackToPromise");
exports.read = callbackToPromise_1.default(fs.readFile);
exports.write = callbackToPromise_1.default(fs.writeFile);
exports.unlink = callbackToPromise_1.default(fs.unlink);
exports.stat = callbackToPromise_1.default(fs.stat);
