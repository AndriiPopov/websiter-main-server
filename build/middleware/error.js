"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _default = function _default(err, req, res, next) {
  _winston["default"].error(err.message, err); // error
  // warn
  // info
  // verbose
  // debug
  // silly


  res.status(500).send('Something failed.');
};

exports["default"] = _default;
//# sourceMappingURL=error.js.map