"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _user = require("../models/user");

var _default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var token, currentAction, decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.header('X-Auth-Token');
            currentAction = req.header('Current-Action');

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(401).send('Access denied. No token provided.'));

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return _jsonwebtoken["default"].verify(token, _config["default"].get('jwtPrivateKey'));

          case 7:
            decoded = _context.sent;
            _context.next = 10;
            return _user.User.findById(decoded);

          case 10:
            req.user = _context.sent;

            if (req.user) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(400).send('User does not not exist.'));

          case 15:
            next();

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](4);
            res.status(400).send('Invalid token.');

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 18]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;
//# sourceMappingURL=auth.js.map