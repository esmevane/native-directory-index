"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const createCallbackToPromise = () => {
    if (typeof util_1.promisify !== 'undefined')
        return util_1.promisify;
    return (asyncFunction) => (...params) => new Promise((resolve, reject) => asyncFunction(...params, (error, result) => {
        if (error)
            reject(error);
        resolve(result);
    }));
};
exports.default = createCallbackToPromise();
