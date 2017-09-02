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

  var perform = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var response, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _isomorphicFetch2.default)(Config.directory);

            case 2:
              response = _context.sent;
              _context.prev = 3;
              _context.next = 6;
              return response.json();

            case 6:
              json = _context.sent;


              json.forEach(function (item) {
                return _index.Logger.info(item.githubUrl);
              });
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](3);

              _index.Logger.error(_context.t0);

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[3, 10]]);
    }));

    return function perform() {
      return _ref.apply(this, arguments);
    };
  }();

  var toYargs = function toYargs() {
    return {
      command: 'published',
      desc: 'See list of published repos',
      builder: function builder() {},
      handler: perform
    };
  };

  return { perform, toYargs };
};