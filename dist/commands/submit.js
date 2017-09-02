'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var isItIos = {
  type: 'confirm',
  name: 'ios',
  default: false,
  message: 'Is it iOS compatible?'
};

var isItAndroid = {
  type: 'confirm',
  name: 'android',
  default: false,
  message: 'Is it Android compatible?'
};

var isItExpo = {
  type: 'confirm',
  name: 'expo',
  default: false,
  message: 'Is it Expo compatible?'
};

var isItWeb = {
  type: 'confirm',
  name: 'web',
  default: false,
  message: 'Is it web compatible?'
};

var getConfirmation = {
  type: 'confirm',
  name: 'ready',
  default: false,

  message: 'Are you ready to submit this project?'
};

var questions = [isItIos, isItAndroid, isItExpo, isItWeb];
var confirm = [getConfirmation];

var create = exports.create = function create() {
  var Config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _index.Config;

  var handler = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var repo = _ref.repo;

      var response, json, answers, submission, _ref3, ready;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _index.Logger.info('Looking up your repo details');

              _context.next = 3;
              return (0, _isomorphicFetch2.default)(Config.packageFor(repo));

            case 3:
              response = _context.sent;
              _context.prev = 4;

              if (!(response.status === 200)) {
                _context.next = 22;
                break;
              }

              _context.next = 8;
              return response.json();

            case 8:
              json = _context.sent;


              _index.Logger.info(`Found: ${json.name} - ${json.version}`, `Give us some information about ${json.name}`);

              _context.next = 12;
              return _inquirer2.default.prompt(questions);

            case 12:
              answers = _context.sent;
              submission = Object.assign({}, {
                name: json.name,
                githubUrl: Config.githubUrlFor(repo)
              }, answers);


              _index.Logger.info(`Does this look okay?\r\n${JSON.stringify(submission, null, 2)}`);

              _context.next = 17;
              return _inquirer2.default.prompt(confirm);

            case 17:
              _ref3 = _context.sent;
              ready = _ref3.ready;


              if (ready) {
                _index.Logger.info(`Submitting ${json.name} now...`);
              } else {
                _index.Logger.info(`Okay! Nothing submitted for now.`);
              }
              _context.next = 23;
              break;

            case 22:
              _index.Logger.error(`Unable to locate package for ${repo}`);

            case 23:
              _context.next = 28;
              break;

            case 25:
              _context.prev = 25;
              _context.t0 = _context['catch'](4);

              _index.Logger.error(_context.t0);

            case 28:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[4, 25]]);
    }));

    return function handler(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var toYargs = function toYargs() {
    return {
      command: 'submit <repo>',
      desc: 'Submit a repo to the directory',
      builder: function builder() {},
      handler
    };
  };

  return { toYargs };
};