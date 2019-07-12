"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _express = _interopRequireDefault(require("express"));

var _logging = _interopRequireDefault(require("./startup/logging"));

var _routes = _interopRequireDefault(require("./startup/routes"));

var _db = _interopRequireDefault(require("./startup/db"));

var _config = _interopRequireDefault(require("./startup/config"));

var _validation = _interopRequireDefault(require("./startup/validation"));

var _prod = _interopRequireDefault(require("./startup/prod"));

var app = (0, _express["default"])();
(0, _logging["default"])();
(0, _routes["default"])(app);
(0, _db["default"])();
(0, _config["default"])();
(0, _validation["default"])();
(0, _prod["default"])(app);
var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
  return _winston["default"].info("Listening on port ".concat(port, "..."));
});
var _default = server;
exports["default"] = _default;