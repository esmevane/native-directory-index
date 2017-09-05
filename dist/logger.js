'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.info = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _emoji = require('./emoji');

var Emoji = _interopRequireWildcard(_emoji);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger = _winston2.default.Logger,
    Console = _winston2.default.transports.Console;


var formatter = function formatter(_ref) {
  var message = _ref.message;
  return `${message || ''}`;
};
var transports = [new Console({ formatter })];
var logger = new Logger({ transports });

var intro = _chalk2.default.bold.white(`[native-directory]`);
var happy = function happy(message) {
  return _chalk2.default.blue(`${intro}: ${Emoji.robot} ${message}`);
};
var upset = function upset(message) {
  return _chalk2.default.red(`${intro}: ${Emoji.siren} ${message}`);
};

var info = exports.info = function info() {
  for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }

  return messages.forEach(function (message) {
    return logger.info(happy(message));
  });
};

var error = exports.error = function error() {
  for (var _len2 = arguments.length, messages = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    messages[_key2] = arguments[_key2];
  }

  return messages.forEach(function (message) {
    return logger.error(upset(message));
  });
};