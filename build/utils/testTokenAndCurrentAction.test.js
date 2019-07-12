"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testTokenAndCurrentAction = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _supertest = _interopRequireDefault(require("supertest"));

var _testPopulateDBandReadStructure = require("./testPopulateDBandReadStructure");

var testTokenAndCurrentAction =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(server, method, url) {
    var tokens, res0, res1, res2, res3;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _testPopulateDBandReadStructure.populateTestDB)({
              users: 2,
              websites: 3,
              pages: 15,
              currentWebsite: 0,
              currentPage: 0
            });

          case 2:
            tokens = _context.sent;
            _context.t0 = method;
            _context.next = _context.t0 === 'get' ? 6 : _context.t0 === 'post' ? 19 : _context.t0 === 'put' ? 32 : _context.t0 === 'delete' ? 45 : 58;
            break;

          case 6:
            _context.next = 8;
            return (0, _supertest["default"])(server).get("/api/".concat(url)).set('X-Auth-Token', 'fail_token').set('Current-Action', '10');

          case 8:
            res0 = _context.sent;
            _context.next = 11;
            return (0, _supertest["default"])(server).get("/api/".concat(url)).set('Current-Action', '10');

          case 11:
            res1 = _context.sent;
            _context.next = 14;
            return (0, _supertest["default"])(server).get("/api/".concat(url)).set('X-Auth-Token', tokens[1]);

          case 14:
            res2 = _context.sent;
            _context.next = 17;
            return (0, _supertest["default"])(server).get("/api/".concat(url)).set('X-Auth-Token', tokens[1]).set('Current-Action', '1');

          case 17:
            res3 = _context.sent;
            return _context.abrupt("break", 58);

          case 19:
            _context.next = 21;
            return (0, _supertest["default"])(server).post("/api/".concat(url)).set('X-Auth-Token', 'fail_token').set('Current-Action', '10');

          case 21:
            res0 = _context.sent;
            _context.next = 24;
            return (0, _supertest["default"])(server).post("/api/".concat(url)).set('Current-Action', '10');

          case 24:
            res1 = _context.sent;
            _context.next = 27;
            return (0, _supertest["default"])(server).post("/api/".concat(url)).set('X-Auth-Token', tokens[1]);

          case 27:
            res2 = _context.sent;
            _context.next = 30;
            return (0, _supertest["default"])(server).post("/api/".concat(url)).set('X-Auth-Token', tokens[1]).set('Current-Action', '1');

          case 30:
            res3 = _context.sent;
            return _context.abrupt("break", 58);

          case 32:
            _context.next = 34;
            return (0, _supertest["default"])(server).put("/api/".concat(url)).set('X-Auth-Token', 'fail_token').set('Current-Action', '10');

          case 34:
            res0 = _context.sent;
            _context.next = 37;
            return (0, _supertest["default"])(server).put("/api/".concat(url)).set('Current-Action', '10');

          case 37:
            res1 = _context.sent;
            _context.next = 40;
            return (0, _supertest["default"])(server).put("/api/".concat(url)).set('X-Auth-Token', tokens[1]);

          case 40:
            res2 = _context.sent;
            _context.next = 43;
            return (0, _supertest["default"])(server).put("/api/".concat(url)).set('X-Auth-Token', tokens[1]).set('Current-Action', '1');

          case 43:
            res3 = _context.sent;
            return _context.abrupt("break", 58);

          case 45:
            _context.next = 47;
            return (0, _supertest["default"])(server)["delete"]("/api/".concat(url)).set('X-Auth-Token', 'fail_token').set('Current-Action', '10');

          case 47:
            res0 = _context.sent;
            _context.next = 50;
            return (0, _supertest["default"])(server)["delete"]("/api/".concat(url)).set('Current-Action', '10');

          case 50:
            res1 = _context.sent;
            _context.next = 53;
            return (0, _supertest["default"])(server)["delete"]("/api/".concat(url)).set('X-Auth-Token', tokens[1]);

          case 53:
            res2 = _context.sent;
            _context.next = 56;
            return (0, _supertest["default"])(server)["delete"]("/api/".concat(url)).set('X-Auth-Token', tokens[1]).set('Current-Action', '1');

          case 56:
            res3 = _context.sent;
            return _context.abrupt("break", 58);

          case 58:
            return _context.abrupt("return", res0.status === 400 && res1.status === 401 && res2.status === 412 && res3.status === 412);

          case 59:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function testTokenAndCurrentAction(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.testTokenAndCurrentAction = testTokenAndCurrentAction;
//# sourceMappingURL=testTokenAndCurrentAction.test.js.map