"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _winston = _interopRequireDefault(require("winston"));

require("express-async-errors");

// require('winston-mongodb');
function _default() {
  _winston["default"].handleExceptions(new _winston["default"].transports.File({
    filename: 'uncaughtExceptions.log'
  }));

  process.on('unhandledRejection', function (ex) {
    throw ex;
  });

  _winston["default"].add(_winston["default"].transports.File, {
    filename: 'logfile.log'
  }); //   winston.add(winston.transports.MongoDB, {
  //     db: 'mongodb://localhost/vidly',
  //     level: 'info'
  //   });

}
//# sourceMappingURL=logging.js.map