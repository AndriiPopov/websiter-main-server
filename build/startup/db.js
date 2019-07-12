"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _winston = _interopRequireDefault(require("winston"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("config"));

var _page = require("../models/page");

var _user = require("../models/user");

function _default() {
  var db = _config["default"].get('db');

  _mongoose["default"].connect(db).then(function () {
    // User.update({}, { currentAction: 0 }, { multi: true }, function(
    //     err,
    //     numberAffected
    // ) {
    //     console.log(numberAffected)
    // })
    _winston["default"].info("Connected to ".concat(db));
  });
}
//# sourceMappingURL=db.js.map