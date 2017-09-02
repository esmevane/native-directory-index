'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _path = require('path');

var files = (0, _fs.readdirSync)((0, _path.resolve)(__dirname, 'commands'));
var retrieve = function retrieve(file) {
  return require((0, _path.resolve)(__dirname, 'commands', file));
};
var exportables = files.map(retrieve);

exports.default = exportables;