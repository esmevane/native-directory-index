'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _index = require('../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var create = exports.create = function create() {
  var Config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _index.Config;

  var handler = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var repo = _ref.repo;
      var response, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _index.Logger.info(`Looking for details on ${repo}`);

              _context.next = 3;
              return (0, _isomorphicFetch2.default)(Config.packageFor(repo));

            case 3:
              response = _context.sent;
              _context.prev = 4;

              if (!(response.status === 200)) {
                _context.next = 12;
                break;
              }

              _context.next = 8;
              return response.json();

            case 8:
              json = _context.sent;


              _index.Logger.info(`Found: ${json.name} - ${json.version}`);
              _context.next = 13;
              break;

            case 12:
              _index.Logger.error(`Unable to locate package for ${repo}`);

            case 13:
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context['catch'](4);

              _index.Logger.error(_context.t0);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[4, 15]]);
    }));

    return function handler(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var toYargs = function toYargs() {
    return {
      command: 'preview <repo>',
      desc: 'Preview summary of a repo',
      builder: function builder() {},
      handler
    };
  };

  return { toYargs };
};